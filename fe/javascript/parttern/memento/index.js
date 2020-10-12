
// 一条记忆实体(内容)
// 一条备忘
// 仅仅描述一条实体的类。【用value通用，各种数据都能备忘]
class Memento {
    constructor(value) {
        this.value = value;
    }
}
// 多条备忘的集合
// 提供([仅从顶部新增、删除])添加备忘 撤销备忘 ,无删除
class MementosStorage {
    constructor(memento) {
        // TODO Memento 类型校验
        this.value = [memento]
    }
    get length() {
        return this.value.length
    }
    // do 
    add(memento) {
        return this.value.push(memento)
    }
    // --> undo
    remove(memento) {
        return this.value.pop(memento)
    }
}

class MementosManager {
    constructor(memento) {
        this.storage = this.value = new MementosStorage(memento)
    }
    addMemento(memento) {
        return this.storage.add(memento);
    }
    undo() {
        return this.storage.remove();
    }
    getMemento(index = this.storage.length - 1) {
        return this.storage.value[index]
    }
    motify(index = this.storage.length - 1, memento) {
        this.storage.value[index] = memento
    }
}

const li = {
    name: "li",
    phone: 15120065082
}
const zhang={
    name: "zhang",
    phone: 1
}
const wang={
    name: "wang",
    phone: 2
}
const zhao ={
    name: "zhao",
    phone: 3
}
const manager = new MementosManager(li);
var item = manager.getMemento()
console.log('item init', item)  // {name: "li", phone: 15120065082}

manager.addMemento(zhang)
var item = manager.getMemento()
console.log('item after add', item) // {name: "zhang", phone: 1}

manager.addMemento(wang)
var item = manager.getMemento()
console.log('item after add', item) // {name: "wang",phone: 2}

manager.addMemento(zhao)
var item = manager.getMemento()
console.log('item after add', item) // {name: "zhao", phone: 3}

manager.undo()
var item = manager.getMemento()
console.log('item after undo',item); // {name: "wang", phone: 2}

manager.undo()
var item = manager.getMemento()
console.log('item after undo',item); // {name: "zhang", phone: 1}

manager.undo()
var item = manager.getMemento()
console.log('item after undo',item); // {name: "li", phone: 15120065082}