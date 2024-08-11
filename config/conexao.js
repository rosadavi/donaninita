require('dotenv').config();
const pass = process.env.DB_PASS;
const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_IP,
    dialect: 'mysql',
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};