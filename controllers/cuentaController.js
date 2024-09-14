import CuentaAhorro from '../models/CuentaAhorro.js';

export const getCuenta = async (req, res) => {
    try {
        const cuenta = await CuentaAhorro.findOne({ numeroCuenta: req.params.numeroCuenta });
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });
        res.json(cuenta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const createCuenta = async (req, res) => {
    const { documentoCliente, fechaApertura, saldo, claveAcceso } = req.body;
    try {
        const maxCuenta = await CuentaAhorro.findOne().sort('-numeroCuenta');
        const nuevoNumeroCuenta = maxCuenta ? maxCuenta.numeroCuenta + 1 : 1;

        const cuenta = new CuentaAhorro({
            numeroCuenta: nuevoNumeroCuenta,
            documentoCliente,
            fechaApertura,
            saldo,
            claveAcceso
        });

        await cuenta.save();
        res.status(201).json(cuenta);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

export const depositarDinero = async (req, res) => {
    const { monto } = req.body;
    if (monto <= 0) return res.status(400).json({ message: 'El monto debe ser positivo.' });

    try {
        const cuenta = await CuentaAhorro.findOne({ numeroCuenta: req.params.numeroCuenta });
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });

        cuenta.saldo += monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const retirarDinero = async (req, res) => {
    const { monto } = req.body;
    if (monto <= 0) return res.status(400).json({ message: 'El monto debe ser positivo.' });

    try {
        const cuenta = await CuentaAhorro.findOne({ numeroCuenta: req.params.numeroCuenta });
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });
        if (monto > cuenta.saldo) return res.status(400).json({ message: 'Saldo insuficiente.' });

        cuenta.saldo -= monto;
        await cuenta.save();
        res.json(cuenta);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteCuenta = async (req, res) => {
    try {
        const cuenta = await CuentaAhorro.findOne({ numeroCuenta: req.params.numeroCuenta });
        if (!cuenta) return res.status(404).json({ message: 'Cuenta no encontrada' });
        if (cuenta.saldo > 0) return res.status(400).json({ message: 'La cuenta no puede ser eliminada si tiene saldo.' });

        await CuentaAhorro.deleteOne({ numeroCuenta: req.params.numeroCuenta });
        res.status(204).end();
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
