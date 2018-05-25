function nbezeirCurve(controlPoints, pointCount, t = 0) {
    var step = 1 / pointCount//t->step++[0,1]
    var pointArr = []
    while (t < 1) {
        pointArr.push(getOnePointXY(controlPoints, t))
        t += step
    }
    return pointArr
}
//曲线上的一个点,分别求出x，和y
//points确定系数
//t是自变量，这里获取一个点的时候，需要t固定，画线的时候再赋值[0,1],分100份的话，每次t差距0.01，循环t
//公式中需要组合
function getOnePointXY(points, t) {
    return {
        x: Sigmar('x', points, t),
        y: Sigmar('y', points, t)
    }
}
//x或者y方向上的坐标，bezier曲线求和
function Sigmar(direction, points, t) {
    var result = 0
    //n+1个节点，是n次bezier曲线
    let n = points.length - 1
    for (let [i, { x, y }] of points.entries()) {
        var A = C(n, i)
        var P = direction === 'x' ? x : direction === 'y' ? y : x//不传'x' 'y'默认x方向
        var t1 = Math.pow(1 - t, n - i)
        var t2 = Math.pow(t, i)
        result += A * P * t1 * t2
    }
    return result
}
//组合
function C(n, i) {
    return f(n) / f(i) / f(n - i)
}
//阶乘 factorial 
function f(n) {
    if (n < 0) {
        return -1
    } else if (n === 0 || n === 1) {
        return 1
    } else {
        return (n * f(n - 1))
    }
}