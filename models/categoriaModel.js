import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },


 
},
{timestamps:false}
);

// Usa ES Modules para exportar el modelo
export default Categoria;
