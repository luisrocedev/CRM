---
# 🎤 Guion hablado para el Proyecto CRM Funnel

## Introducción

Hola, soy [tu nombre] y en este vídeo voy a presentar mi proyecto CRM Funnel, una aplicación para la gestión de contactos y oportunidades comerciales desarrollada con Node.js, JavaScript, HTML y CSS. A lo largo de la presentación, responderé a una serie de preguntas técnicas que ayudan a entender cómo está construido el proyecto, qué decisiones tomé y por qué.
---

## 1. Programación

En el código de CRM utilizo variables y constantes para almacenar información como los contactos, el estado de los embudos y los usuarios. Los tipos de datos principales son string, number, boolean, arrays y objetos.

Para controlar el flujo de la aplicación, empleo estructuras de selección como if y else, y de repetición como for y forEach, por ejemplo, para recorrer la lista de contactos y filtrarlos según su estado.

La gestión de errores se realiza con bloques try-catch, especialmente al leer y escribir archivos JSON.

La documentación del código la realizo mediante comentarios en JavaScript y archivos markdown como el README.

El paradigma que sigo es estructurado y modular, separando la lógica en funciones y archivos como main.js, api_contacts.js y funnelLogic.js.

No utilizo clases, pero sí objetos literales para representar contactos y embudos, lo que simplifica la estructura y hace que el código sea más directo.

En cuanto a conceptos avanzados, la modularidad y la reutilización de funciones son clave, aunque no aplico herencia ni polimorfismo porque el proyecto no lo requiere.

La información se almacena en archivos JSON, lo que facilita la gestión y el backup.

---

## 2. Sistemas Informáticos

El desarrollo lo realizo en un MacBook, pero CRM es compatible con cualquier sistema que soporte Node.js. La aplicación puede funcionar en red local o desplegarse en un servidor Linux.

El control de versiones y las copias de seguridad se gestionan con Git y GitHub, lo que permite restaurar el proyecto fácilmente si surge algún problema.

La seguridad se refuerza validando las entradas y gestionando permisos mínimos en los archivos.

No hay gestión avanzada de usuarios ni permisos, pero se puede ampliar en el futuro.

La documentación técnica se mantiene en archivos markdown y en los propios comentarios del código.

---

## 3. Entornos de Desarrollo

Utilizo Visual Studio Code como IDE principal, con extensiones para JavaScript y Node.js.

La automatización de tareas se realiza con scripts npm para iniciar el servidor y otras utilidades.

El control de versiones lo realizo con Git y GitHub, creando ramas para pruebas y para la versión de producción.

Refactorizo el código de forma periódica para mejorar la eficiencia y la legibilidad, y la documentación técnica se mantiene tanto en markdown como en los comentarios del código.

Opcionalmente, puedo crear diagramas de flujo para planificar la lógica de la aplicación.

---

## 4. Bases de Datos

En este proyecto utilizo archivos JSON para almacenar los datos, lo que simplifica la gestión y permite hacer backups fácilmente.

No hay modelo entidad-relación ni funcionalidades avanzadas como vistas o procedimientos almacenados, pero el sistema está preparado para ampliarse con una base de datos como MySQL o MongoDB si se requiere mayor escalabilidad.

La protección y recuperación de datos se basa en los backups del repositorio de GitHub.

---

## 5. Lenguajes de Marcas y Gestión de Información

La estructura HTML sigue buenas prácticas, utilizando etiquetas semánticas como header, main y footer para mejorar la accesibilidad y el SEO.

El frontend está construido con HTML, CSS y JavaScript, tecnologías estándar y ampliamente soportadas.

JavaScript se utiliza para mostrar y filtrar contactos, validar formularios y manipular el DOM, mejorando la interactividad de la aplicación.

Valido el HTML y el CSS con herramientas online y extensiones del IDE para asegurarme de que cumplen los estándares.

Los datos se gestionan en formato JSON, facilitando la integración y la exportación.

No hay integración con sistemas de gestión empresarial, pero se puede ampliar en el futuro.

---

## 6. Proyecto Intermodular

El objetivo del software es centralizar y automatizar la gestión de contactos y oportunidades comerciales, facilitando el seguimiento y la organización de la información.

La necesidad que cubre es la de evitar la dispersión de datos y mejorar la eficiencia en la gestión comercial.

El stack de tecnologías es sencillo: Node.js, JavaScript, HTML, CSS y archivos JSON para el desarrollo, y Git y GitHub para el control de versiones.

El desarrollo se ha planteado por versiones: la primera versión incluye la gestión básica de contactos y, en versiones posteriores, se han añadido embudos, reportes y validaciones.

---

## Cierre

Y hasta aquí la presentación de mi proyecto CRM Funnel.
Espero que haya quedado claro cómo está construido, qué decisiones técnicas he tomado y cómo responde a las necesidades planteadas.
Si tienes cualquier duda o sugerencia, puedes dejarla en los comentarios.
¡Gracias por ver el video!
