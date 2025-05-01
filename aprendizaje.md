# aprendizaje.md

## Programación

### 1. Elementos fundamentales

**Ruta:** `main.js`

Nuestro código utiliza variables (`let nombre`), constantes (`const MAX_CONTACTS`), operadores aritméticos (`+`, `-`), lógicos (`&&`, `||`) y de comparación (`===`, `!=`). Los tipos de datos principales son string, number, boolean, array y objeto.

```js
const MAX_CONTACTS = 100;
let nombre = "Ana";
let edad = 25;
let esActivo = true;
let contactos = [];
```

---

### 2. Estructuras de control

**Ruta:** `main.js`

Usamos estructuras de selección (`if`, `else`, `switch`) y repetición (`for`, `forEach`, `while`) para recorrer listas y tomar decisiones.

```js
for (let contacto of contactos) {
  if (contacto.activo) {
    console.log(contacto.nombre);
  }
}
```

---

### 3. Control de excepciones

**Ruta:** `api_contacts.js`

Implementamos control de excepciones con `try-catch`, especialmente al leer o escribir archivos.

```js
try {
  let datos = fs.readFileSync("data/contacts.json");
} catch (error) {
  console.error("Error al leer los contactos:", error);
}
```

---

### 4. Documentación del código

**Ruta:** `funnels/funnelLogic.js`

Comentamos el código con `//` para explicar partes importantes.

```js
// Esta función añade un nuevo contacto al embudo de ventas
function addToFunnel(contacto) {
  // ...código...
}
```

---

### 5. Paradigma aplicado

**Ruta:** `main.js`

El proyecto sigue un enfoque estructurado y modular, dividiendo la lógica en funciones y módulos. No usamos POO porque la lógica es sencilla y se adapta mejor a módulos y funciones.

---

### 6. Clases y objetos principales

**Ruta:** `main.js`

No hay clases, pero sí objetos clave como los contactos, que agrupan la información relevante de cada cliente.

```js
let contacto = {
  nombre: "Luis",
  email: "luis@email.com",
  activo: true,
};
```

---

### 7. Conceptos avanzados

No aplicamos herencia ni polimorfismo, pero sí modularidad y reutilización de funciones. Si el proyecto creciera, podríamos plantear clases para usuarios, contactos y embudos de ventas.

---

### 8. Gestión de información y archivos

**Ruta:** `api_contacts.js`

Leemos y escribimos información en archivos JSON (`data/contacts.json`). La interacción principal con el usuario es vía web, usando formularios HTML y scripts JavaScript.

```js
fs.writeFileSync("data/contacts.json", JSON.stringify(contactos));
```

---

### 9. Estructuras de datos

**Ruta:** `main.js`

Utilizamos arrays para listas de contactos y objetos para representar cada registro.

```js
let contactos = [];
```

---

### 10. Técnicas avanzadas

**Ruta:** `main.js`

Aplicamos expresiones regulares para validar emails y flujos de entrada/salida para leer y escribir archivos.

```js
let emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contacto.email);
```

---

## Sistemas Informáticos

### 1. Hardware

Desarrollamos en MacBook (Intel/Apple Silicon, 8GB+ RAM). El entorno de producción es un servidor Linux básico.

---

### 2. Sistema operativo

Usamos macOS para desarrollo por comodidad y Linux para producción por estabilidad y soporte para Node.js.

---

### 3. Redes

El proyecto funciona en red local durante el desarrollo y puede desplegarse en Internet. Usamos HTTP/HTTPS y configuramos el firewall para limitar accesos.

---

### 4. Copias de seguridad

Realizamos copias de seguridad periódicas del archivo `data/contacts.json` y del repositorio Git. Así, podemos restaurar datos en caso de error.

---

### 5. Seguridad e integridad

Protegemos los datos validando entradas, usando contraseñas seguras y limitando permisos de archivos y usuarios.

---

### 6. Usuarios y permisos

Configuramos usuarios en el sistema operativo y en la aplicación con los permisos mínimos necesarios.

