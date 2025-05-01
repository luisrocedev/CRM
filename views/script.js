// Variables globales
let contactos = [];
let contactoSeleccionado = null;

// Referencias a elementos del DOM
const contactModal = document.getElementById('contactModal');
const confirmModal = document.getElementById('confirmModal');
const contactosTabla = document.getElementById('contactosTabla');
const searchInput = document.getElementById('searchContact');

// Listar contactos
function listarContactos() {
    fetch('/api/contactos')
        .then(res => res.json())
        .then(data => {
            // Guardar datos para uso posterior
            contactos = data;
            
            // Actualizar estadísticas
            actualizarEstadisticas(data);
            
            // Renderizar tabla
            renderizarTablaContactos(data);
        })
        .catch(err => {
            mostrarNotificacion('Error al cargar contactos', 'error');
            console.error(err);
        });
}

// Renderizar tabla de contactos
function renderizarTablaContactos(data) {
    if (!contactosTabla) return;
    
    contactosTabla.innerHTML = '';
    
    if (data.length === 0) {
        contactosTabla.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; padding: 30px;">
                    No hay contactos disponibles. ¡Crea tu primer contacto!
                </td>
            </tr>
        `;
        return;
    }
    
    data.forEach(contacto => {
        const tr = document.createElement('tr');
        
        // Clase para el estado (para posibles estilos según estado)
        tr.classList.add('estado-' + contacto.estado_funnel.toLowerCase().replace(' ', '-'));
        
        // Crear las celdas con los datos
        tr.innerHTML = `
            <td>${contacto.id}</td>
            <td>${contacto.nombre}</td>
            <td>${contacto.email}</td>
            <td>
                <span class="estado-badge estado-${contacto.estado_funnel.toLowerCase().replace(' ', '-')}">
                    ${contacto.estado_funnel}
                </span>
            </td>
            <td class="acciones-td">
                <button class="action-icon edit-btn" data-id="${contacto.id}" title="Editar">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-icon delete-btn" data-id="${contacto.id}" title="Eliminar">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        
        // Añadir el elemento a la tabla
        contactosTabla.appendChild(tr);
    });
    
    // Agregar listeners a los botones de acción
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => abrirModalEditar(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => abrirModalConfirmar(parseInt(btn.dataset.id)));
    });
}

// Actualizar estadísticas del dashboard
function actualizarEstadisticas(data) {
    // Total de contactos
    const totalElement = document.querySelector('#total-contacts .stat-value');
    if (totalElement) totalElement.textContent = data.length;
    
    // Contar por estado
    const nuevos = data.filter(c => c.estado_funnel === 'Nuevo').length;
    const nuevosElement = document.querySelector('#nuevos-contacts .stat-value');
    if (nuevosElement) nuevosElement.textContent = nuevos;
    
    const interesados = data.filter(c => c.estado_funnel === 'Interesado').length;
    const interesadosElement = document.querySelector('#interesados-contacts .stat-value');
    if (interesadosElement) interesadosElement.textContent = interesados;
    
    const cerrados = data.filter(c => c.estado_funnel === 'Cerrado').length;
    const cerradosElement = document.querySelector('#cerrados-contacts .stat-value');
    if (cerradosElement) cerradosElement.textContent = cerrados;
    
    // Simular tendencias (en una aplicación real, estos valores vendrían de datos históricos)
    document.querySelectorAll('.stat-trend span').forEach(el => {
        el.textContent = Math.floor(Math.random() * 10 + 1) + '%';
    });
}

// Crear contacto
function crearContacto(nombre, email, estado_funnel) {
    fetch('/api/contactos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(data => {
        mostrarNotificacion('Contacto creado con éxito', 'success');
        cerrarModal(contactModal);
        listarContactos();
    })
    .catch(err => {
        mostrarNotificacion('Error al crear contacto', 'error');
        console.error(err);
    });
}

