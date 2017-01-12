# 一、查看$scope -->寻找`Form控制变量`的位置

---
## Form控制变量 格式：`form的name属性`.`input的name属性`.`$...`
- formName.inputField.$pristine  字段是否 `未更改`
- formName.inputField.$dirty     字段是否 `更改`
- formName.inputField.$valid     字段 `有效`
- formName.inputField.$invalid   字段 `无效`
- formName.inputField.$error     字段 `错误信息`

## 问题
为什么要`按照上面的格式`写才能`找到对应的变量`从而正确`表达字段的一些验证信息`呢？我们通过下面程序`调试`。

## 调试过程

#### html

``` html
   <div ng-app="AppKe" >
		<div  ng-controller="OuterController">
			<form novalidate name="formKe" >
				<input type="text" name="userName" value="" ng-model="user.name" />
			</form>
		</div>
	</div>
```
#### javasript

``` javascript
angular.module('AppKe', [])
.controller('OuterController', function($scope){
	$scope.user = {
		name: '李可'
	}
	console.log($scope);
})
```
#### 结果 Gif 时间：30s

---
![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160421172436616-1277844761.gif)

#### 结论
从上图中，我们清楚地了解到：这几个`控制变量`在哪里了吧。这个确实有点考验我了~刚开始研究。

#### 解释

form具有这些变量，form内的元素也继承这些。（个人理解）。`$scope当前控制器的最高的作用域`。



# 二、表单中特定的input属性

---
```
form：有个name属性 novalidate 去除h5自带的验证
name 名字
ng-model 绑定的数据
ng-required 是否必填 注意和required区别
ng-minlength   ng-maxlength 最小、最大长度
ng-pattern 匹配模式
email
url
number
ng-change 值变化的回调
```

---

# 三、表单中特定的CSS 类选择器，`下文中没用，用了bootstrap样式`

---

```
ng-valid //有效时的类样式名字.
ng-invalid //无效时的类样式名字.
ng-pristine  //未更改的类样式名字.
ng-dirty  //更改的类样式名字.
ng-submitted //提交后的类样式名字.
```
## 这个可以在官网查到：`https://code.angularjs.org/1.3.0/docs/api/ng/directive/form`



# 四、进入完成的一个表单

---
#### 资源
- css地址 `http://v3.bootcss.com/css/#forms`

form提交验证。只会验证表单元素的required属性。其余不验证。
required和ngrequired相反。required页面加载的时候就自动验证=true。

#### html

```html
<div ng-app="AppKe"  style="margin-top:50px;">
	<div  ng-controller="OuterController">
		<form novalidate name="formKe"  class="form-horizontal container">
			<div class="form-group" ng-class="{'has-error':formKe.userName.$invalid}">
				<label for="userIDTxt" class="control-label col-sm-2 ">用户名</label>
				<div class="col-sm-10">
					<input type="text" name="userName" class="form-control" id="userIDTxt" placeholder="用户名" ng-minlength="2" ng-maxlength="10" ng-required="true" ng-model="user.name"/>
					<div class="alert alert-danger help-block" ng-show="formKe.userName.$error.minlength">用户名最小长度2</div>
					<div class="alert alert-danger help-block" ng-show="formKe.userName.$error.maxlength" >用户名最大长度10</div>
					{{formKe.userName.$error}}
				</div>
			</div>
		</form>
	</div>
</div>

```
#### javascript
``` javascript
angular.module('AppKe', [])
.controller('OuterController', function($scope){
})
```
## 结果

---

![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160421191411851-892191410.gif)

## 分析

页面刚加载好，不应该haserror类样式名：
- 对应的 `ng-class="{'has-error':formKe.userName.$invalid}"`表示：冒号后面的表达式为真的时候，元素才具有has-error类样式
    - 写法注意：注意写成`json对象`的格式，类样式名要`单引号`
    - 应该是表单元素有验证没通过，并且该元素更改过才会触发。`ng-class="{'has-error':myForm.username.$dirty && myForm.username.$invalid}"`
- 有最大最小值，不用`ng-required="true"`

# 完整表单

