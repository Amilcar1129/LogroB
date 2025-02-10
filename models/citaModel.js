import { DataTypes } from "sequelize";
import Especialidad from './especialidadModel.js';
import { sequelize } from "../db/conexion.js";

const Cita = sequelize.define(
  "Cita",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    paciente: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    especialidadId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Especialidad,
        key: "id",
      },
    },
  },
  { timestamps: false }
);

Cita.belongsTo(Especialidad, { foreignKey: "especialidadId", as: "especialidad" });

export default Cita;
