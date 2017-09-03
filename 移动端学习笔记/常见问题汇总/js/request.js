(function(){
	window.requestAnimationFrame = window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;
window.cancelAnimationFrame = window.cancelAnimationFrame || window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||window.cancelRequestAnimationFrame||window.webkitCancelRequestAnimationFrame||window.mozCancelRequestAnimationFrame;
if(!requestAnimationFrame){ //如果浏览器不支持咱们的动画帧 这回我们就需要用定时器来兼容动画帧
	var lastTime = 0;
	window.requestAnimationFrame = function(fn){
		var timer = 0;
		var nowTime = Date.now();//获取当前时间
		var time = Math.max(16.7 - (nowTime - lastTime),0);
		timer = setTimeout(fn,time);
		lastTime = nowTime;
		return timer;
	};
}
if(!cancelAnimationFrame){
	window.cancelAnimationFrame = function(index){
		clearTimeout(index);
	};
}
})();