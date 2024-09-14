import mongoose from 'mongoose';

export default async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_CNN);  // Usa la variable del .env
        console.log('Conectado a MongoDB');
    } catch (err) {
        console.error('Error de conexión a MongoDB:', err);
        process.exit(1);  // Sale del proceso en caso de error
    }
}
