import express from 'express';
import Usuario from '../models/usuario.js';
import bcrypt from 'bcryptjs';

const router = express.Router();

// POST: Autenticación de usuario
router.post('/login', async (req, res) => {
    const { nombreUsuario, password } = req.body;
    try {
        const usuario = await Usuario.findOne({ nombreUsuario });
        if (!usuario) return res.status(404).json({ message: 'Usuario no encontrado' });

        const esValido = await bcrypt.compare(password, usuario.password);
        if (!esValido) return res.status(400).json({ message: 'Contraseña incorrecta' });

        res.json({ mensaje: 'Autenticación exitosa', usuario });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
