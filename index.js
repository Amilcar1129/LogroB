import express from 'express';
import cors from 'cors';
import { PORT } from './config/config.js';
import routerproducto from './router/productoRoute.js';  // Asegúrate de la ruta correcta
import { sequelize } from './db/conexion.js';

const _PORT = PORT || 3000;
const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', routerproducto);  // Usa la ruta del producto

const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ force: false });  // Sincroniza la base de datos y fuerza la creación de tablas
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
};

main();
