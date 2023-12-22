const {Activity, activitiesOnCountries} = require('../db');

const postActivities = async(req, res) => {
    try {
        const {name, dificulty, season, countriesId} = req.body;
        
        const activity = await Activity.findOrCreate({
            where:{name},
            defaults:{
                name, dificulty, season
            }
        });

        const activityOnCountry = await countriesId.map(async(country) => {
            await activitiesOnCountries.findOrCreate({
                where:{
                    CountryId: country, ActivityId: activity[0].id
                },
                defaults:{
                    CountryId: country, ActivityId: activity[0].id
                }
            })
        })
        
        if(activityOnCountry) return res.status(200).json({activityOnCountry, status: true});

        else return res.status(200).json({message: 'No se creó la actividad.', status: false});
        
    } catch (error) {
        res.status(500).json({error: error.message, status: false});
    }
}

module.exports = postActivities;