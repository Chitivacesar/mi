import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const cuentaAhorroSchema = new mongoose.Schema({
    numeroCuenta: { type: Number, required: true, unique: true },
    documentoCliente: { type: String, required: true },
    fechaApertura: { type: Date, required: true },
    saldo: { type: Number, required: true },
    claveAcceso: { type: String, required: true }
});

cuentaAhorroSchema.pre('save', function (next) {
    if (this.isModified('claveAcceso')) {
        if (this.claveAcceso.length !== 4) {
            return next(new Error('La clave de acceso debe tener 4 dígitos.'));
        }
        this.claveAcceso = bcrypt.hashSync(this.claveAcceso, 10);
    }
    next();
});

export default mongoose.model('CuentaAhorro', cuentaAhorroSchema);
