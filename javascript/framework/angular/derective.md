# 指令：

---
- 内置渲染指令
- 内置事件指令
- 内置节点指令
- 自定义指令
    - restrict template replace属性
    - templateUrl属性
    - trnsclude priorty terminal属性
    - compile link属性
    - controller aontrollAs属性
    - require属性
    - scope属性
- 自定义：demo

#定义方式：

---

- 模块注入$compileProvider

``` js
angular.module('keApp', [], ['$compileProvider', function(com) {//看到这种方式的好处：$compileProvider==com，压缩代码的时候，不用担心变量会被替换的问题
	com.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			template: '<div>内容11</div>',
			replace: true
		}
	})
}])
```
- 普通的指令
``` js
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			templateUrl: 'tpls/tpl1.htm',
			replace: true
		}
	})
```
- 隐式注入
```
app.directive('myDirective', function ($injector) {
  return function () {
    console.log('postLink2: ', $injector);
  }
});
```
- 显式注入
```
app.directive('myDirective', ['$injector', function ($injector) {
  return function () {
    console.log('postLink3: ', $injector);
  }
}]);
```

# 自定义指令中属性及参数记录

---
```
var myModule = angular.module(...);
     myModule.directive('directiveName', function factory(injectables) {
      var directiveDefinitionObject = {
        priority: 0,
        template: '<div></div>', // or // function(tElement, tAttrs) { ... },
        // or
        // templateUrl: 'directive.html', // or // function(tElement, tAttrs) { ... },
        replace: false,
        transclude: false,
        restrict: 'A',
        scope: false,//true,{@ = &}
        controller: function($scope, $element, $attrs, $transclude, otherInjectables) { ... },// $transclude, otherInjectables
        require: 'siblingDirectiveName', // or // ['^parentDirectiveName', '?optionalDirectiveName', '?^optionalParent'],
        compile: function compile(tElement, tAttrs, transclude) { //transclude //没有scope，
          return {
            pre: function preLink(scope, iElement, iAttrs, controller) { ... }, //controller
            post: function postLink(scope, iElement, iAttrs, controller) { ... }
          }
          // or
          // return function postLink( ... ) { ... }
        },
        // or
        // link: {
        //  pre: function preLink(scope, iElement, iAttrs, controller) { ... },
        //  post: function postLink(scope, iElement, iAttrs, controller) { ... }
        // }
        // or
        // link: function postLink( ... ) { ... }
      };
      return directiveDefinitionObject;
    });
```
# contoller compile link 执行顺序
```
<!DOCTYPE html>
<html>
<head>

  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width">
  <title>JS Bin</title>
  <script src="ddd/angular.js"></script>
  <script>
  angular.module('modul',[]).
  directive('stringAdd', function() {  
    return {  
        restrict: 'E',  
        template: '<p>顺序:{{number}}!</p>',  
        transclude:true,

        controller: function($scope, $element, $attrs, $transclude){  //otherInjectables
            $scope.number = $scope.number + "2, ";  
            console.log($element.prop("outerHTML"));
            console.log($attrs);
            console.log($transclude);//$transclude是一个函数
        },  
        
        // controller: ['$scope',function(sco){  //没找到$element, $attrs, $transclude的provider
        //     sco.number = sco.number + "2, ";  
        //     }],
        //controllerAs:'myController',  
        link: function(scope, el, attrs) { 
             // controller  其他控制器  包括AB指令之间交互的 A的conntroller起别名A的conntrollerAs B有require之后，B的link可以注入 ，，估计B的controller也可以  B的compile也可以
            //不需要写$开头
            scope.number = scope.number + "3,";  
        },  
        compile: function(element, attributes) {  // transclude
            return {  
                pre: function preLink(scope, element, attributes) {  
                    scope.number = scope.number + "4, ";  
                },  
                post: function postLink(scope, element, attributes) {  
                    scope.number = scope.number + "5 ";  
                }  
            };  
        }  
    }  
})
  .controller('ctrl',['$scope',  
    function($scope) {  
        $scope.number = '1, ';  
    }  
]); 
    </script>
</head>

<body ng-app="modul">  
    <div ng-controller="ctrl">  
        <string-add>trnsclate</string-add>  
    </div>  
</body>  

</html>
```
# 结果![](http://images2015.cnblogs.com/blog/607624/201605/607624-20160507192426203-1248507143.png)

