import express from 'express';
import { getCliente, createCliente, updateCliente, deleteCliente } from '../controllers/clienteControllers.js';

const router = express.Router();

router.get('/', getCliente);
router.post('/', createCliente);
router.put('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;
