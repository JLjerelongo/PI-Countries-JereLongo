//Express
const express = require("express");
const server = express();
//Router
const {router} = require("./src/routes/index");
const PORT = 3001;
//Connection con Sequelize
const {conn} = require('./src/db');
//Requerir a todos los países
const getAllCountries = require('./src/controllers/getAllCountries');

const morgan = require("morgan");
const cors = require("cors");

//Middlewares
server.use(morgan("dev"));
server.use(express.json());
server.use(cors());
server.use('/',router);

//*Iniciar puerto
server.listen(PORT, async() => {
    try {
        await conn.sync({alter: true});

        //Traer a los países apenas se levanta el server
        await getAllCountries();
        console.log(`Listen on port: ${PORT}`);
        
    } catch (error) {
        throw Error(error.message);
    }
});