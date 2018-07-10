// console.log(1)

// setTimeout(() => {
//   console.log(2)
// }, 0)

// Promise.resolve().then(() => {
// 	console.log(3)
// }).then(() => {
// 	console.log(4)
// })

// console.log(5)

// setTimeout(function () {
//     console.log(1)
// });
// var startTime = Date.now()
// new Promise(function (resolve, reject) {
//     console.log(2);
//     console.log('同步计时....');
//     while (true) {
//         if (Date.now() - startTime > 5000) {
//             console.log(3);
//             resolve();
//             break;
//         }
//     }
// }).then(function () {
//     console.log(4)
// });

// console.log(5);

setTimeout(() => {
    console.log(2)
}, 2);
setTimeout(() => {
    console.log(1)
}, 1);
setTimeout(() => {
    console.log(3)
}, 3);


