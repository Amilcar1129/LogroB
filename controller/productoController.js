import Producto from '../models/productoModel.js';
import Categoria from '../models/categoriaModel.js';

export const crearProducto = async (req, res) => {
  try {
    const { nombre, precio, fecha_creacion, categoriaId} = req.body;
    
    if (!(nombre && precio && fecha_creacion && categoriaId )) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }
    
    const productoExistente = await Producto.findOne({ where: { nombre } });
    if (productoExistente) {
      return res.status(409).json("El producto ya existe");
    }
    
    const categoria = await Categoria.findByPk(categoriaId);
    if (!categoria) {
      return res.status(404).json({ message: "Categoría no encontrada" });
    }

    const nuevoProducto = await Producto.create({
      nombre,
      precio,
      fecha_creacion,
      categoriaId
     
    });
    
    res.status(201).json(nuevoProducto);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const obtenerProductosPorFecha = async (req, res) => {
  try {
    const { fecha_creacion } = req.query;
    
    if (!fecha_creacion) {
      return res.status(400).json({ message: "La fecha de creación es obligatoria" });
    }
    
    const productos = await Producto.findAll({
      where: {
        fecha_creacion: {
          [Op.eq]: fecha_creacion
        }
      }
    });
    
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




export const obtenerProductosPorCategoria = async (req, res) => {
  try {
    const { categoriaId } = req.params;
    
    if (!categoriaId) {
      return res.status(400).json({ message: "El ID de la categoría es obligatorio" });
    }

    const productos = await Producto.findAll({
      where: {
        categoriaId: categoriaId
      }
    });
    
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const actualizarProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { nombre, precio, fecha_creacion, categoriaId } = req.body;
  
      // Encuentra el producto por ID
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
      }
  
      // Actualiza los campos del producto
      producto.nombre = nombre || producto.nombre;
      producto.precio = precio || producto.precio;
      producto.fecha_creacion = fecha_creacion || producto.fecha_creacion;
      producto.categoriaId = categoriaId || producto.categoriaId;
  
      // Guarda los cambios
      await producto.save();
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ message: 'Error al actualizar el producto', error: error.message });
    }
  };
  

  export const actualizarCategoriaProducto = async (req, res) => {
    try {
      const { id } = req.params;
      const { categoriaId } = req.body;
  
      const producto = await Producto.findByPk(id);
      if (!producto) {
        return res.status(404).json({ mensaje: 'Producto no encontrado' });
      }
  
      producto.categoriaId = categoriaId;
      await producto.save();
  
      res.json(producto);
    } catch (error) {
      res.status(500).json({ mensaje: 'Error al actualizar la categoría del producto' });
    }
  };
  