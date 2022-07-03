const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //You may have to adjust this depending on location of database configuration

class Team extends Model {
    
}

Team.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        //Here, I used an underscored column title because the underscored property is set to true below
        team_name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [3]
            }
        },
        are_heroic: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: "user",
                key: "id"
            }
        }
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'team'
    }
);


module.exports = Team;
