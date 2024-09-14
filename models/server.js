import express from 'express';
import mongoose from 'mongoose';
import pkg from 'body-parser';
import dotenv from 'dotenv';
import authRouter from '../routes/auth.js';
import clientesRouter from '../routes/clientes.js';
import cuentasRouter from '../routes/cuentas.js';
import usuariosRouter from '../routes/usuarios.js';
import connectDB from '../config/db.js';

dotenv.config();

const { json, urlencoded } = pkg;

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;

        this.middleware();
        this.routes();
        this.connectDB();
    }

    middleware() {
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
    }

    routes() {
        this.app.use('/auth', authRouter);
        this.app.use('/clientes', clientesRouter);
        this.app.use('/cuentas', cuentasRouter);
        this.app.use('/usuarios', usuariosRouter);
    }

    connectDB() {
        connectDB();
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        });
    }
}

export default Server;