---
## html
```html
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<script src="ddd/angular.js"></script>
	<script type="text/javascript"  src="formKe.js"></script>
	<link rel="stylesheet" type="text/css" href="framework/bootstrap/css/bootstrap.css"></link>
</head>
<body>

<div ng-app="AppKe"  style="margin-top:50px;">
	<div  ng-controller="OuterController">
		<!--这些提示的信息首次加载的时候，minlength- maxlength - email都为false-->
		<form  name="formKe" novalidate class="form-horizontal container">
			<div class="form-group" ng-class="{'has-error':formKe.userName.$dirty && formKe.userName.$invalid}">
				<label for="userIDTxt" class="control-label col-sm-2 ">*用户名</label>
				<div class="col-sm-10">
					<input type="text" name="userName" class="form-control" id="userIDTxt" placeholder="用户名" ng-minlength="2" ng-maxlength="10" ng-model="user.name" required/>
					<div class="alert alert-danger help-block" ng-show="formKe.userName.$dirty&&formKe.userName.$error.required">必填项</div>
					<div class="alert alert-danger help-block" ng-show="formKe.userName.$dirty&&formKe.userName.$error.minlength">用户名最小长度2</div>
					<div class="alert alert-danger help-block" ng-show="formKe.userName.$dirty&&formKe.userName.$error.maxlength" >用户名最大长度10</div>
					错误$error：{{formKe.userName.$error}}++改动过$dirty：{{formKe.userName.$dirty}} ++验证没通过$invalid：{{formKe.userName.$invalid}}
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.userPwd.$dirty && formKe.userPwd.$error.minlength}">
				<!--formKe.userName.$invalid代替formKe.userPwd.$error.minlength-->
				<label for="userPwd" class="control-label col-sm-2 ">*密码</label>
				<div class="col-sm-10">
					<input type="password" name="userPwd" class="form-control" id="userPwd" placeholder="密码" ng-minlength="6"  ng-model="user.userPwd" required/>
					<div class="alert alert-danger help-block" ng-show="formKe.userPwd.$dirty&&formKe.userPwd.$error.minlength">必填项，最小长度6</div>
					错误$error：{{formKe.userPwd.$error}}++改动过$dirty：{{formKe.userPwd.$dirty}} ++验证没通过$invalid：{{formKe.userPwd.$invalid}}
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.userPwd.$dirty&&formKe.pwdConfirm.$dirty&&user.userPwd!=user.pwdConfirm}">
				<label for="pwdConfirm" class="control-label col-sm-2 ">*确认密码</label>
				<div class="col-sm-10">
					<input type="password" name="pwdConfirm" class="form-control" id="pwdConfirm" placeholder="确认密码"  ng-model="user.pwdConfirm" required/>
					<div class="alert alert-danger help-block" ng-show="formKe.pwdConfirm.$dirty&&formKe.pwdConfirm.$dirty&&user.userPwd!=user.pwdConfirm">密码与确认密码不一致</div>
					错误$error：{{formKe.pwdConfirm.$error}}++改动过$dirty：{{formKe.pwdConfirm.$dirty}} ++验证没通过$invalid：{{formKe.pwdConfirm.$invalid}}
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.userEmail.$dirty&&formKe.userEmail.$invalid}">
				<label for="userEmail" class="control-label col-sm-2 ">邮箱</label>
				<div class="col-sm-10">
					<input type="email" name="userEmail" class="form-control" id="userEmail" placeholder="邮箱"  ng-model="user.userEmail" ng-minlength="7" ng-maxlength="35"/>
					<div class="alert alert-danger help-block" ng-show="formKe.userEmail.$dirty&&formKe.userEmail.$error.minlength">长度不得少于7位</div>
					<div class="alert alert-danger help-block" ng-show="formKe.userEmail.$dirty&&formKe.userEmail.$error.maxlength">长度不得超过35位</div>
					<div class="alert alert-danger help-block" ng-show="formKe.userEmail.$dirty&&formKe.userEmail.$error.email">格式不正确</div>
					<!--type='email',也会在formKe.userEmail.$error生成$error.email-->
					<!--formKe.userEmail.$error.pattern此处代替，但对应ng-pattern指令一定加上 ng-pattern="/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/"/，这样依然生成$error.email，但一直未false，不造成影响-->
					错误$error：{{formKe.userEmail.$error}}++改动过$dirty：{{formKe.userEmail.$dirty}} ++验证没通过$invalid：{{formKe.userEmail.$invalid}}++非邮箱：{{formKe.userEmail.$error.email}}
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.userSite.$dirty&&formKe.userSite.$invalid}">
				<label for="userSite" class="control-label col-sm-2 ">*个人网址</label>
				<div class="col-sm-10">
					<input type="url" name="userSite" class="form-control" id="userSite" placeholder="个人网址"  ng-model="user.userSite" required/>
					<div class="alert alert-danger help-block" ng-show="formKe.userSite.$dirty&&formKe.userSite.$error.url">格式不正确</div>
					<!--required',也会在formKe.userEmail.$error生成$error.required，页面首次加载，就为true，所以加上formKe.userSite.$dirty-->
					<!--type='url',也会在formKe.userEmail.$error生成$error.url-->
					错误$error：{{formKe.userSite.$error}}++改动过$dirty：{{formKe.userSite.$dirty}} ++验证没通过$invalid：{{formKe.userSite.$invalid}}++非网址{{formKe.userSite.$error.url}}++没填写{{formKe.userSite.$error.required}}
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.userSite2.$dirty&&formKe.userSite2.$invalid}">
				<label for="userSite2" class="control-label col-sm-2 ">个人网址2</label>
				<div class="col-sm-10">
					<input type="url" name="userSite2" class="form-control" id="userSite2" placeholder="个人网址2"  ng-model="user.userSite2" ng-required/>
					<div class="alert alert-danger help-block" ng-show="formKe.userSite2.$dirty&&formKe.userSite2.$error.url">格式不正确</div>
					<!--ng-required',也会在formKe.userEmail.$error生成$error.required，页面首次加载，就为false，所以不需要加上formKe.userSite2.$dirty-->
					<!--type='url',也会在formKe.userEmail.$error生成$error.url-->
					错误$error：{{formKe.userSite2.$error}}++改动过$dirty：{{formKe.userSite2.$dirty}} ++验证没通过$invalid：{{formKe.userSite2.$invalid}}++非网址{{formKe.userSite2.$error.url}}++没填写{{formKe.userSite2.$error.required}}（注意和上ng-required和required区别）
				</div>
			</div>
			<div class="form-group" ng-class="{'has-error':formKe.num.$dirty&&formKe.num.$invalid}">
				<label for="num" class="control-label col-sm-2 ">数字包含e可以浮点</label>
				<div class="col-sm-10">
					<input type="number" name="num" class="form-control" id="num"  placeholder="数字包含e"  ng-model="user.num" ng-required /><!--min="1" max="99" 因为可以输入e，最大值99便不会验证-->
					<div class="alert alert-danger help-block" ng-show="formKe.num.$dirty&&formKe.num.$error.number">必须数字</div>
					<!--<div class="alert alert-danger help-block" ng-show="formKe.num.$error.min">不得小于0</div>
					<div class="alert alert-danger help-block" ng-show="formKe.num.$error.max">不得超过99</div>
					min和max,也会在$error.min和生成$error.max-->
					错误$error：{{formKe.num.$error}}++改动过$dirty：{{formKe.num.$dirty}} ++验证没通过$invalid：{{formKe.num.$invalid}}+没填写{{formKe.num.$error.required}}
				</div>
			</div>

			<div class="form-group" ng-class="{'has-error':formKe.userAge.$dirty&&formKe.userAge.$invalid}">
				<label for="userAge" class="control-label col-sm-2 ">年龄</label>
				<div class="col-sm-10">
					<input type="text" name="userAge" class="form-control" id="userAge"  placeholder="年龄"  ng-model="user.userAge" ng-required ng-pattern="/^\d{1,2}$/"/>
					<div class="alert alert-danger help-block" ng-show="formKe.userAge.$dirty&&formKe.userAge.$error.pattern">必须1-99的数字</div>
					<!--min和max,也会在$error.min和生成$error.max-->
					错误$error：{{formKe.userAge.$error}}++改动过$dirty：{{formKe.userAge.$dirty}} ++验证没通过$invalid：{{formKe.userAge.$invalid}}+没填写{{formKe.userAge.$error.required}}++非数字{{formKe.userAge.$error.number}}++非1-99数字{{formKe.userAge.$error.pattern}}
				</div>
			</div>
			<div class="form-group" >
				<label for="userSex" class="control-label col-sm-2 ">(无验证)性别</label>
				<div class="col-sm-10">
					<label class="radio-inline">
						<!-- 赋值-->
						<input type="radio" name="inlineRadioOptions" ng-model="user.sex" value="" checked>男</label>
					<label class="radio-inline">
						<input type="radio"name="inlineRadioOptions"  ng-model="user.sex" value="">女</label>
				</div>
			</div>

			<div class="form-group" >
				<label for="userSex" class="control-label col-sm-2 ">*喜欢1</label>
				<div class="col-sm-10">
					<label class="checkbox-inline">
						<input type="checkbox"  ng-model="user.likes.eat" >吃</label>
					<label class="checkbox-inline">
						<input type="checkbox"   ng-model="user.likes.drink">喝</label>
					<label class="checkbox-inline">
						<input type="checkbox" ng-model="user.likes.hitbean" >打豆豆</label>
				</div>
			</div>
			<div class="form-group" >
				<!-- 用指令生成-->
				<label  class="control-label col-sm-2 ">指令生成复选框双向绑定喜欢2</label>
				<div class="col-sm-10">
					<label class="checkbox-inline" ng-repeat="item in hobbies">
						<input type="checkbox" value="" ng-checked="user.hobbyIds.indexOf(item.id)!=-1"  ng-click="toggleThis(item.id)">{{item.hobby}}》索引：{{user.hobbyIds.indexOf(item.id)}}</label>
				</div>
			</div>
			<div class="form-group" >
				<!-- 用指令生成-->
				<label  class="control-label col-sm-2 ">三级联动</label>
				<div class="col-sm-3">
					<!--1，写在select标签上,无须option标签-->
					<!--2，ng-options和ng-repeator一样循环。因为option有value (item.id)和(as)用户看到的值(item.name ) for.-->
					<!--3，要起一个ng-model指令，即使model层没用到-->
					<!--6，省改变时候，第三级别区县隐藏:
				省ng-change="county = false" ，县ng-hide="!county"：本质改变ng-model的值，实时双向绑定 -->
					<select class="form-control" ng-change="county = false" ng-options= "item.id as item.name for item in address|cityfilter:0" ng-model="province"></select>
				</div>
				<div class="col-sm-3" >
					<!--4，过滤参数是省的ng-model，代表Id  ==>
					item.id-->
					<select class="form-control" ng-show="province" ng-options= "item.id as item.name for item in address|cityfilter:province" ng-model="district"></select>
					<!--5，ng-show的设定  下面当province和district有值才显示，值&&值之后变成bool？-->
				</div>
				<div class="col-sm-3">
					<select class="form-control" ng-show="province&&district" ng-hide="!county" ng-options= "item.id as item.name for item in address|cityfilter:district" ng-model="county"></select>
				</div>
				<!--7，问题：展示一个人的固定的省市县，后台知道查询出了县id，倒过来==>市==>省。：直接在控制器内写方法--></div>
				<div class="form-group" >
			<div class="col-sm-2" ></div>
			<div class="col-sm-10" >
				<button type="submit" class="btn btn-primary" ng-disabled="formKe.$invalid||!user.likes||!(user.likes.eat||user.likes.drink||user.likes.hitbean)">Regieter</button>
				没通过：{{formKe.$invalid}}
				错误：{{formKe.$error}}
				爱好：{{user.likes===undefined?'无爱好':user.likes}}
				<button type="reset" class="btn btn-primary" ng-click="resetForm(formKe)">Reset</button>
			</div></div>

		</form>
	</div>
</div>
</body>
</html>
```

