// VARIABLES GLOBALES
let usuarioSeleccionado = null;
let usuariosData = [];

// GESTIÓN DE FORMULARIOS
function mostrarFormularioNuevo() {
    ocultarFormularios();
    document.getElementById('form-nuevo-usuario').style.display = 'block';
}

function mostrarFormularioEditar(id, usuario, rol) {
    ocultarFormularios();
    document.getElementById('idUsuarioEditar').value = id;
    document.getElementById('usuarioEditar').value = usuario;
    document.getElementById('rolEditar').value = rol || 'user';
    document.getElementById('passwordEditar').value = '';
    document.getElementById('form-editar-usuario').style.display = 'block';
}

function ocultarFormularios() {
    const formularios = document.querySelectorAll('.form-card');
    formularios.forEach(form => {
        form.style.display = 'none';
    });
}

// MODAL DE CONFIRMACIÓN
function mostrarModalConfirmacion(id, usuario) {
    usuarioSeleccionado = id;
    document.querySelector('.user-to-delete').textContent = usuario;
    
    const modal = document.getElementById('confirmModal');
    modal.style.display = 'flex';
    
    // Event listeners para cerrar el modal
    const closeBtn = modal.querySelector('.close-modal');
    const cancelBtn = modal.querySelector('.modal-btn-cancel');
    
    closeBtn.onclick = cerrarModal;
    cancelBtn.onclick = cerrarModal;
    
    function cerrarModal() {
        modal.style.display = 'none';
    }
}

// USUARIOS CRUD
function listarUsuarios() {
    fetch('/api/usuarios')
        .then(res => res.json())
        .then(data => {
            usuariosData = data;
            actualizarTablaUsuarios(data);
            actualizarEstadisticas(data);
        })
        .catch(error => {
            console.error('Error al cargar usuarios:', error);
            // Si estás desarrollando localmente y aún no tienes la API
            mostrarDatosDePrueba();
        });
}

function actualizarTablaUsuarios(usuarios) {
    const tabla = document.querySelector('#tablaUsuarios tbody');
    tabla.innerHTML = '';
    
    if (usuarios.length === 0) {
        tabla.innerHTML = `<tr><td colspan="5" style="text-align: center;">No hay usuarios registrados</td></tr>`;
        return;
    }
    
    usuarios.forEach(usuario => {
        const rol = usuario.rol || 'user';
        const estado = usuario.activo !== false ? 'Activo' : 'Inactivo';
        const claseEstado = usuario.activo !== false ? 'estado-activo' : 'estado-inactivo';
        
        tabla.innerHTML += `
        <tr>
            <td>${usuario.id}</td>
            <td>${usuario.usuario}</td>
            <td><span class="badge ${rol === 'admin' ? 'badge-admin' : 'badge-user'}">${rol === 'admin' ? 'Administrador' : 'Usuario'}</span></td>
            <td><span class="badge ${claseEstado}">${estado}</span></td>
            <td>
                <i class="fas fa-edit action-icon edit-icon" title="Editar" onclick="mostrarFormularioEditar(${usuario.id}, '${usuario.usuario}', '${rol}')"></i>
                <i class="fas fa-trash action-icon delete-icon" title="Eliminar" onclick="mostrarModalConfirmacion(${usuario.id}, '${usuario.usuario}')"></i>
            </td>
        </tr>`;
    });
}

function crearUsuario() {
    const usuario = document.getElementById('usuarioNuevo').value;
    const password = document.getElementById('passwordNuevo').value;
    const rol = document.getElementById('rolNuevo').value;
    
    if (!usuario || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario, password, rol })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al crear usuario');
        }
        return response.json();
    })
    .then(() => {
        listarUsuarios();
        ocultarFormularios();
        document.getElementById('usuarioNuevo').value = '';
        document.getElementById('passwordNuevo').value = '';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo crear el usuario. Intenta nuevamente más tarde.');
    });
}

