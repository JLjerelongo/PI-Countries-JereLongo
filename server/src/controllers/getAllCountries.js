//Modelo
const { Op } = require('sequelize');
const {Country, Activity} = require('../db');
//Axios
const axios = require('axios');
//API
const URL = 'http://localhost:5000/countries';

const getAllCountries = async(req, res) => {
    try {
        const {name} = req.query;
        
        if(name){
            const countryFound = await Country.findOne({
                where:{
                    name:{
                        [Op.iLike]: `${name}`
                    }
                }
            });
            if(countryFound){
                return res.status(200).json({countryFound, status: true});
            } else {
                return res.status(200).json({message: error.message, status:false});
            }
        } else {

            //Consulta a la API
            const {data} = await axios(URL);
            
            if(data.length){
                await data.map(async(country) => {
                    await Country.findOrCreate({
                        where:{id: country.cca3},
                        defaults:{
                            id: country.cca3,
                            name: country.name.common,
                            image: country.flags.svg,
    
                            continent: country.continents
                            ? country.continents[0]
                            : 'This country is not part of a continent!',
    
                            capital: country.capital
                            ? country.capital[0]
                            : 'This country lacks a designated capital!',
    
                            population: country.population,
    
                            subregion: country.subregion
                            ? country.subregion
                            : 'This country has no subregion!',
    
                            area: country.area
                            ? country.area
                            : 'This country has no area!'
                        }
                    })
                })
                const allCountries = await Country.findAll({
                    include: [{
                        model: Activity,
                        atributes: ['name', 'dificulty', 'season']
                    }]
                });
    
                return res.status(200).json(allCountries);
            }
        }
    } catch (error) {
        return error.message;
    }
}

module.exports = getAllCountries;