图：


# 1，restrict template replace属性

---

``` html
<div ng-app="keApp">
		<ke-node-map></ke-node-map>
		<div class="ke-node-map"></div>
		<div ke-node-map=''></div>
		<!-- directive: ke-node-map -->
	</div>
```
``` js
angular.module('keApp', [], ['$compileProvider', function(com) {
	com.directive("keNodeMap", function() {//js中写的按照camel法则写，html中要转成小写，并在变小写的字母前加上-
		return {//这样指令返回一段什么样的html
			//e代表替换ke-node-map标签中的内容，C代表替换class=‘ke-node-map’的标签的内容
			//A代表替换有ke-node-map=‘’属性的标签的内容，M代表替换 <!-- directive:ke-node-map -->(记得有空格)
			restrict: "ECAM",
			template: '<div>内容11</div>',//这个模板必须加标签包围，如果去掉，就报错
			replace: true//表示具有restrict: "ECAM",代表的标签和内容全部替换成template。这里提醒，没这个属性，原来html标签不会去掉，只是内容替换了。
		}
	})
}])

```
#### 结果
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428190743673-1473883723.png)

# 2，templateUrl属性

---
## 1，第一种模板方式

---

在项目在添加一个放模板的文件夹，添加模板（一个不带html、head、body，只有一般的div等平常标签文件）
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429105106752-2070769328.png)

#### tpls/tpl1.htm

``` html
<div>我是一个被加载进来的模板，我没html，body，外面必须有标签包围</div>
```
#### html同上
#### js

``` js
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			templateUrl: 'tpls/tpl1.htm',
			replace: true
		}
	})

```
#### FireFox结果

---
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428195058439-460381193.png)

#### google结果 报错了！
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428195255455-262964147.png)

主要错误：`Cross origin requests are only supported for protocol schemes: http, data, chrome, chrome-extension, https, chrome-extension-resource.`

这个问题原因：google浏览器不然访问本地html文件(url中以‘file：//..开头’)，被认定为跨域问题，我们称这个为`同源策略`：这个问题会阻止chrome从url中为`file：//..`中加载模板，并显示一个“Access-Controll-Allow-Origin”不允许源为null。

#### 解决方式

1，让chrome的url以`Locolhost：//..`开头的路径访问。也就是把项目放在`服务器`上加载
2，如果非要chrome的url以一‘file：//..’形式访问，我们给chrome设置一个标志，命令为：`chrome -allow-file-access-from-files`,这样命令之后，chrome会新打开一个（也许之前你手动打开过），我们只能把url以‘file：//..’开头的放进这个新打开的chrome中，才不会报错。放在原来打开的chrome，依然会报错。
参考地址
`https://stackoverflow.com/questions/10752055/cross-origin-requests-are-only-supported-for-http-error-when-loading-a-local/23758738#23758738`
#### 操作截图
1，找到chrome的安装路径：‘打开文件位置’
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429112046408-1442971752.png)
2，打开cmd：输入`cd 路径` ，记得不要找到chrome.exe，而是找到chrome.exe所在的目录，我输入的是`cd C:\Program Files\Google\Chrome\Application\`
3,之后cmd会转到这个文件夹下，继续输入`chrome --allow-file-access-from-files`
4,这个时候，会自动打开一个新chrome（不管你原来打开没打开chrome）
5，在这个新打开的chrome里面输入以'file://..'开头的路径，便可以访问了。原来打开的chrome还是不能。

---

## 2，第二种模板

---

```
这种方式，不用新建模板文件了，而是把模板内容放在页面。
<script type="text/ng-template" id="keTpl">模板内容</script>。
这个标签必须放到ng-app内，id为js中templateUrl的值。
```

#### html

``` html
<div ng-app="keApp">
	<script type="text/ng-template" id="keTpl">
		<div>页面内部的text/template</div>
	</script>
		<ke-node-map>dd</ke-node-map>
		<div class="ke-node-map">s</div>
		<div ke-node-map=''>s</div>
		<!-- directive: ke-node-map -->
	</div>
```
#### js

``` js
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			templateUrl: 'keTpl',
			replace: true
		}
	})
