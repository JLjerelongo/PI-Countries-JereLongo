const {Country, Activity} = require('../db');

const getCountryById = async(req, res) => {
    try {
        const {id} = req.params;
        
        if(!id) res.status(404).json({notFound: '!Country not found.'});

        const countryFound = await Country.findOne({
            where: {id},
            include: [{model: Activity}]
        });
        //const countryFound = await Country.findByPk(id);
        res.status(200).json(countryFound);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = getCountryById;