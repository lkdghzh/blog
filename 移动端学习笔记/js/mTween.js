(function() {
	var lastTime = 0;
	var vendors = ['webkit', 'moz'];
	for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
	    window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
	    window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // name has changed in Webkit
	                                  window[vendors[x] + 'CancelRequestAnimationFrame'];
	}

	if (!window.requestAnimationFrame) {
	    window.requestAnimationFrame = function(callback, element) {
	        var currTime = new Date().getTime();
	        var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
	        var id = window.setTimeout(function() {
	            callback(currTime + timeToCall);
	        }, timeToCall);
	        lastTime = currTime + timeToCall;
	        return id;
	    };
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
	    	clearTimeout(id);
		};
	}
}());
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},  
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.30158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},      
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},  
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/*
	init: {
		el: 动画的元素,
		time: number,动画时间
		target: {
			attr: val
			……
		},
		type: string, 动画类型
		callBack: fn执行完的回调,
		callIn: fn 执行中的回调
	}
*/
function transform(el,attr,val){
	// el.style.transform = attr+"("+val+"px)";
	if(!el.transform){
		el.transform = {};
	}
	if(typeof val == "undefined"){
		return el.transform[attr];
	} else {
		el.transform[attr] = val;
		var inner = "";
		for(var s in el.transform){
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					inner += s+'('+el.transform[s]+'deg)';
					break;
				case "translateX":
				case "translateY":
				case "translateZ":
					inner += s+'('+el.transform[s]+'px) ';
					break;
				case "scale":
				case "scaleX":
				case "scaleY":
					inner += s+'('+el.transform[s]+')';		
			}
		}
		el.style.WebkitTransform = el.style.transform = inner;
	}
}
function css(el,attr,val){
	var CSS3TRANSFORM = [
		"rotate",
		"rotateX",
		"rotateY",
		"rotateZ",
		"skewX",
		"skewY",
		"translateX",
		"translateY",
		"translateZ",
		"scale",
		"scaleX",
		"scaleY"
	];
	for(var i = 0; i < CSS3TRANSFORM.length; i++){
		if(CSS3TRANSFORM[i] == attr){
			return transform(el,attr,val);
		}
	}
	if(typeof val == "undefined"){
		val = parseFloat(getComputedStyle(el)[attr]);
		return val;
	}
	switch(attr){
		case "opacity":
		case "zIndex":
			el.style[attr] = val;
			break;
		default:
			el.style[attr] = val + "px";	
	}
}
function mTween(init){
	var t = 0;// 当前第几次
	var b = {};// 起始位置
	var c = {};// 差值
	var d = init.time;// 总次数
	var nub = 0;
	for(var s in init.target) {
		b[s] = css(init.el,s);
		c[s] = init.target[s] - b[s];
		nub = Math.max(nub,Math.abs(c[s]));
	}
	if(!nub){
		init.callBack&&init.callBack();
		return;
	}
	cancelAnimationFrame(init.el.timer);
	init.el.timer = requestAnimationFrame(move);
	function move(){
		t++;
		if(t > d){
			init.callBack&&init.callBack();
		} else {
			for(var s in b){
				var val = Tween[init.type](t,b[s],c[s],d);
				css(init.el,s,val);
			}
			init.callIn&&init.callIn();
			init.el.timer = requestAnimationFrame(move);
		}
	}
}