```
#### 结果
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429133724253-1498415343.png)

## 3，不论哪种模板，都能放表达式和指令，这里拿{{}}和ng-model来试验

#### 注意不管哪种模板，必须`要有而且仅有一个`rootelement`根节点`包围，否则会报错
`Template for directive must have exactly one root element`
参考地址：`http://stackoverflow.com/questions/27992470/template-for-directive-must-have-exactly-one-root-element`

#### 模板

```
<div>
	<div>我是一个被加载进来的模板，我没html，body，外面必须有必须有而且仅一个rootelement根节点包围
	</div>
	<input ng-model="parm3"/>
</div>
```

#### html
```
<div ng-app="keApp">
		<script type="text/ng-template" id="keTpl">
		<div>
			<div>页面内部的text/template,必须有一个rootelement根节点包围</div>
			<input ng-model="parm1"/>		
			{{parm2}}
		</div>
	</script>
		<div ng-controller="ctrKe">
			<ke-node-map></ke-node-map>
			<div class="ke-node-map"></div>
			<div ke-node-map=''></div>
			<!-- directive: ke-node-map -->

			<ke-node-mapt></ke-node-mapt>
			<div class="ke-node-mapt"></div>
			<div ke-node-mapt=''></div>
			<!-- directive: ke-node-mapt -->
		</div>
	</div>
```
#### js
 
```
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			templateUrl: 'keTpl',
			replace: true
		}
	})
	.directive("keNodeMapt", function() {
		return {
			restrict: "ECAM",
			templateUrl: 'tpls/tpl1.htm',
			replace: true
		}
	})
	.controller('ctrKe', ['$scope', function($scope){
		$scope.parm1 = "aaa";
		$scope.parm2 = "bbb";
		$scope.parm3 = "ccc";
		
	}])
	// .controller('ctrKe', function($scope) {
	// 	$scope.parm1 = "aaa";
	// 	$scope.parm2 = "bbb";
	// 	$scope.parm3 = "ccc";
	// })
```

#### 结果`不要忘了，在chrome中要cmd开启新的chrome哦`

---
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429144057660-1929373924.png)



# 3，trnsclude priorty terminal属性

---

#### 1，transclude：true 将view中的自定义指令的内容（包括包含的节点）保存下来，在js中的template属性中，加上具有ng-transclude属性的标签（这个标签的内容有无都不显示）
``` html
<div ng-app="keApp">
		<ke-node-map><div ng-class='old'>保留的老标签+老内容到transclude内1</div></ke-node-map>
		<!-- <div class="ke-node-map"><div ng-class='old'>保留老标签+老内容到transclude内2</div></div>
		<div ke-node-map=''><div ng-class='old'>保留老标签+老内容到transclude内3</div></div> -->
	</div>
```
``` js
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "ECAM",
			template: '<div>模板的transclude兄弟的内容<div ng-transclude></div> </div>',
			replace: true,
			transclude: true
		}
	})

```
#### 截图

---
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429154821222-673518536.png)
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429160331378-167686302.png)



#### 2，priorty terminal，这两个属性都是解决`多个指令在一起`的时候`执行优先级（顺序）`的问题

在内置指令中：
加入有`<li ng-repeat="item in set" ng-click=""></li>`在这个创建dom的过程中，是先ng-repeat，然后再ng-click，这几个指令肯定有一定的执行的优先级。
在自定义指令中如何表示呢？这就使用到了priorty terminal属性。
下面看
```
<div ng-app="keApp">
	<div class="ke-node-map ke-node-mapt">
		<div ng-class='old'>原始数据</div>
	</div>
	<!-- 
		<div ke-node-map ke-node-mapt>
		<div ng-class='old'>原始数据</div>
		</div>
	-->
</div>
```
```
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "CA",
			template: '<div>新数据1<div ng-transclude></div> </div>',//待会要注释掉
			replace: true,//待会要注释掉
			priority: 3  
		}
	})
	.directive("keNodeMapt", function() {
		return {
			restrict: "CA",
			template: '<div>新数据2 </div>',
			replace: true,
			priority: 4
                        //terminal：true
		}
	})
```
#### 结果：
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160429182429019-1402239853.png)
#### 现象和解释：
priority越大的越先执行，ng-repeat默认priority为1000。默认的自定义指令priority都是0，先定义哪个，哪个指令先执行。
当替换模板的时候，优先级为4的指令先正确执行，然后执行优先级为3的指令，但是优先级为3的是替换模板指令就出错了。因为已经“替换了”，再替换报错，就正常了。
`[$compile:multidir] Multiple directives [keNodeMapt, keNodeMap] asking for template on: <div class="ke-node-map ke-node-mapt">`
如果把`template: '<div>新数据1<div ng-transclude></div> </div>',replace: true,`注释掉，就不报错了。

