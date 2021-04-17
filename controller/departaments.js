const actions = {};
const db = require('../database');

actions.getDepartaments = (req, res) => {
    console.log('regresamos departamentos');
    
    db.query('SELECT * FROM departments', (err, dept) =>{
        if(err) res.json(err);
        return res.send(dept);
    });
};

actions.addNewDepartament = (req, res) =>{
    console.log('agregamos departamento');
    let data = req.body;
    console.log(data);
    db.query("INSERT INTO departments VALUES (?,?)",[data.idDept, data.nameDept], (err,response) =>{
        if(err)res.json(err);
        res.send('good');
    });
}

module.exports = actions;