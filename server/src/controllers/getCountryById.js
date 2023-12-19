// Importar el modelo Country y Activity desde el archivo db.js
const { Country, Activity } = require('../db');

// Función asíncrona para obtener un país por su ID
const getCountryById = async (req, res) => {
    try {
        // Obtener el parámetro 'id' de los parámetros de la solicitud
        const { id } = req.params;

        // Verificar si el parámetro 'id' está presente
        if (!id) {
            // Si no está presente, responder con un mensaje indicando que el país no fue encontrado
            return res.status(404).json({ notFound: 'Country not found.' });
        }

        // Buscar el país por su ID en la base de datos, incluyendo las actividades asociadas
        const countryFound = await Country.findOne({
            where: { id },
            include: [{ model: Activity }]
        });

        // Responder con la información del país encontrado
        res.status(200).json(countryFound);
    } catch (error) {
        // Manejar cualquier error y responder con un mensaje de error
        res.status(500).json({ error: error.message });
    }
};

// Exportar la función getCountryById
module.exports = getCountryById;
