# Instrucciones de despliegue para CRM

## Requisitos del servidor

- Node.js 16 o superior
- MySQL 5.7 o superior
- Nginx/Apache (como proxy reverso)
- PM2 (para gestión de procesos)
- SSL/TLS certificado

## Pasos de instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/luisrocedev/CRM.git
cd CRM
```

### 2. Instalar dependencias

```bash
npm install --production
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env
# Editar .env con los datos reales de producción
```

### 4. Configurar base de datos

```bash
mysql -u usuario -p nombre_db < crm_contactos.sql
```

### 5. Instalar PM2 globalmente

```bash
npm install -g pm2
```

### 6. Configurar PM2

```bash
pm2 start app.js --name "crm-app"
pm2 save
pm2 startup
```

### 7. Configurar Nginx como proxy reverso

```nginx
server {
    listen 443 ssl;
    server_name crm.tudominio.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## Comandos útiles

### Gestión con PM2

```bash
pm2 list                 # Ver procesos
pm2 restart crm-app      # Reiniciar app
pm2 logs crm-app         # Ver logs
pm2 stop crm-app         # Detener app
pm2 delete crm-app       # Eliminar app
```

### Actualizar código

```bash
git pull origin main
npm install --production
pm2 restart crm-app
```

### Backup

```bash
# Backup de base de datos
mysqldump -u usuario -p crm_contactos_prod > backup_crm_$(date +%Y%m%d_%H%M%S).sql
```
