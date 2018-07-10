var p=new Promise(function(_resovle,_reject){
    setTimeout(()=>{
        console.log(1)
        _resovle(2)
    },2000)
}).then(()=>{
    setTimeout(()=>{
        console.log(3)
    },3000)
})
