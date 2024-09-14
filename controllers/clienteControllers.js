import Cliente from '../models/Cliente.js';

export const getCliente = async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCliente = async (req, res) => {
    const { documentoCliente, nombreCompleto, celular, fechaNacimiento } = req.body;
    const cliente = new Cliente({ documentoCliente, nombreCompleto, celular, fechaNacimiento });
    try {
        await cliente.save();
        res.status(201).json(cliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const updateCliente = async (req, res) => {
    try {
        const cliente = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(cliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const deleteCliente = async (req, res) => {
    try {
        await Cliente.findByIdAndDelete(req.params.id);
        res.status(204).end();
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
