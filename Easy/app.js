var fs = require('fs');


fs.readFile('planets.txt','utf8',(err, data)=>{
    console.log(data);
});