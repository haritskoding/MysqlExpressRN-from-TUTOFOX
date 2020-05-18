const Sequelize = require('sequelize');
let sequelize = require('./database');
//import Role for FK roleId
let Role = require('./Role');
//table name
let nametable = 'empleado'

let Employee = sequelize.define(nametable,{

    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:Sequelize.STRING,
    email:Sequelize.STRING,
    address:Sequelize.STRING,
    phone:Sequelize.INTEGER,

    //Foreign kEY
    roleId:{
        type:Sequelize.INTEGER,
        //this is a reference to another model
        references:{
            model:Role,
            key:'id'
        }
    } 
})

Employee.belongsTo(Role);

module.exports = Employee