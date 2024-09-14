import Usuario from '../models/Usuario.js';

export const getUsuarios = async (req, res) => {
    try {
        const usuarios = await Usuario.find();
        res.json(usuarios);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createUsuario = async (req, res) => {
    const { nombreUsuario, password, estado } = req.body;
    const usuario = new Usuario({ nombreUsuario, password, estado });
    try {
        await usuario.save();
        res.status(201).json(usuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(usuario);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteUsuario = async (req, res) => {
    try {
        await Usuario.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
