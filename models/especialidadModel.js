import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

const Especialidad = sequelize.define(
  "Especialidad",
  {
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
  { timestamps: false }
);

export default Especialidad;
