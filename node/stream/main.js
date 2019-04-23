const parallel =require('./stream')
const fs = require('fs');
const read1 = fs.createReadStream('./bigA.txt');
const read2 = fs.createReadStream('./bigB.txt');

const write = fs.createWriteStream('./dist.txt');

console.time('streamParallel');
parallel(read1, read2).pipe(write).on('finish', () => {
  console.log('end');
  console.timeEnd('streamParallel');
});
