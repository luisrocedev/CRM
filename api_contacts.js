const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const sendFunnelEmail = require('./funnels/funnelLogic');

const contactsFile = path.join(__dirname, 'data', 'contacts.json');

// Leer contactos (GET)
router.get('/api/contacts', (req, res) => {
    fs.readFile(contactsFile, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error al leer contactos');
        }
        res.json(JSON.parse(data));
    });
});

// Crear contacto (POST) + Envío de email automático
router.post('/api/contacts', (req, res) => {
    try {
        const contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));

        const newContact = {
            id: contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1,
            ...req.body
        };

        contacts.push(newContact);
        fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));

        // Envío automático del email
        sendFunnelEmail(newContact);

        res.json(newContact);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al crear contacto');
    }
});

// Editar contacto (PUT) + Envío de email automático
router.put('/api/contacts/:id', (req, res) => {
    try {
        let contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
        const id = parseInt(req.params.id);
        const index = contacts.findIndex(c => c.id === id);

        if (index === -1) {
            return res.status(404).send('Contacto no encontrado');
        }

        contacts[index] = { id: contacts[index].id, ...req.body };
        fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));

        // Envío automático del email
        sendFunnelEmail(contacts[index]);

        res.json(contacts[index]);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al editar contacto');
    }
});

// Eliminar contacto (DELETE)
router.delete('/api/contacts/:id', (req, res) => {
    try {
        let contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8'));
        const id = parseInt(req.params.id);

        const initialLength = contacts.length;
        contacts = contacts.filter(contact => contact.id !== id);

        if (contacts.length === initialLength) {
            return res.status(404).send('Contacto no encontrado');
        }

        fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
        res.json({ mensaje: 'Contacto eliminado correctamente' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al eliminar contacto');
    }
});

module.exports = router;