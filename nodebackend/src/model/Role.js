const Sequelize = require('sequelize');
let sequelize = require('./database');

let nametable = 'role'; //nomor table
let Role = sequelize.define(nametable, {
    role: Sequelize.STRING
},
    {
        timeStamps: false
    }

);

module.exports = Role