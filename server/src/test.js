
var fs = require('fs');
const Path = require('path')
var dict = {
    "one": [15, 4.5],
    "two": [34, 3.3],
    "three": [67, 5.0],
    "four": [32, 4.1]
};


// var dictstring = JSON.stringify(dict);

// fs.writeFile(Path.join(__dirname, "thing.json"), dictstring, function (err, result) {
//     if (err) console.log('error', err);
// });

const path = Path.join(__dirname, "../key", "thing.json");

console.log(path)

console.log(fs.existsSync(path))