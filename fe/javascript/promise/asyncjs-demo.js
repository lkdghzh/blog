var async = require('async')
var fs = require('fs')

// Using callbacks
async.concat(['dir1', 'dir2'], fs.readdir, function (err, results) {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
        // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt' ]
    }
});

async.concatSeries(['dir1', 'dir2'], fs.readdir, function (err, results) {
    if (err) {
        console.log(err);
    } else {
        console.log(results);
        // [ 'file1.txt', 'file2.txt', 'file3.txt', 'file4.txt']
    }
});