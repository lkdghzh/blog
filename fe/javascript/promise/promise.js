/**
 * 原生是通过new 的形式创建，所以定一个类
 */
class Promise {
    /**
     * then里面是micro的job ，这里使用setTimeout 0s 模拟
     * @param {*} excutor  //这里就是同步代码excutor一个函数（异步、同步）
     */
    constructor(excutor) {
        if (typeof excutor !== 'function') {
            throw new TypeError("Promise Constructor's argument is not a function")
        }
        //1：保持状态
        this.__state = 'pending'
        //当前promise执行后的返回值。为下次then使用
        this._value = undefined

        // 2：存多个回调函数
        // then(fn1,fn2)会被调用多次，使用resovle，reject标记为成功、失败
        // 将多次的成功fn1函数、失败fn2函数，使用数组存一下
        this.__onResolveFns = []
        this.__onRejectFns = []

        //fn的函数参数
        //操作成功，调用resolve并传入value
        //操作失败，调用reject并传入info
        const resolve = function (value) {
            this._value = value
            this.__state = 'resolved'
        }
        const reject = function (info) {
            this._value = info
            this.__state = 'rejected'
        }

        //1：创建promise实例。
        //2：执行传入函数，
        //执行的时候，可能会出错,把错误也用reject返回出去
        try {
            //这里就是同步代码excutor
            excutor(resolve, reject)
        } catch (e) {
            reject(e)
        }

    }
    //这里的then 属于micro job，现在可以使用setTimeout模拟
    then(onFulfilled, onRejected) {
        var fn = undefined
        if (this.status === 'resolved') {
            fn = onFulfilled(this._value)
        }
        if (this.status === 'rejected') {
            fn = onRejected(this._value)
        }
        return new Promise(fn)
    }
}