#!/bin/bash

# Script de despliegue para CRM
# Uso: ./deploy.sh [produccion|desarrollo]

set -e

ENVIRONMENT=${1:-desarrollo}
PROJECT_DIR="/var/www/crm"
BACKUP_DIR="/var/backups/crm"
DATE=$(date +%Y%m%d_%H%M%S)
APP_NAME="crm-app"

echo "🚀 Iniciando despliegue de CRM en modo: $ENVIRONMENT"

# Crear directorio de backup si no existe
mkdir -p "$BACKUP_DIR"

# Función para hacer backup de la base de datos
backup_database() {
    echo "📦 Creando backup de base de datos..."
    if [ -f .env ]; then
        DB_NAME=$(grep DB_NAME .env | cut -d '=' -f2)
        DB_USER=$(grep DB_USER .env | cut -d '=' -f2)
        DB_PASS=$(grep DB_PASSWORD .env | cut -d '=' -f2)
        
        mysqldump -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" > "$BACKUP_DIR/db_backup_$DATE.sql"
        echo "✅ Backup guardado en: $BACKUP_DIR/db_backup_$DATE.sql"
    else
        echo "⚠️  No se encontró .env, saltando backup de BD"
    fi
}

# Función para actualizar código
update_code() {
    echo "🔄 Actualizando código..."
    git pull origin main
    
    if [ $? -eq 0 ]; then
        echo "✅ Código actualizado correctamente"
    else
        echo "❌ Error al actualizar código"
        exit 1
    fi
}

# Función para instalar dependencias
install_dependencies() {
    echo "📦 Instalando dependencias..."
    if [ "$ENVIRONMENT" = "produccion" ]; then
        npm install --production
    else
        npm install
    fi
    
    if [ $? -eq 0 ]; then
        echo "✅ Dependencias instaladas correctamente"
    else
        echo "❌ Error al instalar dependencias"
        exit 1
    fi
}

# Función para gestionar PM2
manage_pm2() {
    echo "🔄 Gestionando proceso PM2..."
    
    # Verificar si PM2 está instalado
    if ! command -v pm2 &> /dev/null; then
        echo "📦 Instalando PM2..."
        npm install -g pm2
    fi
    
    # Verificar si la aplicación ya está corriendo
    if pm2 list | grep -q "$APP_NAME"; then
        echo "🔄 Reiniciando aplicación..."
        pm2 restart "$APP_NAME"
    else
        echo "🚀 Iniciando aplicación..."
        pm2 start app.js --name "$APP_NAME"
        pm2 save
    fi
    
    echo "✅ Aplicación gestionada con PM2"
}

# Función para verificar salud de la aplicación
health_check() {
    echo "🏥 Verificando salud de la aplicación..."
    sleep 5
    
    if pm2 list | grep -q "$APP_NAME.*online"; then
        echo "✅ Aplicación corriendo correctamente"
    else
        echo "❌ Error: La aplicación no está corriendo"
        pm2 logs "$APP_NAME" --lines 20
        exit 1
    fi
}

# Ejecutar despliegue
cd "$PROJECT_DIR"

if [ "$ENVIRONMENT" = "produccion" ]; then
    backup_database
fi

update_code
install_dependencies
manage_pm2
health_check

echo "🎉 Despliegue completado exitosamente en modo: $ENVIRONMENT"
echo "🕐 Fecha: $(date)"

# Mostrar estado
echo "📊 Estado del sistema:"
echo "- Espacio en disco: $(df -h . | tail -1 | awk '{print $4}') disponible"
echo "- Última actualización: $(git log -1 --pretty=format:'%h - %s (%an, %ar)')"
echo "- Estado PM2:"
pm2 list | grep "$APP_NAME"