function editarUsuario() {
    const id = document.getElementById('idUsuarioEditar').value;
    const usuario = document.getElementById('usuarioEditar').value;
    const password = document.getElementById('passwordEditar').value;
    const rol = document.getElementById('rolEditar').value;
    
    if (!usuario) {
        alert('El nombre de usuario no puede estar vacío');
        return;
    }
    
    const datos = {
        usuario,
        rol
    };
    
    // Solo incluir la contraseña si se ha proporcionado una nueva
    if (password) {
        datos.password = password;
    }
    
    fetch(`/api/usuarios/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(datos)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al actualizar usuario');
        }
        return response.json();
    })
    .then(() => {
        listarUsuarios();
        ocultarFormularios();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo actualizar el usuario. Intenta nuevamente más tarde.');
    });
}

function confirmarEliminar() {
    if (usuarioSeleccionado) {
        eliminarUsuario(usuarioSeleccionado);
        document.getElementById('confirmModal').style.display = 'none';
        usuarioSeleccionado = null;
    }
}

function eliminarUsuario(id) {
    fetch(`/api/usuarios/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al eliminar usuario');
        }
        return response.json();
    })
    .then(() => {
        listarUsuarios();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('No se pudo eliminar el usuario. Intenta nuevamente más tarde.');
    });
}

// ESTADÍSTICAS
function actualizarEstadisticas(usuarios) {
    if (!usuarios) return;
    
    const totalUsuarios = usuarios.length;
    const usuariosActivos = usuarios.filter(u => u.activo !== false).length;
    const usuariosAdmin = usuarios.filter(u => u.rol === 'admin').length;
    
    document.getElementById('total-usuarios').textContent = totalUsuarios;
    document.getElementById('usuarios-activos').textContent = usuariosActivos;
    document.getElementById('usuarios-admin').textContent = usuariosAdmin;
    
    // Si quieres calcular la fecha del último acceso, tendrías que tener esa información desde el backend
    // De lo contrario, puedes mostrar "Hoy" o la fecha actual formateada
    const hoy = new Date();
    const opciones = { day: 'numeric', month: 'short' };
    document.getElementById('ultimo-acceso').textContent = hoy.toLocaleDateString('es-ES', opciones);
}

// BÚSQUEDA DE USUARIOS
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('searchUsuario');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const busqueda = this.value.toLowerCase().trim();
            if (!usuariosData || usuariosData.length === 0) return;
            
            if (!busqueda) {
                actualizarTablaUsuarios(usuariosData);
                return;
            }
            
            const usuariosFiltrados = usuariosData.filter(usuario => 
                usuario.usuario.toLowerCase().includes(busqueda) || 
                (usuario.rol && usuario.rol.toLowerCase().includes(busqueda))
            );
            
            actualizarTablaUsuarios(usuariosFiltrados);
        });
    }
});

// DATOS DE PRUEBA (para desarrollo local)
function mostrarDatosDePrueba() {
    const datosPrueba = [
        { id: 1, usuario: 'admin', rol: 'admin', activo: true },
        { id: 2, usuario: 'usuario1', rol: 'user', activo: true },
        { id: 3, usuario: 'usuario2', rol: 'user', activo: false }
    ];
    
    actualizarTablaUsuarios(datosPrueba);
    actualizarEstadisticas(datosPrueba);
}

// INICIALIZACIÓN
window.onload = function() {
    listarUsuarios();
    
    // Cerrar modales al hacer clic fuera de ellos
    window.onclick = function(event) {
        const modal = document.getElementById('confirmModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };
};

// Añadir estilos dinámicos para las insignias
const style = document.createElement('style');
style.textContent = `
    .badge {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 500;
        display: inline-block;
    }
    .badge-admin {
        background-color: #3f8efc;
        color: white;
    }
    .badge-user {
        background-color: #e9ecef;
        color: #495057;
    }
    .estado-activo {
        background-color: #28a745;
        color: white;
    }
    .estado-inactivo {
        background-color: #dc3545;
        color: white;
    }
`;
document.head.appendChild(style);
