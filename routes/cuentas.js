import express from 'express';
import { getCuenta, createCuenta, depositarDinero, retirarDinero, deleteCuenta } from '../controllers/cuentaController.js';

const router = express.Router();

router.get('/:numeroCuenta', getCuenta);
router.post('/', createCuenta);
router.post('/:numeroCuenta/depositar', depositarDinero);
router.post('/:numeroCuenta/retiro', retirarDinero);
router.delete('/:numeroCuenta', deleteCuenta);

export default router;