我们想让优先级为4的执行完，优先级小于4的都不执行的话，我们只需在优先级为4的指令上加一个属性`terminal：true`，终止优先级比自己低的执行。

# 4，compile link属性

---
以上自定义指令：都是为了实现`渲染指令`的作用。那我们为一些`改变DOM结构`，`绑定事件`，`改变样式`等功能，就接着往下看。
为了一些兼容性问题，最好我们定义restrict为`C`,`A`的指令`
compile属性本质调用link属性。

1，compile属性：方法内直接返回一个函数，就是link属性对应的方法。也就是对应的Link阶段。这样就不用再写link属性了。
2，compile属性：方法内返回一个对象，{pre：function preLink(){},post:function postLink(){}},返回这样的post属性对应的函数就是Link函数。
3，compile属性：方法内改变DOM，在上面解释多指令不能用多个模板改变标签的时候，我们可以在copile属性内改变，达到'类似多模板'的功能，操作DOM。
   这个时候，单独写link属性，来改变样式，绑定事件。
注意：
在compile执行之前，如果有渲染模板，模板文件都已经加到页面了。如果没有模板，我们可以通过compile的element属性改变，实现“有模板”的功能。
一般：我们在compile属性内“改变标签结构”，比如添加节点什么的，类似实现“不能多模板”的功能。这个有优先级的执行顺序限制！！
一般：在Link属性中，我们“改变样式”，“绑定事件”。这个没有优先级的执行顺序限制！！

## 例子1

---

#### View
```
<!DOCTYPE html>
<html lang = "zh-CN">
<head>
	<meta charset="utf-8"></meta>
<script src="ddd/angular.js"></script>
<script  src="customdirective6.js"></script>
<style type="text/css">
	.divDemo{
		border: 1px solid red;
		background: blue;
	}
</style>
</head>
</head>
<body>
<div ng-app="keApp">
	<div ng-controller="keCtr1" >
		<div class="ke-node-map ke-node-mapt">{{name}}</div>
	</div>
</div>
</body>
</html>
```
#### js
```
angular.module('keApp', [])
	.directive("keNodeMap", function() {
		return {
			restrict: "CA",
			//template: '<div>{{name}}</div>',//[$compile:multidir] Multiple directives [keNodeMapt, keNodeMap] asking for template on: <div class="ke-node-map ke-node-mapt">
			priority: 3,
			compile: function(element, attr, transclude ) {
				element.append(angular.element('<div>{{name}}</div>'))
				console.log('1编译阶段：keNodeMap指令优先级低，现在不能再访问新模板修改，这是时候更改原始标签，用jqlite：element.append(angular.element(<div>{{name}}</div>div>))', element.prop('outerHTML'))
				return function(scope, elements, attrs, contrs) {
					console.log('1postLink就是link属性，多个指令的link并不按priority大小执行，哪个指令先定义，那么这个指令的link先执行。一般在link内一般“改变样式”，“绑定事件”', element.prop('outerHTML'))
					element.bind('click',function(e) {
						element.addClass('divDemo')
						console.log('点击了1')
					})
				}
			}
		}
	})
	.directive("keNodeMapt", function() {
		return {
			restrict: "CA",
			template: '<div>新数据2 <div ng-transclude>{{name}}</div></div>',
			replace: true,
			transclude: true,
			priority: 4,
			compile: function(element, attr, contr) {
				console.log('2编译阶段：keNodeMapt指令优先级高，先transclude好（相当与在编译阶段改变原始标签，用jqlite：element.append(angular.element(<div>{{name}}</div>div>))）', element.prop('outerHTML'))
				return function(scope, elements, attrs, contrs) {
					console.log('2postLink就是link属性，多个指令的link并不按priority大小执行，哪个指令先定义，那么这个指令的link先执行。一般在link内一般“改变样式”，“绑定事件”', element.prop('outerHTML'))
					element.bind('click',function(e) {
						console.log('点击了2')
					})
				}
			}
		}
	})
	.controller('keCtr1', ['$scope', function(s) {
		s.name = '李可'
	}])
