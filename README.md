# CRM - Sistema de Gestión de Relaciones con Clientes

## Descripción del Proyecto

Este CRM es una aplicación web desarrollada en Node.js y JavaScript que permite gestionar clientes, contactos y el estado del funnel de ventas de una empresa. Su objetivo es centralizar la información comercial, facilitar el seguimiento de oportunidades y mejorar la eficiencia en la gestión de relaciones con clientes.

## Tecnologías Utilizadas

- **Node.js** (backend)
- **JavaScript** (frontend y backend)
- **HTML5 y CSS3** (interfaz de usuario)
- **JSON** (almacenamiento de datos)
- **Visual Studio Code** (entorno de desarrollo)

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
CRM-
├── api_contacts.js
├── app.js
├── chart.js
├── main.js
├── package.json
├── README.md
├── config/
│   ├── db.js
│   └── emailConfig.js
├── data/
│   └── contacts.json
├── funnels/
│   └── funnelLogic.js
├── views/
│   ├── admin.html
│   ├── admin.js
│   ├── funnel.html
│   ├── index.html
│   ├── login.html
│   ├── script.js
│   └── styles/
│       ├── admin.css
│       └── style.css
```

## Funcionalidades Principales

1. **Gestión de Contactos**
   - Crear, leer, actualizar y eliminar contactos (CRUD).
   - Asignar estados del funnel: Nuevo, Interesado, En Negociación, Cerrado.
2. **Visualización de Datos**
   - Gráficos del funnel de ventas (con `chart.js`).
   - Listado y filtrado de contactos.
3. **Notificaciones por Email**
   - Envío automático de emails según el estado del contacto (configurable en `config/emailConfig.js`).
4. **Interfaz Web Intuitiva**
   - Formularios y tablas para gestionar contactos desde el navegador.

## Instalación y Puesta en Marcha

1. Clona el repositorio:
   ```bash
   git clone <URL-del-repositorio>
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia la aplicación:
   ```bash
   npm start
   ```
4. Accede desde tu navegador a:
   ```
   http://localhost:3000
   ```

## Uso Básico

- Añade, edita o elimina contactos desde la interfaz web.
- Consulta el estado de cada contacto en el funnel de ventas.
- Visualiza estadísticas y gráficos de tu proceso comercial.

## Estado Actual y Futuras Mejoras

- El sistema es funcional y permite la gestión básica de contactos y ventas.
- Próximas mejoras: rediseño de la interfaz, optimización de rendimiento, mayor seguridad, integración con otros sistemas y análisis avanzado de datos.

## Contacto y Soporte

Para dudas, sugerencias o reportar errores, contacta con el equipo de desarrollo o abre una issue en el repositorio.

---

**¡Gracias por usar este CRM!**
