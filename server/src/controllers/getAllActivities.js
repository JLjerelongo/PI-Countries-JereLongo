// Importar el modelo Activity desde el archivo db.js
const { Activity } = require('../db');

// Función asíncrona para manejar la obtención de todas las actividades
const getAllActivities = async (req, res) => {
    try {
        // Obtener todas las actividades de la base de datos
        const allActivities = await Activity.findAll();

        // Verificar si se encontraron actividades y responder en consecuencia
        if (allActivities.length > 0) {
            return res.status(200).json({
                allActivities,
                status: true
            });
        } else {
            return res.status(200).json({
                message: 'No se encontró ninguna actividad.',
                status: false
            });
        }

    } catch (error) {
        // Manejar cualquier error y responder con un mensaje de error
        res.status(500).json({
            error: error.message,
            status: false
        });
    }
}

// Exportar la función getAllActivities
module.exports = getAllActivities;
