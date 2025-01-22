import express from 'express';
import { crearProducto, obtenerProductosPorFecha, obtenerProductosPorCategoria, actualizarProducto,  actualizarCategoriaProducto} from '../controller/productoController.js';

const router = express.Router();


router.post('/productos', crearProducto);

router.get('/productos/fecha', obtenerProductosPorFecha);
router.get('/productos/categoria/:categoriaId', obtenerProductosPorCategoria);
router.put('/productos/:id', actualizarProducto);
router.put('/productos/:id/categoria', actualizarCategoriaProducto);


export default router;



