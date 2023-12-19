// Importar los modelos Activity y activitiesOnCountries desde el archivo db.js
const { Activity, activitiesOnCountries } = require('../db');

// Función asíncrona para manejar la creación de actividades
const postActivities = async (req, res) => {
    try {
        // Obtener los datos necesarios del cuerpo de la solicitud (name, difficulty, season, countriesId)
        const { name, difficulty, season, countriesId } = req.body;

        // Crear la actividad turística en la base de datos (o encontrarla si ya existe)
        const activity = await Activity.findOrCreate({
            where: { name },
            defaults: {
                name, difficulty, season
            }
        });

        // Crear la relación entre la actividad turística y los países especificados
        const activityOnCountry = await Promise.all(countriesId.map(async (country) => {
            return await activitiesOnCountries.findOrCreate({
                where: {
                    CountryId: country, ActivityId: activity[0].id
                },
                defaults: {
                    CountryId: country, ActivityId: activity[0].id
                }
            });
        }));

        // Verificar si se creó la relación entre la actividad y los países
        if (activityOnCountry) {
            return res.status(200).json({ activityOnCountry, status: true });
        } else {
            // Responder con un mensaje indicando que no se creó la actividad
            return res.status(200).json({ message: 'No se creó la actividad.', status: false });
        }

    } catch (error) {
        // Manejar cualquier error y responder con un mensaje de error
        res.status(500).json({ error: error.message, status: false });
    }
}

// Exportar la función postActivities
module.exports = postActivities;