```

#### 截图 `多注意我的标记，以及打印信息`

---
![](http://images2015.cnblogs.com/blog/607624/201605/607624-20160501153251285-1005390149.jpg)

## 例子2 `ng-repeat的联合使用`

---

#### view

```
<div ng-app="keApp">
    <div ng-controller="firstController">
        <!--
            1. div 转换为dom结构
            2. 默认的优先级为0,哪个先定义哪个先使用
        -->
        <div ng-repeat="user in users" custom-tags="" custom-tags2>
        </div>
    </div>
</div>
```
#### js

```
//var i = 0;
var myApp = angular.module('keApp', [])
.directive('customTags', function() {
    return {
        restrict: 'ECAM',
        template: '<div>{{user.name}}</div>',
        replace: true,
        priority: 5,
        compile: function(ele, attr, transclude) {
            // 编译阶段...
            console.log('customTags编译阶段...');
            console.log('1继续改变标签前', ele.prop("outerHTML"));
            ele.append(angular.element('<div>{{user.name}}{{user.count}}</div>'));
            console.log('1继续改变标签后', ele.prop("outerHTML"));
            return {
                // 表示在编译阶段之后，指令连接到子元素之前运行
                pre: function preLink(scope, ele, attr, controller) {
                   // console.log('1prescope', scope)
                    console.log('1prehtml', ele.prop("outerHTML"))
                },
                // 表示在所有子元素指令都连接之后才运行
                post: function postLink(scope, ele, attr, controller) {
                   // console.log('1postscope', scope);
                    console.log('1posthtml', ele.prop("outerHTML"))
                    // ele.on('click', function() {
                    //     scope.$apply(function() {
                    //         scope.user.name = 'click after';
                    //         scope.user.count = ++i;
                    //         // 进行一次 脏检查
                    //     });
                    // })
                }
            }
            // 可以直接返回 postLink
            // return function(){
            // console.log('compile return fun');
            //}
        },
        // 此link表示的就是 postLink
        // link: function() {
        //     //                iElement.on('click',function(){
        //     //                    scope.$apply(function(){
        //     //                        scope.user.name = 'click after';
        //     //                        scope.user.count = ++i;
        //     //                        // 进行一次 脏检查
        //     //                    });
        //     //                })
        // }
    }
})
.directive('customTags2', function() {
    return {
        restrict: 'ECAM',
        replace: true,
        priority: 6,
        compile: function(ele, tAttrs, transclude) {
            // 编译阶段...
            console.log('customTags2编译阶段...');
            console.log('2改变标签前', ele.prop("outerHTML"));
            ele.append(angular.element('<span>{{user.name}}{{user.count}}</span>'));
            console.log('2改变标签后', ele.prop("outerHTML"));
            return {
                // 表示在编译阶段之后，指令连接到子元素之前运行
                pre: function preLink(scope, ele, attr, controller) {
                    //console.log('2prescope', scope)
                    console.log('2prehtml', ele.prop("outerHTML"))
                },
                // 表示在所有子元素指令都连接之后才运行
                post: function postLink(scope, ele, attr, controller) {
                   // console.log('2postscope', scope);
                    console.log('2posthtml', ele.prop("outerHTML"))
                }
            }
        }
    }
})
.controller('firstController', ['$scope', function($scope) {
    $scope.users = [{
        id: 10,
        name: '张三'
    }, {
        id: 20,
        name: '李四'
    }];
}]);
```
#### 截图

---

![](http://images2015.cnblogs.com/blog/607624/201605/607624-20160501161731160-1199110074.png)

# controller controllerAs require属性

# scope属性

----
为了弄懂scope属性的`绑定策略`，`@`,`&`,`=`两边的变量代表的对象是什么，请按照以下步骤。

#### scope属性的前身今世：link属性

``` html
<script>
angular.module('app', [])
 .controller("keController",function($scope){
          $scope.Name="李可"; 
        })
        .directive("direct",function(){
                return{
                    restrict: 'E',
                    template: '<div>指令作用域访问到controller作用域中变量：{{ parentName }}</div>' ,
	       link:function(direcScope,eles,attrs,con){   
	      	 //	有这个方法可以知道，在指令调用中使用attrs.forName之前，他已经被控制器赋值上了。已经给了看attrs的调试方法，
		// 	angular.forEach(attrs,function(data,index,array){
		// 	console.log(index+':',attrs[index]);
		// })
		direcScope.parentName=attrs.forName;
                    }
                 } 
          })
