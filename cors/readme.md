查看文章，请预先打开 [示例代码](https://github.com/lkdghzh/blog/tree/master/cors) 之后，对比代码进行查看.

这篇文章的目的是通过代码实践，进行学习如何运用HTTP头部字段，对浏览器请求访问控制，做到CORS。
并验证在CORS时，学习到一下知识点。
+ 简单请求
+ 复杂请求（预检请求）
+ 自定义响应头/xhr获取自定义响应头
+ 携带cookie
+ 设置cookie(重要)

## 预备环境
> + 通过启动端口3000/4000的两个服务和更改他们HOST域名模拟跨域的场景。
> + 在3000端口服务在页面上往4000端口的服务发起xhr请求，进行模拟跨域
```
npm i nodemon -g
cd cors
nodemon server1.js    // 3000端口
nodemon server2.js    // 4000端口
```

## Chrome无法查看OPTIONS预检请求
> 突然新版本chrome在network中无法查看OPTIONS请求，但可以在firefox等查看到。发现这是chrome浏览器的一个bug，解决方案如下

> + 浏览器输入[chrome://flags/#out-of-blink-cors](chrome://flags/#out-of-blink-cors) 
> + 然后设置out of blink 为disabled，
> + 重启浏览器即可查看OPTIONS请求


<image width="600" src ="https://user-images.githubusercontent.com/17950406/75606031-c5477900-5b23-11ea-8948-a5abb5b51c6d.jpg">

[参考](https://stackoverflow.com/questions/57410051/chrome-not-showing-options-requests-in-network-tab)

## 简单请求和复杂请求（预检请求）
> + 在发送请求出现跨域，会将请求分为在简单/复杂两类。
> + 在 [MDN](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Access_control_CORS) 上可以看到分类条件。
> + 每一次复杂请求时，会多产生一个OPTIONS 方法发起一个预检请求（preflight request）

<image width="600" src ="https://user-images.githubusercontent.com/17950406/75606222-87e3eb00-5b25-11ea-9054-586b78ee42df.png">

## 相关代码
``` JS
// 3000端口页面上发送到4000端口的5个请求
xhr.open('GET', 'http://localhost:3000/nocors')
xhr.open('GET', 'http://localhost:4000/cors-err')
xhr.open('GET', 'http://localhost:4000/cors-get?a=1&b=2')
xhr.open('PUT', 'http://localhost:4000/cors-put')
xhr.open('PUT', 'http://localhost:4000/cors-put-get-response-header')

// 4000端口的路由
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
```


<!-- # 跨域
[维基](https://en.wikipedia.org/wiki/XMLHttpRequest)

```
npm i nodemon -g
nodemon ./file/server1.js    // 3000
nodemon ./file/server2.js    // 4000
```
## 显示临时标题
```
Provisional headers are shown
```
window.name
location.hash
document.domain
## 运行
``` bash
//安装服务器
# npm i anywhere -g 此文件服务器已经添加access-control 头
# npm i http-server -g

```
## 临时接触浏览器的跨域限制
## jsonp
## cors
## window.name
## location.hash
## location.hash
 -->
