import { DataTypes } from "sequelize";
import Categoria from './categoriaModel.js';
import { sequelize } from "../db/conexion.js";

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },

  
},
{timestamps:false}
);

Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

export default Producto;
