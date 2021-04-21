const actions = {}
const db = require('../database');

actions.saveNewEmployee = (req,res) =>{
    const data = req.body;
    db.query("INSERT INTO employees VALUES(?,?, ?, ?, ?, ?)",[data.empNum,data.birthday,data.firstName,data.lastName,data.gender,data.hireDate],(err,response)=>{
        if(err)return res.json(err);
        
    });
};

module.exports = actions;