// Editar contacto
function editarContacto(id, nombre, email, estado_funnel) {
    fetch(`/api/contactos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre, email, estado_funnel })
    })
    .then(res => res.json())
    .then(data => {
        mostrarNotificacion('Contacto actualizado con éxito', 'success');
        cerrarModal(contactModal);
        listarContactos();
    })
    .catch(err => {
        mostrarNotificacion('Error al actualizar contacto', 'error');
        console.error(err);
    });
}

// Eliminar contacto
function eliminarContacto(id) {
    fetch(`/api/contactos/${id}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(data => {
        mostrarNotificacion('Contacto eliminado con éxito', 'success');
        cerrarModal(confirmModal);
        listarContactos();
    })
    .catch(err => {
        mostrarNotificacion('Error al eliminar contacto', 'error');
        console.error(err);
    });
}

// Abrir modal para crear nuevo contacto
function abrirModalCrear() {
    const modalTitle = document.getElementById('modalTitle');
    const modalNombre = document.getElementById('modalNombre');
    const modalEmail = document.getElementById('modalEmail');
    const modalEstado = document.getElementById('modalEstado');
    const modalId = document.getElementById('modalId');
    const saveButton = document.querySelector('.modal-btn-save');
    
    // Limpiar formulario
    modalTitle.textContent = 'Nuevo Contacto';
    modalNombre.value = '';
    modalEmail.value = '';
    modalEstado.value = 'Nuevo';
    modalId.value = '';
    
    // Configurar botón de guardar
    saveButton.onclick = () => {
        crearContacto(
            modalNombre.value,
            modalEmail.value,
            modalEstado.value
        );
    };
    
    // Mostrar modal
    abrirModal(contactModal);
}

// Abrir modal para editar contacto
function abrirModalEditar(id) {
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) return;
    
    const modalTitle = document.getElementById('modalTitle');
    const modalNombre = document.getElementById('modalNombre');
    const modalEmail = document.getElementById('modalEmail');
    const modalEstado = document.getElementById('modalEstado');
    const modalId = document.getElementById('modalId');
    const saveButton = document.querySelector('.modal-btn-save');
    
    // Llenar formulario con datos del contacto
    modalTitle.textContent = 'Editar Contacto';
    modalNombre.value = contacto.nombre;
    modalEmail.value = contacto.email;
    modalEstado.value = contacto.estado_funnel;
    modalId.value = contacto.id;
    
    // Configurar botón de guardar
    saveButton.onclick = () => {
        editarContacto(
            parseInt(modalId.value),
            modalNombre.value,
            modalEmail.value,
            modalEstado.value
        );
    };
    
    // Mostrar modal
    abrirModal(contactModal);
}

// Abrir modal para confirmar eliminación
function abrirModalConfirmar(id) {
    const contacto = contactos.find(c => c.id === id);
    if (!contacto) return;
    
    const contactToDelete = document.querySelector('.contact-to-delete');
    const deleteButton = document.querySelector('.modal-btn-delete');
    
    // Mostrar datos del contacto a eliminar
    contactToDelete.textContent = `${contacto.nombre} (${contacto.email})`;
    
    // Configurar botón de eliminar
    deleteButton.onclick = () => eliminarContacto(contacto.id);
    
    // Mostrar modal
    abrirModal(confirmModal);
}

// Funciones para manejar los modales
function abrirModal(modal) {
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModal(modal) {
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

// Función para mostrar notificaciones
function mostrarNotificacion(mensaje, tipo = 'success') {
    // Crear elemento de notificación
    const notificacion = document.createElement('div');
    notificacion.className = `notificacion ${tipo}`;
    
    // Icono según el tipo
    let icono = 'check-circle';
    if (tipo === 'error') icono = 'exclamation-circle';
    if (tipo === 'warning') icono = 'exclamation-triangle';
    if (tipo === 'info') icono = 'info-circle';
    
    // Contenido de la notificación
    notificacion.innerHTML = `
        <i class="fas fa-${icono}"></i>
        <span>${mensaje}</span>
    `;
    
    // Añadir al DOM
    document.body.appendChild(notificacion);
    
    // Mostrar con animación
    setTimeout(() => {
        notificacion.classList.add('show');
    }, 10);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        notificacion.classList.remove('show');
        setTimeout(() => {
            notificacion.remove();
        }, 300);
    }, 3000);
}

