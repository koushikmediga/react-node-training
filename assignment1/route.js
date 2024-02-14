// routes.js
const express = require('express');
const router = express.Router();
const employeesController = require('./employeesController');

router.post('/employees', employeesController.createEmployee);
router.get('/employees', employeesController.getAllEmployees);
router.get('/employees/id/:id', employeesController.getEmployeebyId);
router.get('/employees/name:employeeName', employeesController.getEmployeebyName);
router.put('/employees/:id',employeesController.updateEmployee);
router.delete('/employees/:id',employeesController.deleteEmployee);


module.exports = router;
