import Cita from '../models/citaModel.js';
import Especialidad from '../models/especialidadModel.js';
import { Op } from "sequelize";  

// 📌 Crear una cita médica
export const crearCita = async (req, res) => {
  try {
    const { paciente, fecha, especialidadId } = req.body;

    if (!paciente || !fecha || !especialidadId) {
      return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    const especialidad = await Especialidad.findByPk(especialidadId);
    if (!especialidad) {
      return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    const nuevaCita = await Cita.create({ paciente, fecha, especialidadId });
    res.status(201).json(nuevaCita);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 📌 Obtener citas filtradas por fecha y especialidad
export const obtenerCitas = async (req, res) => {
  try {
    const { fecha, especialidadId } = req.query;

    // 🔍 Mostramos en consola los valores recibidos
    console.log("Fecha recibida:", fecha);
    console.log("Especialidad recibida:", especialidadId);

    const filtro = {};
    if (fecha) {
      filtro.fecha = { 
        [Op.gte]: `${fecha} 00:00:00`, 
        [Op.lte]: `${fecha} 23:59:59` 
      };
    }
    if (especialidadId) filtro.especialidadId = especialidadId;

    // 🔍 Mostramos en consola el objeto `where`
    console.log("Filtro Sequelize:", filtro);

    const citas = await Cita.findAll({
      where: filtro,
      include: { model: Especialidad, as: "especialidad" }
    });

    res.status(200).json(citas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// 📌 Editar una cita médica
export const actualizarCita = async (req, res) => {
  try {
    const { id } = req.params;
    const { paciente, fecha, especialidadId } = req.body;

    const cita = await Cita.findByPk(id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });

    if (especialidadId) {
      const especialidad = await Especialidad.findByPk(especialidadId);
      if (!especialidad) return res.status(404).json({ message: "Especialidad no encontrada" });
    }

    cita.paciente = paciente || cita.paciente;
    cita.fecha = fecha || cita.fecha;
    cita.especialidadId = especialidadId || cita.especialidadId;

    await cita.save();
    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar la cita", error: error.message });
  }
};

// 📌 Reasignar especialidad a una cita médica
export const reasignarEspecialidad = async (req, res) => {
  try {
    const { id } = req.params;
    const { especialidadId } = req.body;

    const cita = await Cita.findByPk(id);
    if (!cita) return res.status(404).json({ message: "Cita no encontrada" });

    const especialidad = await Especialidad.findByPk(especialidadId);
    if (!especialidad) return res.status(404).json({ message: "Especialidad no encontrada" });

    cita.especialidadId = especialidadId;
    await cita.save();

    res.json(cita);
  } catch (error) {
    res.status(500).json({ message: "Error al reasignar especialidad" });
  }
  

  
};
