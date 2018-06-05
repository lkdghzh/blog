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
})();
exports.Person = Person;
;
var p = new Person(18);
console.log(p);
/**
*
* this is note
*/
// var nodes: NodeListOf<HTMLElement> = document.getElementsByName('div') as NodeListOf<HTMLElement>;
// for (let node of nodes) {
//     console.log(node);
// }
// let arrayList =
//     {a:1,length:1}
// for (let item of arrayList) {
//     console.log(item)
// }
