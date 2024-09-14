import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
    nombreUsuario: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    estado: { type: String, enum: ['activo', 'inactivo'], default: 'activo' }
});

// Hash de la contraseña antes de guardar si ha sido modificada
usuarioSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        this.password = bcrypt.hashSync(this.password, 10);
    }
    next();
});

// Verificar si el modelo ya ha sido registrado para evitar errores
const Usuario = mongoose.models.Usuario || mongoose.model('Usuario', usuarioSchema);

export default Usuario;
