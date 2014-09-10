以下是md概览版，pdf详细版在当前目录下~

# JavaScript的OO及继承实现

## 什么是对象？

```
An object is a collection of properties and has a single prototype object. The prototype may be either an object or the null value.
```

```js
var foo = {
  x: 10,
  y: 20
};
```

两个显示属性和一个隐式属性`__proto__`

![](http://dmitrysoshnikov.com/wp-content/uploads/basic-object.png)

## 什么是原型链？

```
A prototype chain is a finite chain of objects which is used to implement inheritance and shared properties.
```

原型`prototype`和原型链`__proto__`的区别？

原型是包含若干属性的对象，原型链是对原型对象的引用，是javascript实现继承的关键。

```js
var a = {
  x: 10,
  calculate: function (z) {
    return this.x + this.y + z
  }
};

var b = {
  y: 20,
  __proto__: a
};

var c = {
  y: 30,
  __proto__: a
};

// call the inherited method
b.calculate(30); // 60
c.calculate(40); // 80
```

![](http://dmitrysoshnikov.com/wp-content/uploads/prototype-chain.png)

## javascript的oo实现

通过函数来实现类的定义，函数被定义出来后，一定包含prototype属性，是这个函数的原型对象（[详细](http://www.ecma-international.org/ecma-262/5.1/#sec-13.2)），这是javascript赋予Function可以被作为构造器使用的关键。

```js
function Foo(y) {
  this.y = y;
}
Foo.prototype.x = 10;
Foo.prototype.calculate = function (z) {
  return this.x + this.y + z;
}

var b = new Foo(20);
var c = new Foo(30);

// 结论
console.log(b.__proto__ === Foo.prototype);
console.log(c.__proto__ === Foo.prototype);
console.log(b.constructor === Foo);
console.log(b.hasOwnProperty('constructor') === false);
console.log(b.__proto__.hasOwnProperty('constructor') === true);
console.log(Foo.__proto__ === Function.prototype);
console.log(Foo.prototype.constructor === Foo);
```

![](http://dmitrysoshnikov.com/wp-content/uploads/constructor-proto-chain.png)

## javascript的继承实现

createProto [性能对比](http://jsperf.com/object-create-vs-new-ctor)

![](http://gtms04.alicdn.com/tps/i4/TB1tA8DGXXXXXXQaXXX7wVk_XXX-980-768.png)


## ES6 class

```
Notice: in ES6 the concept of a “class” is standardized, and is implemented as exactly a syntactic sugar on top of the constructor functions as described above.
```

```js
// ES6
class Foo {
  constructor(name) {
    this._name = name;
  }

  getName() {
    return this._name;
  }
}

class Bar extends Foo {
  getName() {
    return super.getName() + ' Doe';
  }
}

var bar = new Bar('John');
console.log(bar.getName()); // John Doe
```

# 参考
+ [javascript core](http://dmitrysoshnikov.com/ecmascript/javascript-the-core/)
+ [difference between `__proto__` and prototype](http://www.quora.com/What-is-the-difference-between-__proto__-and-prototype?q=javascript+__proto__+prototype)
+ [Function MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function)
+ [Function.prototype MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/prototype)