# js

---
```
angular.module('AppKe', [])
	.filter("cityfilter", function() {
		//前台用法。会传入一个
		return function(data, parent) { //这两个参数1，全部数据3分全部数据？ 2，parent传的参数
			//console.log(data, parent);
			var finalArray = [];
			angular.forEach(data, function(obj) {
				//console.log(obj);//3份重复的数据
				if (obj.parent == parent) {
					finalArray.push(obj);
				}
			})
			return finalArray;
		}
	})
	.controller('OuterController', function($scope) {
		/***************************************************1复选框**************************************************/
		//1从数据库查询的所有选项，在前台全部列出
		$scope.hobbies = [{
			id: 1,
			hobby: "吃豆子"
		}, {
			id: 2,
			hobby: "喝豆汁"
		}, {
			id: 3,
			hobby: "豆豆玩"
		}, {
			id: 4,
			hobby: "打豆豆"
		}, {
			id: 5,
			hobby: "打一天豆豆"
		}];
		/*2从当前用户的选项id数组，在前台显示出用户的选中
		$scope.user.hobbyIds=[3,5] 不行*/
		$scope.user = {
				hobbyIds: [3, 5, 2]
			}
			/*3,用户点击的时候:可能选中，可能没选中
			当view中没选中，点击选中时，model层($scope.user)要添加对应的喜好选项Id   
			当view中选中，点击取消时，model层($scope.user)要删除对应的喜好选项Id  ，不要受到上面$scope.user的影响，删除了就少了。*/
		$scope.toggleThis = function(id) {
				//假如这个用户没有喜好
				var index = -1;
				if (!$scope.user.hobbyIds) {
					$scope.user.hobbyIds = [];
				} else {
					index = $scope.user.hobbyIds.indexOf(id);
				}
				console.log(index);
				//如果有这个选项，表示已经选中了，下面做删除的操作
				if (index != -1) {
					$scope.user.hobbyIds.splice(index, 1); //页面双向绑定，页面会变化
				} else {
					$scope.user.hobbyIds.push(id); //页面双向绑定，页面会变化
				}

			}
			/*************************************************2三级联动****************************************************/
			//1,后台获取数据库数据，自动绑定到前台
		$scope.address = [{
			name: '上海',
			parent: 0,
			id: 1
		}, {
			name: '上海市',
			parent: 1,
			id: 2
		}, {
			name: '上海一区',
			parent: 2,
			id: 8
		}, {
			name: '上海二区',
			parent: 2,
			id: 3
		}, {
			name: '北京',
			parent: 0,
			id: 4
		}, {
			name: '北京市',
			parent: 4,
			id: 5
		}, {
			name: '北京一区',
			parent: 5,
			id: 6
		}, {
			name: '北京二区',
			parent: 5,
			id: 7
		}, {
			name: '山东',
			parent: 0,
			id: 9
		}, {
			name: '青岛市',
			parent: 9,
			id: 100
		}, {
			name: '菏泽市',
			parent: 9,
			id: 11
		}, {
			name: '青岛一区',
			parent: 100,
			id: 12
		}, {
			name: '菏泽一区‎',
			parent: 11,
			id: 13
		}];
		//2给省、市、县、区写过滤器
		//省：把parentid不是0的过滤掉    
		//filter：对对象的某个字段过滤掉  不是精准过滤（只能找parentid=0或者某个值的），这次过滤的是parentid不是0的的
		//这个时候，只能自定义过滤器 在上面cityfilter


		//3省市区的选中
		$scope.county=3;
		 //从后台查这个人在的区县id是2---pid--》市id--pid--》省id


		//写一个普通方法，用this  this的指向？ 有
		this.searchParent = function(Id) {
			var pId;
			angular.forEach($scope.address, function(item) {
				if ( item.id== Id) {
					pId = item.parent;
					console.log(pId);
					return; //终止循环,跳出所有循环
				}
				
			})
			return pId;
		}


		if ($scope.county != undefined) {
			console.log($scope.county);
			$scope.district = this.searchParent($scope.county);
			console.log($scope.district);
			$scope.province = this.searchParent($scope.district);
		}


	/***************************************************重置**************************************************************/
	/*type=reset会将用户输入的清空，默认form的一些属性，radio会默认选第一个。为第一个select会选第一个值
	但是不能将绑定数据表单元素重新绑定上去 比如绑定的checkbox，select不能绑定*/
	 $scope.resetForm=function (formKe) {
	 	console.log(formKe)
	 	
        /*$setPristine 会将class,$dirty,$pristine恢复，但不是单$.error恢复*/
	 	formKe.$setPristine();//所以在ng-show面加上....$dirty 重置到原来状态的时候..$dirty就变成了false。
	 	/*对checkbox处理*/
	 	$scope.user = {
				hobbyIds: [3, 5, 2]
			}
	 }

	})
```

# 截图

![](http://images2015.cnblogs.com/blog/607624/201604/607624-20160424165403273-1890705181.png)


# 草稿

```
1表单
input属性
name 名字
ng-model 绑定的数据
ng-required 是否必填
ng-minlength   ng-maxlength 最小、最大长度
ng-pattern 匹配模式
ng-change 值变化的回调


css样式



表单验证  非常全面
http://www.miaoyueyue.com/archives/607.html
博客园
http://www.cnblogs.com/rohelm/p/4033513.html


ng-show="expression"

ng-required 


--注入的3中形式
构造者 --angular
geterseter
反射


function controller($scope){}   注入$window  service等

undefined||true
true
undefined||false
false
undefined&&false
undefined
undefined&&true
undefined
!undefined
true
```