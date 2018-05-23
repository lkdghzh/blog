声明：借鉴好多chm资料、视频、PDF总结如下：
# 一、$apply的引入

- ## View

```html
<div ng-app="">
		<div ng-controller="firstController">
			<input  ng-model="date"/>		
			{{date}}
		</div>
	</div>
```
- ## 原生js函数，不能实现刷新(因为没有实现双向绑定（脏检查）)


``` js
var firstController = function($scope) {
	$scope.date = new Date().getSeconds();
	setInterval(function() {
		//并没有触发 脏检查
		$scope.date = new Date().getSeconds();

	}, 1000)
}
```
- ## 原生js函数，在变量改变外面加上$scope.apply(fun)，手动实现脏检查，实现刷新

``` js
var firstController = function($scope) {
	$scope.date = new Date().getSeconds();
	setInterval(function() {
		$scope.$apply(function() {
			$scope.date = new Date().getSeconds();
			//....会去触发脏检查
		})
	}, 1000)
}
```
- ## Angular内置函数，默认已经实现脏检查，实现刷新

``` js
var firstController = function($scope, $interval) {
	$scope.date = new Date().getSeconds();
	$interval(function() {
		$scope.date = new Date().getSeconds();
	}, 1000)
}
```

```
原生js:setInterval(fun)<==>$interval(fun) 一直循环执行
原生js:setTimeout(fun)<==>$TimeOut(fun)  执行一次
```
- ## gif图结果

![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428132752705-636273863.gif)

![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428132841236-1657519425.gif)


- ## 解释

```
   以`ng-开头的` `事件` `指令`和默认`内置的函数`最后`都会执行脏检查`。
   `原声js`要实现如此功能，必须`在变量改变外面加上$scope.apply(fun)`，这样会将这个`apply内的变量复制出一份`，`新值和旧值（备份）对比`，实现双向绑定
```

# 二、$watch监听一个对象

`$watch(watchExpression, [listener], [objectEquality]);`

- ## 两个参数

``` html
<div ng-app="">
		<div ng-controller="firstController">
			<input type="text" value="" ng-model="name"/><br/>
			注意：页面加载的时候执行一次,默认1：改变次数:{{count}}
			<br/>
			注意：当次数超过5，页面改变一次，count会+2，触发2次
		</div>
	</div>
```

``` js
var firstController = function($scope) {
    $scope.name = '李可';
    $scope.count = 0;
    // 监听一个model 当一个model每次改变时 都会触发第2个函数
    $scope.$watch('name', function(newValue, oldValue) {
       $scope.count=$scope.count+1;//页面加载的时候执行一次
        if ($scope.count > 5) {//当次数超过5，页面改变一次，count会+2，触发2次
            $scope.name = '已经大于5次了';
        }
    });
}
```
- ## gif图结果
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428141247361-806562925.gif)


- ## 问题：为什么触发2次呢？


估计要分析脏检查的源码了：原谅我处于菜鸟阶段
问了一些人
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428160447127-1810901276.png)



---

- ## 三个参数 第三个为true，表示对象内部的属性。`深深`地监视

``` html
<div ng-app="">
		<div ng-controller="firstController">
			<input type="text" value="" ng-model="data.name"/>
			<input type="text" value="" ng-model="data.age"/>
			<input type="text" value="" ng-model="count2"/>
		</div>
	</div>
```

``` js
var firstController = function($scope) {
    $scope.data = {
        name: '李可',
        age: 18
    }
    $scope.count2 = 0;
    $scope.$watch('data', function() {
        ++$scope.count2;
        if ($scope.count2 > 3) {
            $scope.data.age = '换超过3了';
        }
    }, true)
}
```
```
++i先加后用(同一个表达式内用)
i++先用（同一个表达式内用）后加
var a=2;++a;var b=a*3;alert(b)//9    ++a;var b=a*3;是两表达式
var c=2;c++;var d=c*3;alert(d)//9   c++;var d=c*3;是两表达式
var e=2;f=e++;alert(f)//2       f=e++  有++表达式和=表达式   相当f=e; e=e+1
var g=2;h=++g;alert(h)//3       h=++g; 有++表达式和=表达式   相当g=g+1; h=g；
var i=2;x=++i +1;alert(x)//4    x=++i +1;  有++表达式和+表达式  相当i=i+1; x=i；
var m=2;y=m++ +1;alert(y)//3    x=i++ +1;  有++表达式和+表达式   相当y=m; m=m+1
```
- ## gif图结果

![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160428142457423-1775557359.gif)

```
注意：页面加载1次，`加1`
到临界条件时，`加2`，`以后也加1`
```
# 延伸

---

有了上述方法：我们可以监控 对象、数组。为了少第三个参数，具体数组操作，angular又增加
`$watchCollection(obj, listener);`,`$watchGroup(watchExpressions, listener);`