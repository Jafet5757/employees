const express = require('express');
const router = express.Router();
const db = require('../database');

//rutas de los controladores
const departaments = require('../controller/departaments.js');

router.get('/',(req,res) => {
    res.render('index', {});
});
//INSERT INTO employees VALUES(0,'2021-04-20', 'Juan', 'Perez', 'M', '2021-04-20');
router.post('/getDepartaments', departaments.getDepartaments);
router.post('/addNewDepartament',departaments.addNewDepartament);
router.post('/deleteDepartament', departaments.deleteDepartament);
router.post('/getDepartament', departaments.getDepartament);
router.post('/updateDepartament', departaments.updateDepartament);

module.exports = router;