const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //You may have to adjust this depending on location of database configuration

class Metapower extends Model {
    
}

Metapower.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        metahuman_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "metahuman",
                key: "id"
            }
        },
        power_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "power",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'metapower'
    }
);


module.exports = Metapower;