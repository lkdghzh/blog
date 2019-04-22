const Koa = require('koa')
const fs=require('fs')
const path=require('path')

const app = new Koa()
app.use(async (ctx)=>{
  const ABPath=path.join(__dirname,'index.html')
  console.log(ABPath)
  ctx.type='html'
  ctx.body=fs.createReadStream(ABPath)
})

app.listen(3000)

