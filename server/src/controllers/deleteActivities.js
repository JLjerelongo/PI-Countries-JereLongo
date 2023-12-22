const {Activity} = require('../db');

const deleteActivity = async(req, res) => {
    try {
        const {id} = req.params;
        const deleteActivity = await Activity.destroy({where: {id}});

        if(deleteActivity) return res.status(200).json({
            status: true,
            deleteActivity
        })
        return res.status(200).json({
            status: false,
            message: 'There is no activity to delete.'
        })

    } catch (error) {
        res.status(500).json({
            status: false,
            message: 'Activity could not be deleted.'
        })
    }
}

module.exports = deleteActivity;