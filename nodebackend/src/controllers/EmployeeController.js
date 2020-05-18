const controllers = {}

//import model and sequelize
let sequelize = require('../model/database');
let Employee = require('../model/Employee');
let Role = require('../model/Role');

//to migrate in case you don't have tables

controllers.get = async (req, res) => {
    const { id } = req.params;

    const data = await Employee.findAll({
        where: { id: id },
        include: [Role]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data });

}

//controller delete
controllers.delete = async (req, res) => {
    // res.send("ini adalah delete")
    //parameter post
    const { id } = req.body;
    const del = await Employee.destroy({
        where: { id: id }
    })
    res.json({ success: true, deleted: del, message: "Delete successfull" });
}

//to update controller
controllers.update = async (req, res) => {
    //parameter id get
    const { id } = req.params;
    //parameter put
    const { name, email, phone, address, role } = req.body;
    //update data
    const data = await Employee.update({
        name: name,
        email: email,
        phone: phone,
        address: address,
        roleId: role
    }, {
        where: { id: id }
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })
    res.json({ success: true, data: data, message: "Update success" })
}

sequelize.sync()
controllers.list = async (req, res) => {
    const data = await Employee.findAll({
        //masukan relasi table nya
        include: [Role]
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            return error;
        })

    res.json({ success: true, data: data });
}


controllers.create = async (req, res) => {
    //  res.send('haloo ha')
    // Data parameters from post
    const { name, email, address, phone, role } = req.body;

    const data = await Employee.create({
        name: name,
        email: email,
        address: address,
        phone: phone,
        roleId: role
    })
        .then(function (data) {
            return data;
        })
        .catch(error => {
            console.log(error)
            return error;
        })

    //return res
    res.status(200).json({
        success: true,
        message: "Save successfully",
        data: data
    })
}

// controllers.testdata = async (req, res) => {
//     const response = await sequelize.sync().then(function () {

//         //create role
//         /* Role.create({
//              role: 'Admin'
//          })*/

//         //create employee
//         /* Employee.create({
//              name: 'Desi',
//              email: 'Desi@gmail.com',
//              address: 'Jakarta',
//              phone: '021 8291892',
//              roleId: 1

//          })*/

//         //call all data employee
//         const data = Employee.findAll();
//         return data;
//     })
//         .catch(error => {
//             return error;
//         });
//     res.json({ success: true, data: response })
// }

// controllers.test = (req, res) => {

//     const data = {
//         name: "Teguh M H",
//         age: 24,
//         city: 'Jakarta'
//     }

//     console.log("Execute from controllers Employee")
//     res.json(data);

// }

module.exports = controllers;