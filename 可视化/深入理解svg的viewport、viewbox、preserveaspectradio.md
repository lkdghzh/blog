### viewport的理解

#### 例子
>这里的`viewport`的宽高就是`svg`标签里面的`width`和`height`属性值。默认单位`像素px`，这里也就是`400px*300px`,当然可以用其他单位`em rem %`等等，前提你用得着~哦！
``` 
<svg width="400" height="300" style="border:1px solid red">
    <rect width="40" height="30" fill="green"/>
</svg>
```
<button>运行图片</button>

### viewBox

重点理解，绝对不要放过的地方哦~~

#### 例子1

```
<svg width="400" height="300" style="border:1px solid red">
    <rect width="40" height="30"  fill="green"/>
</svg>
```
<script src="https://files.cnblogs.com/files/leee/run.js"></script>