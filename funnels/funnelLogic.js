const transporter = require('../config/emailConfig');

const sendFunnelEmail = (contact) => {
    let asunto, mensaje;

    switch(contact.estado_funnel) {
        case 'Nuevo':
            asunto = '¡Gracias por contactarnos!';
            mensaje = `Hola ${contact.nombre}, gracias por tu interés. Nos pondremos en contacto contigo pronto.`;
            break;

        case 'Interesado':
            asunto = '¿Podemos ayudarte con algo más?';
            mensaje = `Hola ${contact.nombre}, veo que estás interesado, ¡estamos aquí para ayudarte!`;
            break;

        case 'En Negociacion':
            asunto = 'Seguimiento de tu solicitud';
            mensaje = `Hola ${contact.nombre}, seguimos atentos a tu solicitud y cualquier duda que tengas.`;
            break;

        case 'Cerrado':
            asunto = '¡Bienvenido!';
            mensaje = `¡Felicidades ${contact.nombre}! Estamos encantados de que formes parte de nuestra comunidad.`;
            break;

        default:
            asunto = 'Actualización importante';
            mensaje = `Hola ${contact.nombre}, ha habido una actualización en tu cuenta.`;
    }

    const opcionesMail = {
        from: '"CRM Proyecto" <luisrodriguez@luisrocedev.es>', // <-- Aquí usa el correo real de IONOS
        to: contact.email,
        subject: asunto,
        text: mensaje
    };

    transporter.sendMail(opcionesMail)
        .then(info => console.log('📧 Email enviado:', info.messageId))
        .catch(err => console.error('Error al enviar email:', err));
};

module.exports = sendFunnelEmail;