---

### 7. Documentación técnica

Mantenemos documentación en archivos markdown (`README.md`) y comentarios en el código para la configuración y gestión del sistema.

---

## Entornos de Desarrollo

### 1. IDE

Utilizamos Visual Studio Code, configurado con extensiones para JavaScript, HTML, CSS y Git.

---

### 2. Automatización de tareas

**Ruta:** `package.json`

Automatizamos tareas como el inicio del servidor y la instalación de dependencias mediante scripts de npm.

```json
"scripts": {
  "start": "node app.js"
}
```

---

### 3. Control de versiones

Usamos Git y GitHub para gestionar el código, versiones y ramas. Creamos ramas para nuevas funcionalidades y corregimos errores en ramas separadas.

---

### 4. Refactorización

Revisamos y mejoramos el código periódicamente para hacerlo más eficiente y legible.

---

### 5. Documentación técnica

Documentamos el proyecto con archivos markdown (`README.md`) y comentarios en el código.

---

### 6. Diagramas

Podemos crear diagramas de flujo o de estructura para planificar la lógica y la arquitectura de la aplicación.

---

## Bases de Datos

### 1. SGBD

Usamos archivos JSON en vez de un SGBD por simplicidad. Si el proyecto creciera, podríamos migrar a MySQL o MongoDB.

---

### 2. Modelo entidad-relación

No hay un modelo formal, pero los contactos tienen atributos como nombre, email y estado.

---

### 3. Funcionalidades avanzadas

No aplicamos vistas ni procedimientos almacenados, ya que trabajamos con archivos planos.

---

### 4. Protección y recuperación de datos

Implementamos copias de seguridad y validaciones para evitar pérdidas o corrupciones.

---

## Lenguajes de Marcas y Gestión de Información

### 1. Estructura HTML

**Ruta:** `views/index.html`

Estructuramos los documentos HTML con etiquetas semánticas (`<header>`, `<main>`, `<footer>`) y seguimos buenas prácticas.

```html
<header>
  <h1>CRM</h1>
</header>
<main>
  <!-- Contenido principal -->
</main>
<footer>
  <p>© 2025</p>
</footer>
```

---

### 2. Tecnologías frontend

**Ruta:** `views/styles/style.css`, `views/script.js`

Usamos CSS para el diseño y JavaScript para la interactividad. Elegimos estas tecnologías por su compatibilidad y facilidad de uso.

---

### 3. Interacción con el DOM

**Ruta:** `views/script.js`

Utilizamos JavaScript para modificar el DOM dinámicamente, por ejemplo, mostrando mensajes o actualizando tablas de contactos.

```js
document
  .getElementById("btnAgregar")
  .addEventListener("click", agregarContacto);
```

---

### 4. Validación

Validamos HTML y CSS con herramientas online y extensiones de VS Code.

---

### 5. Conversión de datos

**Ruta:** `api_contacts.js`

Convertimos datos entre formatos (por ejemplo, JSON para respuestas de la API) para facilitar la comunicación entre frontend y backend.

```js
let datos = JSON.parse(fs.readFileSync("data/contacts.json"));
```

---

### 6. Aplicación de gestión empresarial

Nuestra aplicación es un CRM básico, permitiendo controlar contactos y procesos de ventas.

---

## Proyecto Intermodular

### 1. Objetivo

El software gestiona contactos y oportunidades comerciales, facilitando el seguimiento de clientes y ventas.

---

### 2. Necesidad o problema

Resuelve la gestión manual y dispersa de la información comercial, centralizando y automatizando procesos.

---

### 3. Stack tecnológico

Node.js, JavaScript, HTML, CSS y JSON. Elegimos este stack por su sencillez, facilidad de aprendizaje y amplia documentación.

---

### 4. Desarrollo por versiones

Comenzamos con una versión mínima funcional (gestión básica de contactos) y añadimos nuevas funcionalidades en versiones posteriores (embudos de ventas, reportes, validaciones, etc).

---
