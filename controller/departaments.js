const actions = {};
const db = require('../database');

actions.getDepartaments = (req, res) => {
    console.log('regresamos departamentos');
    
    db.query('SELECT * FROM departments', (err, dept) =>{
        if(err) res.json(err);
        return res.send(dept);
    });
};

module.exports = actions;