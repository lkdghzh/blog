const Koa = require('koa')
const fs=require('fs')
const path=require('path')

const Router = require('koa-router')
const router = new Router()
const app = new Koa()

router.get('/', async ctx => {
  const ABPath=path.join(__dirname,'index.html')
  ctx.type='html'
  ctx.body=fs.createReadStream(ABPath)
})

router.get('/nocors', async ctx => {
  ctx.body = '/nocors'
})
app.use(router.routes())

app.listen(3000)

