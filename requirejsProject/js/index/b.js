//requirejsProject/js/lib/js/index/a.js

// define(['js/index/a'],function (a) {
//     return{
//         b:'b引用'+a.a
//     }
// })

 define(['js/index/a.js'],function (a) {
    return{
        b:'这是b模块，引用'+a.a
    }
})