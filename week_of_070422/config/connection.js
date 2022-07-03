//Gain access to environment variables
require("dotenv").config();

const Sequelize = require("sequelize");

//Depending on what you named your .env variables, the values passed to Sequelize can change
//The JAWSDB_URL references are for once the application is uploaded on Heroku

//Create database connection
const sequelize = process.env.JAWSDB_URL ? new Sequelize(process.env.JAWSDB_URL) : new Sequelize(
    process.env.db_name,
    process.env.db_user,
    process.env.mysql_pw,
    {
        host: "localhost",
        dialect: "mysql",
        port: 3306
    }
);

module.exports = sequelize;