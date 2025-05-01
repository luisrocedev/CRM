const express = require('express');
const router = express.Router();
const db = require('./config/db');
const sendFunnelEmail = require('./funnels/funnelLogic');

// Obtener todos los contactos
router.get('/api/contactos', (req, res) => {
    db.query('SELECT * FROM contactos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear un nuevo contacto y enviar email
router.post('/api/contactos', (req, res) => {
    const { nombre, email, estado_funnel } = req.body;

    db.query('INSERT INTO contactos (nombre, email, estado_funnel) VALUES (?, ?, ?)',
        [nombre, email, estado_funnel], (err, result) => {
            if (err) return res.status(500).send(err);

            const newContacto = { id: result.insertId, nombre, email, estado_funnel };
            sendFunnelEmail(newContacto); // Enviar email automático
            res.json(newContacto);
        }
    );
});

// Editar contacto
router.put('/api/contactos/:id', (req, res) => {
    const { nombre, email, estado_funnel } = req.body;
    const { id } = req.params;

    db.query('UPDATE contactos SET nombre = ?, email = ?, estado_funnel = ? WHERE id = ?',
        [nombre, email, estado_funnel, id], (err) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Contacto actualizado correctamente' });
        }
    );
});

// Eliminar contacto
router.delete('/api/contactos/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM contactos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Contacto eliminado correctamente' });
    });
});

// Obtener todos los usuarios
router.get('/api/usuarios', (req, res) => {
    db.query('SELECT id, usuario FROM usuarios', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear un nuevo usuario
router.post('/api/usuarios', (req, res) => {
    const { usuario, password } = req.body;
    db.query('INSERT INTO usuarios (usuario, password) VALUES (?, ?)', [usuario, password], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ id: result.insertId, usuario });
    });
});

// Editar usuario
router.put('/api/usuarios/:id', (req, res) => {
    const { usuario, password } = req.body;
    const { id } = req.params;
    // Validar que usuario exista
    if (!usuario) {
        return res.status(400).json({ error: 'El nombre de usuario es obligatorio' });
    }
    // Si se envía password, actualiza ambos campos. Si no, solo usuario.
    if (password) {
        db.query('UPDATE usuarios SET usuario = ?, password = ? WHERE id = ?', [usuario, password, id], (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
            res.json({ mensaje: 'Usuario actualizado correctamente' });
        });
    } else {
        db.query('UPDATE usuarios SET usuario = ? WHERE id = ?', [usuario, id], (err, result) => {
            if (err) return res.status(500).send(err);
            if (result.affectedRows === 0) return res.status(404).json({ error: 'Usuario no encontrado' });
            res.json({ mensaje: 'Usuario actualizado correctamente' });
        });
    }
});

// Eliminar usuario
router.delete('/api/usuarios/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuarios WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Usuario eliminado correctamente' });
    });
});

module.exports = router;