// Función para buscar contactos
function buscarContactos(query) {
    if (!query) {
        renderizarTablaContactos(contactos);
        return;
    }
    
    const termino = query.toLowerCase();
    const resultados = contactos.filter(c => 
        c.nombre.toLowerCase().includes(termino) || 
        c.email.toLowerCase().includes(termino) ||
        c.estado_funnel.toLowerCase().includes(termino)
    );
    
    renderizarTablaContactos(resultados);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    // Verificar sesión y cargar contactos
    fetch('/api/login')
        .then(res => {
            if (res.status === 401) {
                window.location.href = 'login.html';
            } else {
                // Cargar contactos solo si está autenticado
                listarContactos();
            }
        });
    
    // Botón para crear nuevo contacto
    const newContactBtn = document.getElementById('newContactBtn');
    if (newContactBtn) {
        newContactBtn.addEventListener('click', abrirModalCrear);
    }
    
    // Botones para cerrar modales
    document.querySelectorAll('.close-modal, .modal-btn-cancel').forEach(btn => {
        btn.addEventListener('click', () => {
            cerrarModal(contactModal);
            cerrarModal(confirmModal);
        });
    });
    
    // Click fuera del modal para cerrar
    window.onclick = function(event) {
        if (event.target === contactModal) {
            cerrarModal(contactModal);
        }
        if (event.target === confirmModal) {
            cerrarModal(confirmModal);
        }
    };
    
    // Buscador de contactos
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            buscarContactos(e.target.value);
        });
    }
});

// CSS para notificaciones
const notificacionStyle = document.createElement('style');
notificacionStyle.textContent = `
    .notificacion {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 25px;
        background: #fff;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.15);
        display: flex;
        align-items: center;
        gap: 12px;
        transform: translateY(-20px);
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 1000;
    }
    
    .notificacion.show {
        transform: translateY(0);
        opacity: 1;
    }
    
    .notificacion.success {
        border-left: 5px solid #28a745;
    }
    
    .notificacion.error {
        border-left: 5px solid #dc3545;
    }
    
    .notificacion.warning {
        border-left: 5px solid #ffc107;
    }
    
    .notificacion.info {
        border-left: 5px solid #17a2b8;
    }
    
    .notificacion i {
        font-size: 1.5rem;
    }
    
    .notificacion.success i {
        color: #28a745;
    }
    
    .notificacion.error i {
        color: #dc3545;
    }
    
    .notificacion.warning i {
        color: #ffc107;
    }
    
    .notificacion.info i {
        color: #17a2b8;
    }
    
    .estado-badge {
        padding: 5px 10px;
        border-radius: 20px;
        font-size: 0.85rem;
        font-weight: 500;
        display: inline-block;
    }
    
    .estado-nuevo {
        background-color: #e3f2fd;
        color: #0d47a1;
    }
    
    .estado-interesado {
        background-color: #fff9c4;
        color: #ff6f00;
    }
    
    .estado-en-negociacion {
        background-color: #e8f5e9;
        color: #2e7d32;
    }
    
    .estado-cerrado {
        background-color: #ffebee;
        color: #b71c1c;
    }
    
    .acciones-td {
        white-space: nowrap;
    }
    
    .action-icon {
        background: none;
        border: none;
        color: #6c757d;
        cursor: pointer;
        padding: 5px 8px;
        border-radius: 4px;
        transition: all 0.2s;
    }
    
    .action-icon:hover {
        background: #f1f3f5;
        color: #1a2942;
    }
    
    .edit-btn:hover {
        color: #3f8efc;
    }
    
    .delete-btn:hover {
        color: #dc3545;
    }
`;

document.head.appendChild(notificacionStyle);
