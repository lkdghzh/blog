let fs = require('fs');
let path = require('path');

const fileUrl1 = path.resolve(__dirname, './1.txt')
const fileUrl2 = path.resolve(__dirname, './2.txt')
const fileUrl3 = path.resolve(__dirname, './3.txt')
console.log(fileUrl1, fileUrl2)

var a = new Promise(function (resolve, reject) {
    fs.readFile(fileUrl1, 'utf-8', (err, txt1) => {
        if (err) throw err;
        console.log(txt1);
        resolve(txt1)
    })
}).then(function (txt1) {
    debugger
    fs.readFile(fileUrl2, 'utf-8', (err, txt2) => {
        if (err) throw err;
        console.log(txt2);
    })
}).then(function (txt2) {
    debugger
    fs.readFile(fileUrl3, 'utf-8', (err, txt3) => {
        if (err) throw err;
        console.log(txt3);
    })
})
