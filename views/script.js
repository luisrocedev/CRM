const resultado = document.getElementById('resultado');

// Listar contactos
function listarContactos() {
    fetch('/api/contacts')
        .then(res => res.json())
        .then(data => {
            resultado.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        })
        .catch(err => console.error(err));
}

// Crear contacto
function crearContacto() {
    const nombre = document.getElementById('nombreNuevo').value;
    const email = document.getElementById('emailNuevo').value;
    const estado_funnel = document.getElementById('estadoNuevo').value;

    fetch('/api/contacts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(data => {
        resultado.innerHTML = `<pre>Creado: ${JSON.stringify(data, null, 2)}</pre>`;
        listarContactos();
    })
    .catch(err => console.error(err));
}

// Editar contacto
function editarContacto() {
    const id = document.getElementById('idEditar').value;
    const nombre = document.getElementById('nombreEditar').value;
    const email = document.getElementById('emailEditar').value;
    const estado_funnel = document.getElementById('estadoEditar').value;

    fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(data => {
        resultado.innerHTML = `<pre>Editado: ${JSON.stringify(data, null, 2)}</pre>`;
        listarContactos();
    })
    .catch(err => console.error(err));
}

// Eliminar contacto
function eliminarContacto() {
    const id = document.getElementById('idEliminar').value;

    fetch(`/api/contacts/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        resultado.innerHTML = `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        listarContactos();
    })
    .catch(err => console.error(err));
}

// Cargar contactos al inicio
window.onload = listarContactos;
