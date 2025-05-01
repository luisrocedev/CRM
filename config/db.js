const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root', // Cambia esto si tu MySQL tiene contraseña
    database: 'crm_contactos'
});

db.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err);
    } else {
        console.log('📡 Conectado a MySQL');
    }
});

module.exports = db;
