### 一、ko对象 js对象的改变都会导致viewmodel的变化，但view不一定变化
- 往ko对象里面push，viewmodel的变化，引起view的变化。
- 往js对象里面push，model的变化引起viewmodel的变化，不能引起view的变化 
        

```
<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8">
		<title></title>
	</head>
	<body>
		<ul data-bind="foreach:arr">
			<li data-bind="text:$data.chineseName"></li>
		</ul>
		<button data-bind="click:addOnePlanet">添加</button>
		
		<script type="text/javascript" src="knockout.js"></script>
		<script type="text/javascript">
		var  Planets = [
					{id:1,englishName:"Mercury",chineseName:"水星",description:"离太阳最近的一颗行星"},
					{id:2,englishName:"Venus",chineseName:"金星",description:"拥有非常厚的大气层的一颗行星"},
					{id:3,englishName:"Earth",chineseName:"地球",description:"我们的家园"}
				];
		var vm=function(){
			var self=this;
			self.arr=ko.observableArray(Planets);
			self.addOnePlanet=function(){
				//记得：往ko对象里面push  model的变化-->viewmodel的变化
				self.arr.push({id:4,englishName:"Mars",chineseName:"火星",description:"一颗红色的星球"})

				//往js对象里面push  model的变化不能引起viewmodel的变化
				//Planets.push({id:4,englishName:"Mars",chineseName:"火星",description:"一颗红色的星球"})

				console.log(self.arr().length);//不论哪个都会self.arr().length都会增加
			}
		}
		ko.applyBindings(new vm());
		</script>
	</body>
</html>
```