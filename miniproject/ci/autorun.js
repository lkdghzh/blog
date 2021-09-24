const automator = require('miniprogram-automator')

automator.launch({
  projectPath: '/Users/eleme/work/eleme-wx-mini-app', // 项目文件地址
}).then(async miniProgram => {
  const page = await miniProgram.reLaunch('/page/index/index')
  console.log(111)
}, e => {
  console.log(e)
})