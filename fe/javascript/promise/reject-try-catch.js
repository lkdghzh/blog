
// try catch 不可以捕获reject的信息
// 只可以捕获 throw 的信息
try {
    Promise.reject('reject sth')
} catch (error) {
    // 执行不到
    console.log('error', error)
}

try {
    throw new Error('throw sth')
} catch (error) {
    console.log('error', error)
}