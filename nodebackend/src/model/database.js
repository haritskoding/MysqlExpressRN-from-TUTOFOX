let Sequelize = require('sequelize');

const sequelize = new Sequelize(
    'mern',//databasse
    'root',//user
    '',//password
    {
        host: 'localhost',
        dialect: 'mysql'
    }
);

module.exports = sequelize;