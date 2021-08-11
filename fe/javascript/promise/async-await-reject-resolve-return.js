// -----------------------async-reject-resolve-return-------------------------

const p1 = () => Promise.reject('reject val');
(async () => {

    const p = await p1();
    // await Promise.reject值 不可以赋值给p
    // 不执行
    console.log('reject1', p)

})()
// Promise {<rejected>: "reject val"}
// VM316:9 Uncaught (in promise) reject val


// async 在await Promise之后， 在resolve 、reject 状态之后。的值的赋值
const p1 = () => Promise.reject('reject val');
(async () => {
    try {
        const p = await p1();
        // await Promise.reject值 不可以赋值给p   
        // 不执行
        console.log('reject', p)
    } catch (val) {
        // await Promise.reject值 不可以赋值给p,只能通过被try catch捕获 
        console.log('reject', val)
    }
})()

// reject reject val
// Promise {<fulfilled>: undefined}