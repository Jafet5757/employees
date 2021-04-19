const actions = {};
const db = require('../database');

actions.getDepartaments = (req, res) => {
    console.log('regresamos departamentos');
    
    db.query('SELECT * FROM departments', (err, dept) =>{
        if(err) return res.json(err);
        return res.send(dept);
    });
};

actions.addNewDepartament = (req, res) =>{
    console.log('agregamos departamento');
    let data = req.body;
    console.log(data);
    db.query("INSERT INTO departments VALUES (?,?)",[data.idDept, data.nameDept], (err,response) =>{
        if(err) return res.json(err);
        return res.send('good');
    });
}

actions.deleteDepartament = (req, res) =>{
    let data = req.body;
    db.query("DELETE FROM departments WHERE dept_no=?",[data.id],(err, response) =>{
        if(err) return res.json(err);
        return res.send('good');
    });
};

actions.getDepartament = (req,res) =>{
    let data = req.body;
    db.query("SELECT dept_name FROM departments WHERE dept_no=?",[data.id],(err, dept) =>{
        if(err) return res.json(err);
        console.log(dept);
        return res.send(dept);
    });
}

actions.updateDepartament = (req,res) =>{
    const data = req.body;
    db.query('UPDATE departments SET dept_name=? WHERE dept_no=?',[data.nameDept,data.idDept],(err, response)=>{
        if(err) return res.json(err);
        return res.send('good');
    });
};

module.exports = actions;