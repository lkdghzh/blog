# blog
李可的个人博客
```
├─be
│  ├─c#
│  ├─java
│  ├─mongo
│  │  └─基础学习
│  └─python
│      ├─blog
│      │  ├─controllers
│      │  ├─models
│      │  ├─test
│      │  └─utils
│      └─mongoengine
└─fe
    ├─blog-assets
    │  └─module
    ├─css
    ├─javascript
    │  ├─algorithm
    │  │  ├─dynamic
    │  │  ├─queue
    │  │  ├─quick-sort
    │  │  └─shuffle
    │  ├─animation
    │  │  ├─canvas
    │  │  │  └─canvas模糊
    │  │  ├─carton
    │  │  │  └─bezeir
    │  │  └─svg
    │  ├─browser-optimistic
    │  ├─framework
    │  │  ├─angular
    │  │  ├─knockout
    │  │  └─requirejsProject
    │  │      └─js
    │  │          ├─app
    │  │          ├─index
    │  │          └─lib
    │  ├─mobile-external
    │  │  ├─上传裁切
    │  │  ├─多手指的封装
    │  │  └─常见问题汇总
    │  │      ├─img
    │  │      └─js
    │  ├─module-demo
    │  │  └─js
    │  ├─other
    │  ├─parttern
    │  │  └─pub-sub
    │  ├─promise
    │  ├─unar
    │  │  ├─dom
    │  │  ├─examples
    │  │  └─knowledge
    │  │      ├─audio
    │  │      ├─fragment
    │  │      ├─js
    │  │      ├─react-virtual-dom
    │  │      ├─unar-virtual-dom
    │  │      └─virtual-dom
    │  └─xmind
    └─ts
        ├─src
        └─typings
```
## 动画
1. [canvas：贝塞尔曲线及动画演示](https://github.com/lkdghzh/blog/tree/master/fe/javascript/animation/carton/bezeir)
2. [svg：演示viewport,viewBox,preserveAspectRatio](https://github.com/lkdghzh/blog/blob/master/fe/javascript/animation/svg/preservrAspectRadioProgress.html)

## [Unar Vue](https://github.com/lkdghzh/unar.js)
> Unar是一个模仿vue重写的mvvm框架（已经完成核心），欢迎star:bowtie:
1. vue源码解析：[劫持、代理](https://github.com/lkdghzh/unar.js/blob/master/packages/instance/config.js#L11)
1. vue源码解析：[数据属性->存取器属性->收集依赖->实现mvvm双向绑定](https://github.com/lkdghzh/unar.js/blob/master/packages/instance/config.js#L59)
1. vue源码解析：[fragment编译模板](https://github.com/lkdghzh/unar.js/blob/master/packages/view/compile.js#L4)
1. vue源码解析：[指令工厂创建指令实例](https://github.com/lkdghzh/unar.js/blob/master/packages/view/compile.js#L25)
1. vue源码解析：[指令继承（oop思想）逻辑指令（if for）,操作指令（html value text）,属性指令（：class ：self）](https://github.com/lkdghzh/unar.js/tree/master/packages/view/directives)


## 前端性能
> 列举我平常用到的性能优化策略
1. [防抖节流](https://github.com/lkdghzh/blog/blob/master/fe/javascript/browser-optimistic/throttle-debounce.html)
1. 浏览器渲染引擎优化
    + 重排=回流 render tree中layout、reflow
    + 重绘 render layer中repaint
    + 启动gpu硬件加速，translate-z，将render layer提升至graphic layer ,将位图交给GPU渲染
1. 算法 递归到动态规划的算法优化
1. 定时器和rAF对比（aAF并不完胜）
    + 定时器为何会丢帧？ fps和定时器间隔，开发中调试，控制时间
    + rAF不能变换时间，生产中，不能控制时间

## 工程化
1. gulp
1. webpack加载机制


## koa




