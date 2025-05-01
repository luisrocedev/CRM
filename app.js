const express = require('express');
const session = require('express-session');
const app = express();
const path = require('path');

// Middleware para JSON
app.use(express.json());

// Middleware de sesión
app.use(session({
    secret: 'crm_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));
app.use('/chart.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'chart.js'));
});

// Rutas para la API (importación correcta y antes del listen())
const contactsRoutes = require('./api_contacts.js');
app.use('/', contactsRoutes);

// --- LOGIN API ---
const db = require('./config/db');
app.post('/api/login', (req, res) => {
    const { usuario, password } = req.body;
    db.query('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password], (err, results) => {
        if (err) return res.status(500).json({ error: 'Error en la base de datos' });
        if (results.length === 1) {
            req.session.usuario = usuario;
            res.json({ success: true });
        } else {
            res.status(401).json({ success: false, error: 'Credenciales incorrectas' });
        }
    });
});

// Nuevo endpoint para comprobar sesión
app.get('/api/login', (req, res) => {
    if (req.session && req.session.usuario) {
        res.json({ autenticado: true, usuario: req.session.usuario });
    } else {
        res.status(401).json({ autenticado: false });
    }
});

app.post('/api/logout', (req, res) => {
    req.session.destroy(() => {
        res.json({ success: true });
    });
});

// Middleware para proteger rutas
function requireLogin(req, res, next) {
    if (req.session && req.session.usuario) {
        next();
    } else {
        res.status(401).json({ error: 'No autenticado' });
    }
}

// Ejemplo de protección de API (puedes usar requireLogin en las rutas que quieras proteger)
// app.use('/api/contactos', requireLogin);

// Ruta inicial
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './views' });
});

// Puerto configurado
const PORT = process.env.PORT || 3001;

// Iniciar servidor en el puerto configurado
app.listen(PORT, () => {
  console.log(`Servidor CRM en puerto ${PORT} 🚀`);
});
