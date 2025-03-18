const express = require('express');
const app = express();
const path = require('path');

// Middleware para JSON
app.use(express.json());

// Archivos estáticos
app.use(express.static(path.join(__dirname, 'views')));

// Rutas para la API (importación correcta y antes del listen())
const contactsRoutes = require('./api_contacts.js');
app.use('/', contactsRoutes);

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
