const Koa = require('koa')
const Router = require('koa-router')

const app = new Koa()
const router = new Router()


router
  .get('/cors-err', async ctx => {
    ctx.body = '/cors-error'
  })
  .get('/cors-get', async ctx => {
    const { a, b } = ctx.query;
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.body = `简单请求，get -query ${a} ${b} -cors`
  })
  .options('/cors-put', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'PUT')//PUT 必须大写，并且预检测为下次请求的类型
    ctx.body = '非简单请求，OPTIONS cors'//返回不返回，没有需求，一般不返回
  })
  .put('/cors-put', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.body = `非简单请求，OPTIONS-PUT cors`
  })
  .options('/cors-put-get-response-header', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Access-Control-Allow-Methods', 'PUT')//PUT 必须大写，并且预检测为下次请求的类型
    ctx.body = ``
  })
  .put('/cors-put-get-response-header', async ctx => {
    ctx.set('Access-Control-Allow-Origin', '*')
    ctx.set('Server-Define','xxxxxxx')
    ctx.set('Access-Control-Expose-Headers', 'Server-Define')
    ctx.body = `cors-put-get-response-header`
  })
router
  .post('/cors-set-cookie', async ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000')//多个来源的话，可以根据请求的域名设置这个响应头
    ctx.set('Access-Control-Allow-Credentials', true)
    ctx.cookies.set('ck', 'like', { httpOnly: false })//, { maxAge: 10 * 60 * 1000,path:'/',domain:'localhost'}
    ctx.body = `已经返回了 Set-Cookie 头信息 ck=like <br/>`
  })
  .post('/cors-transf-cookie', async ctx => {
    ctx.set('Access-Control-Allow-Origin', 'http://localhost:3000') //当跨域携带cookie时，Access-Control-Allow-Origin不能设置为 *
    ctx.set('Access-Control-Allow-Credentials', true)
    let ckval = ctx.cookies.get('ck')
    ctx.body = `后台取到了前台传过来的cookie 键为ck，值为 ${ckval}`
  })
router.post('/absetnodomain', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('absetnodomain', 'absetnodomain', {httpOnly: false, maxAge: 10 * 60 * 1000, })
  ctx.body = `/absetnodomain`
})
router.post('/abseta', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('abseta', 'abseta', { httpOnly: false, domain: 'a.com', maxAge: 10 * 60 * 1000, })
  ctx.body = `/abseta`
})
router.post('/absetb', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('absetb', 'absetb', { httpOnly: false, domain: 'b.com', maxAge: 10 * 60 * 1000, })
  ctx.body = `/absetb`
})
router.post('/absetc', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('absetb', 'absetb', { httpOnly: false, domain: 'c.com', maxAge: 10 * 60 * 1000, })
  ctx.body = `/absetc`
})
router.post('/ab1bsetb1b', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('ab1bsetb1b', 'ab1bsetb1b', { httpOnly: false, domain: 'b1.b.com', maxAge: 10 * 60 * 1000, })
  ctx.body = `/ab1bsetb1b`
})
router.post('/ab1bsetb', async ctx => {
  ctx.set('Access-Control-Allow-Origin', 'http://a.com:3000 ')
  ctx.set('Access-Control-Allow-Credentials', true)
  ctx.cookies.set('ab1bsetb', 'ab1bsetb', { httpOnly: false, domain: 'b.com', maxAge: 10 * 60 * 1000, })
  ctx.body = `/ab1bsetb`
})


router
  .get('/jsonp1', async ctx => {
    const { a, b } = ctx.query;
    ctx.body = `ccc("jsonp本质 ${a} ${b}")`
  })
  .get('/jsonp2', async ctx => {
    const { a, b, cb } = ctx.query;
    ctx.body = `${cb}("jsonp ${a} ${b}")`
  })

app.use(router.routes())
app.listen(4000)
