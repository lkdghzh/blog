// require.config({
//     baseUrl: '/',
//     paths: {
//         mo1: 'mo1.js',
//         mo2: 'mo2.js'
//     }
// })
require(["./mo1", "./mo2"], function (m1, m2) {
    console.log('entry')
})