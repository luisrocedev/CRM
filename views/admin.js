const tablaBody = document.querySelector("#tablaAlumnos tbody");

// 🔄 Listar Alumnos
function listarAlumnos() {
    fetch('/api/alumnos')
        .then(res => res.json())
        .then(data => {
            tablaBody.innerHTML = "";
            data.forEach(alumno => {
                let row = `<tr>
                    <td>${alumno.id}</td>
                    <td>${alumno.nombre}</td>
                    <td>${alumno.email}</td>
                    <td>${alumno.estado_funnel}</td>
                    <td>
                        <button onclick="cargarEditar(${alumno.id}, '${alumno.nombre}', '${alumno.email}', '${alumno.estado_funnel}')">✏️</button>
                        <button onclick="eliminarAlumno(${alumno.id})">🗑️</button>
                    </td>
                </tr>`;
                tablaBody.innerHTML += row;
            });
        })
        .catch(err => console.error(err));
}

// ➕ Crear Alumno
function crearAlumno() {
    const nombre = document.getElementById("nombreNuevo").value;
    const email = document.getElementById("emailNuevo").value;
    const estado_funnel = document.getElementById("estadoNuevo").value;

    fetch('/api/alumnos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(() => listarAlumnos())
    .catch(err => console.error(err));
}

// 📝 Editar Alumno
function editarAlumno() {
    const id = document.getElementById("idEditar").value;
    const nombre = document.getElementById("nombreEditar").value;
    const email = document.getElementById("emailEditar").value;
    const estado_funnel = document.getElementById("estadoEditar").value;

    fetch(`/api/alumnos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(() => listarAlumnos())
    .catch(err => console.error(err));
}

// 🗑️ Eliminar Alumno
function eliminarAlumno(id) {
    fetch(`/api/alumnos/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(() => listarAlumnos())
    .catch(err => console.error(err));
}

// Cargar datos en el formulario de edición
function cargarEditar(id, nombre, email, estado_funnel) {
    document.getElementById("idEditar").value = id;
    document.getElementById("nombreEditar").value = nombre;
    document.getElementById("emailEditar").value = email;
    document.getElementById("estadoEditar").value = estado_funnel;
}

// Cargar la lista de alumnos al cargar la página
window.onload = listarAlumnos;
