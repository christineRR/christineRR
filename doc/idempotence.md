## Http幂等性

>

### 什么是幂等？

在数学里，幂等有两种主要的定义

+ 在某二元运算下，幂等元素是指被自己重复运算(或对于函数是为复合)的结果等于它自己的元素。例如，乘法下唯一两个幂等实数为0和1。

```js
a = 1
if a*a is a then console.log '幂等'
```

+ 某一元运算为幂等的时，其作用在任一元素两次后会和其作用一次的结果相同。例如，高斯符号便是幂等的。


### Restful中的幂等性

> Methods can also have the property of "idempotence" in that (aside from error or expiration issues) the side-effects of N > 0 identical requests is the same as for a single request. The methods GET, HEAD, PUT and DELETE share this property. Also, the methods OPTIONS and TRACE SHOULD NOT have side effects, and so are inherently idempotent.

HTTP方法的幂等性是指一次和多次请求某一个资源应该具有同样的副作用

+ GET  读取资源，满足幂等性
+ DELETE 删除资源，有副作用，满足幂等性
+ PUT  更新资源或创建，有副作用，满足幂等性
+ POST 创建资源或更新，作用于资源集合，不满足幂等性

当操作没有达到预期的目标时，我们可以不停的重试，而不会对资源产生副作用。从这个意义上说，POST操作往往是有害的，但很多时候我们还是不得不使用它。

### 参考资料

1. [幂等](http://zh.wikipedia.org/wiki/%E5%86%AA%E7%AD%89)

2. [HTTP幂等性概念和应用](http://coolshell.cn/articles/4787.html)

3. [Method Definitions](http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html)
