"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Person = void 0;
var Person = (function () {
    function Person(age, name) {
        this.name = 'like';
        this.name = name;
        this.age = age;
    }
    Person.Stand = function () {
        console.log('stand on load');
    };
    Person.prototype.say = function () {
        console.log('hello,ts');
    };
    Person.hands = 4;
    return Person;
}());
exports.Person = Person;
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUE7SUFHSSxnQkFBWSxHQUFXLEVBQUUsSUFBYTtRQUZ0QyxTQUFJLEdBQVcsTUFBTSxDQUFBO1FBR2pCLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ25CLENBQUM7SUFFTSxZQUFLLEdBQVo7UUFDSSxPQUFPLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFDRCxvQkFBRyxHQUFIO1FBQ0ksT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBTk0sWUFBSyxHQUFHLENBQUMsQ0FBQTtJQU9wQixhQUFDO0NBQUEsQUFkRCxJQWNDO0FBZFksd0JBQU07QUFjbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjbGFzcyBQZXJzb24ge1xyXG4gICAgbmFtZTogc3RyaW5nID0gJ2xpa2UnXHJcbiAgICBhZ2U6IG51bWJlclxyXG4gICAgY29uc3RydWN0b3IoYWdlOiBudW1iZXIsIG5hbWU/OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgICAgIHRoaXMuYWdlID0gYWdlO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIGhhbmRzID0gNFxyXG4gICAgc3RhdGljIFN0YW5kKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdzdGFuZCBvbiBsb2FkJyk7XHJcbiAgICB9XHJcbiAgICBzYXkoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ2hlbGxvLHRzJyk7XHJcbiAgICB9XHJcbn07XHJcbi8vIHZhciBwID0gbmV3IFBlcnNvbigxOCk7XHJcbi8vIGNvbnNvbGUubG9nKHApXHJcblxyXG4vKipcclxuICogXHJcbiAqIHRoaXMgaXMgbm90ZVxyXG4gKi9cclxuXHJcbi8vIHZhciBub2RlczogTm9kZUxpc3RPZjxIVE1MRWxlbWVudD4gPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5TmFtZSgnZGl2JykgYXMgTm9kZUxpc3RPZjxIVE1MRWxlbWVudD47XHJcbi8vIGZvciAobGV0IG5vZGUgb2Ygbm9kZXMpIHtcclxuLy8gICAgIGNvbnNvbGUubG9nKG5vZGUpO1xyXG4vLyB9XHJcbi8vIGxldCBhcnJheUxpc3QgPVxyXG4vLyAgICAge2E6MSxsZW5ndGg6MX1cclxuLy8gZm9yIChsZXQgaXRlbSBvZiBhcnJheUxpc3QpIHsgXHJcbi8vICAgICBjb25zb2xlLmxvZyhpdGVtKVxyXG4vLyB9Il19