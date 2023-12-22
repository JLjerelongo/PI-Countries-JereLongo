const {Activity} = require('../db');

const getAllActivities = async(req, res) => {
    try {
        const allActivities = await Activity.findAll();
        
        if(allActivities) return res.status(200).json({allActivities,
        status: true});
        else return res.status(200).json({message: 'No se encontró ninguna actividad.',
            status: false});
        
    } catch (error) {
        res.status(500).json({error: error.message, status: false});
    }
    
}

module.exports = getAllActivities;