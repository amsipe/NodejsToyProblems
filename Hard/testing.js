var fs = require('fs');

var employees = fs.readFileSync('something.json','utf8')

console.log(typeof JSON.parse(employees));