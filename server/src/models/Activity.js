const {DataTypes} = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Activity',{
        id:{
            type: DataTypes.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: DataTypes.UUIDV4
        },
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            validate:{
                min: 1,
                max: 25
            }
        },
        dificulty:{
            type: DataTypes.INTEGER,
            validate:{
                min: 1,
                max: 5
            },
            allowNull: false
        },
        season:{
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {timestamps: false})
}