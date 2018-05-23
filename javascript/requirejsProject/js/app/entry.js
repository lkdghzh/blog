// console.log(1)
// requirejs.config({
//     baseUrl: 'js/lib',
//     path:{
//
//     }
// })
debugger
require.config({
    baseUrl: 'js/lib',
    path:{

    }
})
requirejs(['js/index/b'],function (b) {
    console.log(b.b)
})