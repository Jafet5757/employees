const express = require('express');
const router = express.Router();
const db = require('../database');

//rutas de los controladores
const departaments = require('../controller/departaments.js');
const employees = require('../controller/employees.js')

router.get('/',(req,res) => {
    res.render('index', {});
});
//
router.post('/getDepartaments', departaments.getDepartaments);
router.post('/addNewDepartament',departaments.addNewDepartament);
router.post('/deleteDepartament', departaments.deleteDepartament);
router.post('/getDepartament', departaments.getDepartament);
router.post('/updateDepartament', departaments.updateDepartament);
router.post('/saveNewEmployee',employees.saveNewEmployee);

module.exports = router;