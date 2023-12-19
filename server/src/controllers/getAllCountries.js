// Importar los módulos necesarios
const { Op } = require('sequelize');
const { Country, Activity } = require('../db');
const axios = require('axios');

// URL de la API externa
const URL = 'http://localhost:5000/countries';

// Función asíncrona para obtener todos los países
const getAllCountries = async (req, res) => {
    try {
        // Obtener el parámetro de consulta 'name' de la solicitud
        const { name } = req.query;

        // Si se proporciona el parámetro 'name', buscar un país por nombre en la base de datos
        if (name) {
            const countryFound = await Country.findOne({
                where: {
                    name: {
                        [Op.iLike]: `${name}`
                    }
                }
            });

            // Responder con el país encontrado o un mensaje si no se encuentra
            if (countryFound) {
                return res.status(200).json({ countryFound, status: true });
            } else {
                return res.status(200).json({ message: 'Country not found', status: false });
            }
        } else {
            // Si no se proporciona el parámetro 'name', consultar la API externa
            const { data } = await axios(URL);

            // Si se obtienen datos de la API, almacenarlos en la base de datos
            if (data.length) {
                await data.map(async (country) => {
                    await Country.findOrCreate({
                        where: { id: country.cca3 },
                        defaults: {
                            // Propiedades del país obtenidas de la API
                            id: country.cca3,
                            name: country.name.common,
                            image: country.flags.svg,
                            continent: country.continents ? country.continents[0] : 'This country is not part of a continent!',
                            capital: country.capital ? country.capital[0] : 'This country lacks a designated capital!',
                            population: country.population,
                            subregion: country.subregion ? country.subregion : 'This country has no subregion!',
                            area: country.area ? country.area : 'This country has no area!'
                        }
                    });
                });

                // Obtener todos los países de la base de datos, incluyendo las actividades relacionadas
                const allCountries = await Country.findAll({
                    include: [{
                        model: Activity,
                        attributes: ['name', 'difficulty', 'season']
                    }]
                });

                // Responder con la lista de todos los países
                return res.status(200).json(allCountries);
            }
        }
    } catch (error) {
        // Manejar cualquier error y devolver un mensaje de error
        return error.message;
    }
};

// Exportar la función getAllCountries
module.exports = getAllCountries;
