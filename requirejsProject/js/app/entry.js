// console.log(1)
requirejs.config({
    baseUrl: '',//js/lib
    path:{

    }
})
requirejs(['js/index/b.js'],function (b) {
    console.log(b.b)
})