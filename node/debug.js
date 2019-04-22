const debug=require('debug')
const debugA=debug('Test:a')
const debugB=debug('Test:b')

function fa(){
  debugA('a')
  console.log('a')
}
function fb(){
  debugB('b')
  console.log('b')
}

fa()
fb()

// export DEBUG='Test:a';node debug.js
// export DEBUG='Test:*';node debug.js
// export DEBUG='Test:*';node debug.js production
// if(process.argv[2]==='production'){
//   debugA.enabled = false;
// }
fa()

