const Sequelize = require('sequelize');
const sequelize = new Sequelize('wanderso_davirosa', 'wanderso_davirosa_user', 'KmRO4nIxYEuo', {
    host: '199.193.117.238',
    dialect: 'mysql',
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};