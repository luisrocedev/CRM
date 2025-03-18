const express = require('express');
const router = express.Router();
const db = require('./config/db');
const sendFunnelEmail = require('./funnels/funnelLogic');

// Obtener todos los alumnos
router.get('/api/alumnos', (req, res) => {
    db.query('SELECT * FROM alumnos', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
});

// Crear un nuevo alumno y enviar email
router.post('/api/alumnos', (req, res) => {
    const { nombre, email, estado_funnel } = req.body;

    db.query('INSERT INTO alumnos (nombre, email, estado_funnel) VALUES (?, ?, ?)',
        [nombre, email, estado_funnel], (err, result) => {
            if (err) return res.status(500).send(err);

            const newAlumno = { id: result.insertId, nombre, email, estado_funnel };
            sendFunnelEmail(newAlumno); // Enviar email automático
            res.json(newAlumno);
        }
    );
});

// Editar alumno
router.put('/api/alumnos/:id', (req, res) => {
    const { nombre, email, estado_funnel } = req.body;
    const { id } = req.params;

    db.query('UPDATE alumnos SET nombre = ?, email = ?, estado_funnel = ? WHERE id = ?',
        [nombre, email, estado_funnel, id], (err) => {
            if (err) return res.status(500).send(err);
            res.json({ mensaje: 'Alumno actualizado correctamente' });
        }
    );
});

// Eliminar alumno
router.delete('/api/alumnos/:id', (req, res) => {
    const { id } = req.params;

    db.query('DELETE FROM alumnos WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: 'Alumno eliminado correctamente' });
    });
});

module.exports = router;
