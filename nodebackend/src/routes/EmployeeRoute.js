const express = require('express');
const router = express.Router();

const EmployeeController = require('../controllers/EmployeeController');


router.get('/list', EmployeeController.list);
router.post('/create', EmployeeController.create);
router.get('/get/:id', EmployeeController.get);
router.post('/update/:id', EmployeeController.update);
router.post('/delete/', EmployeeController.delete);
// router.get('/datatest', EmployeeController.testdata);
// router.get('/test', EmployeeController.test);
// router.get('/save', (req, res) => {
//     res.json({ status: "Employeed saved" });
// })

module.exports = router