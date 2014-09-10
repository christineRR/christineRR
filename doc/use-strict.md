
### JavaScript Use Strict

> ES5引入了一种javascript的严格模式(即use strict)，相对于普通的javascript，这种模式下对js的语法和行为有一些要求。

#### 为什么引入？
  - 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为
  - 消除代码运行的一些不安全之处，保证代码运行的安全
  - 提高编译器效率，增加运行速度
  - 为未来新版本的Javascript做好铺垫

严格模式可以作用于整个脚本文件或者函数作用域

``` js
// entire script
"use strict";
var msg = 'hello world, I am a strict mode script'; 

// function script
function strict() {
  "use strict";
  var msg = 'hello world, I am a strict mode function';
  return msg
}
```

#### 语法和行为（日常会涉及到的）

显示声明全局变量

``` js
"use strict";
mistypedVaraible = 10; // throw error
```

属性名不能重复

``` js
"use strict";
var o = { p: 1, p: 2 }; // !!! syntax error
```

参数名不能相同

``` js
function sum(a, a, c){ // !!! syntax error
  "use strict";
  return a + b + c; // wrong if this code run
}
```

禁止八进制表示法

```js
"use strict";
var sum = 015 + // !!! syntax error
          197 +
          142;
```

eval作用域

```js
var x = 17;
var evalX = eval("'use strict'; var x = 42; x");
```

arguments不再追踪参数的变化

```js
function f(a){
  "use strict";
  a = 42;
  return [a, arguments[0]];
}
var pair = f(17); // [42,17]
```

禁止在函数内部遍历调用栈及arguments.callee

``` js
function restricted()
{
  "use strict";
  console.log(arguments.callee);
  restricted.caller;    // throws a TypeError
  restricted.arguments; // throws a TypeError
}
restricted();
```

函数声明只允许在脚本或函数的顶层

```js
function test() {
  "use strict";
  if (true){
    function f() { } // !!! syntax error
    f();
  }
  for (var i = 0; i < 5; i++){
    function f2() { } // !!! syntax error
    f2();
  }ma
  function baz(){ // kosher
    function eit() { } // also kosher
  }
}
```

其他请[参考](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions_and_function_scope/Strict_mode)

