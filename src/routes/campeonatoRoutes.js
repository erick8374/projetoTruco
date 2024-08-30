import express from "express";
import { deleteCampeonatos, getCampeonatos,postCampeonatos, updateCampeonatos } from "../controllers/campeonatoController.js"; 
const router = express.Router();

router.get('campeonatos/:id',getCampeonatos);
router.post('campeonatos',postCampeonatos);
router.delete('campeonatos/:id',deleteCampeonatos);
router.put('campeonatos/:id',updateCampeonatos);

export default router;