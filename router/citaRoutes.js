import express from 'express';
import { crearCita, obtenerCitas, actualizarCita, reasignarEspecialidad,obtenerEspecialidades} from '../controller/citaController.js';

const router = express.Router();


router.post("/citas", crearCita);
router.get("/citas", obtenerCitas);
router.put("/citas/:id", actualizarCita);
router.patch("/citas/:id/especialidad", reasignarEspecialidad);
router.get('/especialidades', obtenerEspecialidades);


export default router;



