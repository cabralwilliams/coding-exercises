const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //You may have to adjust this depending on location of database configuration

class Metahuman extends Model {
    
}

Metahuman.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3,30]
            }
        },
        secret_identity: {
            type: DataTypes.STRING,
            allowNull: true
        },
        team_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "team",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'metahuman'
    }
);


module.exports = Metahuman;