</script>
</head>
<body>
<div ng-app="app">
	<div ng-controller="keController">
		<direct for-name="{{Name}}"></direct><!--在指令调用中使用attrs.forName之前，他已经被控制器赋值上了。 -->
	</div>
</div>
```
#### 截图
![](http://images2015.cnblogs.com/blog/607624/201605/607624-20160506095431576-1563851251.png)

上述功能实现了指令作用域访问控制器作用域的变量“字符串”。很多都写在link属性中，但是link主要为绑定事件 添加样式功能的，而且写的也多。有一个更为方便的方式，那就是scope属性。
代码
```
<script>
angular.module('app', [])
 .controller("keController",function($scope){
          $scope.Name="李可"; 
        })
        .directive("direct",function(){
                return{
                    restrict: 'E',
                    template: '<div>指令作用域访问到controller作用域中变量：{{ parentName }}</div>' ,
                    scope:{ 
                    	//为了简化link的写法，我们引入scope属性（对比着link属性看）
                    	//第一个变量就是指令scope的变量，
                    	//第二个变量就是attrs的一个属性，指令<direct for-name="{{Name}}"></direct>中的forName属性，通过驼峰法则找到for-name
                    	parentName:'@forName'
                    }
	 //       link:function(direcScope,eles,attrs,con){   
		// direcScope.parentName=attrs.forName;
  	//      }
                 } 
          })
</script>
</head>
<body>
<div ng-app="app">
	<div ng-controller="keController">
		<direct for-name="{{Name}}"></direct><!--在指令调用中使用attrs.forName之前，他已经被控制器赋值上了。 -->
	</div>
</div>
</body>
```
#### 简写

![](http://images2015.cnblogs.com/blog/607624/201605/607624-20160506101927669-1866417884.png)

#### `=`,`&`使用

dodirfun({param:txtContent })传参的时候拼接一个json对象。txtContent正是文本框的ng-model；
```
<!doctype html>
<html >
<head>
<meta charset="utf-8 "></meta>
<script src="https://rawgit.com/angular/bower-angular/master/angular.min.js"></script>
<script>
angular.module('app', [])
 .controller("keController",function($scope){
          $scope.Name="名字"; 
           $scope.dofun=function(param){
		alert('左侧内容：'+param);
           }
        })
        .directive("direct",function(){
                return{
                    restrict: 'E',
                    template: '<div><input type="text" ng-model="dirName"></div>' ,
                    scope:{ 
                    	//forName:'=forName'
                    	//forName:'='//根据上面讲的，你应该知道什么时候这么写
                    	dirName:"=forName"
                    }
                 } 
          })
        .directive("fun",function(){
                return{
                    restrict: 'E',
                    template: '<div><input type="text" ng-model="txtContent">'+
                    		      '<input type="button" value="点击" ng-click="dodirfun({param:txtContent })"></div>' ,
                    scope:{ 
                    	dodirfun:"&funattr"
                    	// funattr:"&funattr"//根据上面讲的，你应该知道什么时候这么写
                    	// funattr:"&"
                    }
                 } 
          })
</script>
</head>
<body>
<div ng-app="app">
	<div ng-controller="keController">
		<input type="text" ng-model="Name">
		<direct for-name="Name"></direct><!--绑定策略为=时，此处千万不要加{{}}，此处需要expression表达式-->
		<fun funattr="dofun(param)"></fun><!--绑定策略为&时，形参和实参最好写一样，要不容易-->
		<fun funattr="dofun(param)"></fun>
	</div>
</div>
</body>
</html>
```