let fs = require('fs');
let path = require('path');
/**
 * 原生是通过new 的形式创建，所以定一个类
 */
class P {
    /**
     * 
     * @param {*} fn  //一个函数（异步、同步）
     */
    constructor(fn) {
        this.__state = 'pending'

        //fn的函数参数
        //操作成功，调用resolve并传入value
        //操作失败，调用reject并传入info
        const __resolve = function (value) {

        }
        const __reject = function (info) {

        }
        //1：创建promise实例。
        //2：执行传入函数，
        //执行的时候，可能会出错,把错误也用__reject返回出去
        try {
            fn(__resolve, __reject)
        } catch (e) {
            __reject(e)
        }

    }
    then(onFulfilled, onRejected) {

    }
}
const fileUrl = path.resolve(__dirname, './1.txt')
console.log(fileUrl)

var a = new P(function (__resolve, __reject) {
    fs.readFile(fileUrl, 'utf-8', (err, data) => {
        if (err) throw err;
        console.log(data);
    })
})