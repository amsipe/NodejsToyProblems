var _ = require('lodash');
var fs = require('fs');

var employees = JSON.parse(fs.readFileSync('employees.json','utf8'))
var addEmployee = (name,salary,dept) => {
    var newId = _.maxBy(employees,'id').id + 1;
    var newEmployee = {
        id: newId,
        name,
        salary,
        dept
    }
    employees.push(newEmployee);
    return new Promise((resolve,reject) => {
        fs.writeFile('employees.json',JSON.stringify(employees),(err) => {
            if(err){
                reject(err);
            }else{
                resolve(newEmployee)
            }
        })
    })
}

var removeEmployee = (id) => {

    var newEmployees = _.filter(employees,(emp) => {
        return emp.id != id;
    });

    return new Promise((resolve,reject) => {
        fs.writeFile('employees.json',JSON.stringify(newEmployees),(err) => {
            if(err){
                reject(err);
            }
            resolve(newEmployees);
        })
    })
}

var updateEmployee = (id,body) => {
    var newEmployees = _.forEach(employees,(emp) => {
        if(emp.id == id){
            emp.name = body.name || emp.name;
            emp.salary = body.salary || emp.salary;
            emp.department = body.department || emp.department;
        }
    })
    return new Promise((resolve,reject) => {
        
        fs.writeFile('employees.json',JSON.stringify(newEmployees),(err) => {
            if(err){
                reject(err);
            }
            
            resolve(_.find(employees,{id: _.toInteger(id)}));
        })
    })
}


module.exports = {
    employees,
    addEmployee,
    removeEmployee,
    updateEmployee
};
// module.exports.addEmployee = addEmployee;

// module.exports.addEmployee = addEmployee;
