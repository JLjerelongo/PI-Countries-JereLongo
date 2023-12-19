// Importar el operador 'Op' y el modelo Country desde el archivo db.js
const { Op } = require('sequelize');
const { Country } = require('../db');

// Función asíncrona para obtener un país por su nombre
const getCountryByName = async (req, res) => {
    try {
        // Obtener el parámetro de consulta 'name' de la solicitud
        const { name } = req.query;

        // Verificar si el parámetro 'name' está presente
        if (!name) {
            // Si no está presente, responder con un mensaje indicando que el país no fue encontrado
            return res.status(404).json({ notFound: '!Country not found.' });
        }

        // Buscar el país por su nombre en la base de datos (insensible a mayúsculas y minúsculas)
        const countryFound = await Country.findOne({
            where: {
                name: {
                    [Op.iLike]: `${name}`
                }
            }
        });

        // Responder con la información del país encontrado (si existe)
        if (countryFound) {
            return res.status(200).json(countryFound);
        } else {
            // Si el país no fue encontrado, responder con un mensaje indicando que no se encontró el país
            return res.status(404).json({ notFound: 'Country not found.' });
        }

    } catch (error) {
        // Manejar cualquier error y responder con un mensaje de error
        return res.status(500).json({ error: error.message });
    }
};

// Exportar la función getCountryByName
module.exports = getCountryByName;
