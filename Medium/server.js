var express = require('express');
var {employees} = require('./utils/employees');

var _ = require('lodash');
var app = express();

app.get('/employees',(req,res) => {
    res.send(employees);
})

app.get('/employees/:id',(req,res) => {
    var emp = _.find(employees,{id: _.toInteger(req.params.id)});
    if(!emp){
        return res.status(404).send('Employee does not exist.')
    }
    res.send(emp);
    
    
})

app.listen(3000, () => {
    console.log('Server is up.')
});