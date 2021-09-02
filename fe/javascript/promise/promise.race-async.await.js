const fn = (ms) => new Promise((resolve, _) => {
    setTimeout(() => {
        resolve('resolved ' + ms)
    }, ms);
});
// (async () => {
//     const res = await Promise.race([fn(10), fn(20)])
//     console.log('res', res)
// })()

let res
(async () => {
    const f1 = fn(10000)
    const f2 = fn(5000)
    res = await f1 || await f2;
    console.log('res2', res)
})()
