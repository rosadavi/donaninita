const Sequelize = require('sequelize');
const sequelize = new Sequelize('wanderso_davirosa', 'wanderso_davirosa_user', 'KmRO4nIxYEuo', {
    host: '209.133.214.194',
    dialect: 'mysql2',
});

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
};