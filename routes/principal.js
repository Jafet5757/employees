const express = require('express');
const router = express.Router();
const db = require('../database');

//rutas de los controladores
const departaments = require('../controller/departaments.js');

router.get('/',(req,res) => {
    res.render('index', {});
});

router.post('/getDepartaments', departaments.getDepartaments);
router.post('/addNewDepartament',departaments.addNewDepartament);

module.exports = router;