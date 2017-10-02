var express = require('express');
var bodyParser = require('body-parser');
var {employees,addEmployee,removeEmployee,updateEmployee} = require('./employees');
// var {addEmployee} = require('./employees')

var _ = require('lodash');
var app = express();

app.use(bodyParser.json());

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

app.post('/employees',(req,res) => {
    addEmployee(req.body.name,req.body.salary,req.body.department).then((employee) => {
        res.send(employee);
    }).catch((e) => {
        res.status(400).send(e);
    })
})

app.delete('/employees/:id',(req,res) => {
    removeEmployee(req.params.id).then((newEmployees) => {
        if(newEmployees.length === employees.length){
            res.status(404).send('Employee not found');
        }else{
            res.send('Employee removed');
        }
        
    }).catch((err) => {
        res.status(404).send(err);
    })
})

app.put('/employees/:id',(req,res) => {
    updateEmployee(req.params.id,req.body).then((emp) => {
        res.send(emp);
    }).catch((e) => {
        res.status(404).send(emp);
    })

});

app.listen(3000, () => {
    console.log('Server is up.')
});