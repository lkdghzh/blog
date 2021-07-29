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

  const previewResult = await ci.preview({
    project,
    desc: 'hello', // 此备注将显示在“小程序助手”开发版列表中
    setting: {
        "urlCheck": false,
        "es6": true,
        "enhance": true,
        "postcss": true,
        "preloadBackgroundData": false,
        "minified": true,
        "newFeature": true,
        "coverView": true,
        "nodeModules": true,
        "autoAudits": false,
        "showShadowRootInWxmlPanel": false,
        "scopeDataCheck": false,
        "uglifyFileName": false,
        "checkInvalidKey": true,
        "checkSiteMap": true,
        "uploadWithSourceMap": true,
        "compileHotReLoad": false,
        "lazyloadPlaceholderEnable": false,
        "useMultiFrameRuntime": true,
        "useApiHook": true,
        "useApiHostProcess": true,
        "babelSetting": {
          "ignore": [],
          "disablePlugins": [],
          "outputPath": ""
        },
        "enableEngineNative": false,
        "useIsolateContext": false,
        "userConfirmedBundleSwitch": true,
        "packNpmManually": false,
        "packNpmRelationList": [],
        "minifyWXSS": true,
        "showES6CompileOption": false
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest: '/Users/eleme/Desktop/qrcode.jpg',
    onProgressUpdate: console.log,
    pagePath: 'pages/index/index', // 预览页面
    // searchQuery: 'a=1&b=2',  // 预览参数 [注意!]这里的`&`字符在命令行中应写成转义字符`\&`
  })
  console.log(previewResult)

})()