const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //You may have to adjust this depending on location of database configuration

class Power extends Model {
    
}

Power.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        power_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        power_description: {
            type: DataTypes.STRING,
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'power'
    }
);


module.exports = Power;