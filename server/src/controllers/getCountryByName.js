const { Op } = require('sequelize');
const {Country} = require('../db');

const getCountryByName = async(req, res) => {
    try {
        const {name} = req.query;

        if(!name) return res.status(404).json({notFound: '!Country not found.'});

        const countryFound = await Country.findOne({
            where:{
                name:{
                    [Op.iLike]: `${name}`
                }
            }
        });

        if(countryFound) return res.status(200).json(countryFound);

    } catch (error) {
        return res.status(500).json({error: error.message});
    }
}

module.exports = getCountryByName;