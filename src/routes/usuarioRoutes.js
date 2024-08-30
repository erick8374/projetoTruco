import express from "express";
import { deleteUsuarios, getUsuarios,postUsuarios, updateUsuarios } from "../controllers/usuariosController.js"; 
const router = express.Router();

router.get('/usuarios/:id',getUsuarios);
router.post('/usuarios',postUsuarios);
router.delete('/usuarios/:id',deleteUsuarios);
router.put('/usuarios/:id',updateUsuarios);

export default router;