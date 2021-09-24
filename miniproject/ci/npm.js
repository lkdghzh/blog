const ci = require('miniprogram-ci')
;(async () => {
  const project = new ci.Project({
    appid: 'wxece3a9a4c82f58c9',
    type: 'miniProgram',
    projectPath: '/Users/eleme/work/eleme-wx-mini-app',
    privateKeyPath: '/Users/eleme/.ssh/id_rsa',
    ignores: ['node_modules/**/*'],
  })
  // 在有需要的时候构建npm
  const warning = await ci.packNpm(project, {
    ignores: ['pack_npm_ignore_list'],
    reporter: (infos) => { console.log(infos) }
  })
  console.warn(warning)
  // 可对warning进行格式化
  /*
    warning.map((it, index) => {
            return `${index + 1}. ${it.msg}
    \t> code: ${it.code}
    \t@ ${it.jsPath}:${it.startLine}-${it.endLine}`
          }).join('---------------\n')
  */
  // 完成构建npm之后，可用ci.preview或者ci.upload
})()