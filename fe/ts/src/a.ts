export class Person {
    name: string = 'like'
    age: number
    constructor(age: number, name?: string) {
        this.name = name;
        this.age = age;
    }
    static hands = 4
    static Stand() {
        console.log('stand on load');
    }
    say() {
        console.log('hello,ts');
    }
};
// var p = new Person(18);
// console.log(p)

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