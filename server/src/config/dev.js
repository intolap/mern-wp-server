var fs = require('fs');
const Path = require('path')

var dir = ''

if(fs.existsSync(Path.join(__dirname, "config.json"))){
   dir = require('./config.json'); 
}

module.exports = {
    DB: dir.dbUrl
}