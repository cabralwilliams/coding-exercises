const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection'); //You may have to adjust this depending on location of database configuration
const bcrypt = require('bcrypt');
//The above should only be used if you require password encryption, meaning that this is a User model

class User extends Model {
    checkPassword(inputPw) {
        return bcrypt.compareSync(inputPw,this.password);
    }
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING(30),
            unique: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(50),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6]
            }
        }
    },
    {
        hooks: {
            //The following two hooks are used to encrypt a User password and encrypt any new password before saving - they can be deleted if not needed
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        //pass in our imported sequelize connection (the direct connection to our database)
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'user'
    }
);


module.exports = User;
