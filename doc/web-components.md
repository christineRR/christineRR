## web components
> Web Components 是由 W3C 正在构建的草案（working drafts），约定了基于泛 HTML 体系构建组件库的方式。

泛 HTML 体系包括哪些？html javascript css

原因：

在大型软件中，组件化是一种共识，它一方面提高了开发效率，另一方面降低了维护成本。但是在Web前端这个领域，并没有很通用的组件模式，因为缺少一个大家都能认同的实现方式，所以很多框架/库都实现了自己的组件化方式。

关键点：

当我们使用各种编程技巧对组件进行封装时，一个无法规避的事实是，组件的内部是可被访问和影响的，例如我们对样式表进行改动时经常会担心影响到页面组件的样式。而通过Web Component封装出来的组件，我们可以选择让组件的内部隐藏起来，也就是说，组件内部是与世隔绝的！

## about w3c working drafts
冷知识装逼利器一：
![](http://gtms02.alicdn.com/tps/i2/TB1vdy8HFXXXXabapXXJdCDGpXX-1452-214.png)

+ Working Drafts (WD)
+ Candidate Recommendation (CR)
+ Proposed Recommendation (PR)
+ W3C Recommendation (REC)

[详情](http://www.w3.org/2014/Process-20140801/#rec-advance)

## W3C Web Components：

+ Custom Elements
+ Shadow DOM
+ HTML Templates
+ HTML Imports

说明：

Custom Element对外提供组件的标签，shadow DOM封装组件的内部结构，Template Element定义组件的HTML模板，HTML imports控制组件的依赖加载

+ 由于shadow DOM的出现，组件的内部实现隐藏性更好了，每个组件更加独立，但是这使得CSS变得很破碎，LESS和SASS这样的样式框架面临重大挑战。
+ 因为组件的隔离，每个组件内部的DOM复杂度降低了，所以选择器大多数情况下可以限制在组件内部了，常规选择器的复杂度降低，这会导致人们对jQuery的依赖下降。
+ 又因为组件的隔离性加强，致力于建立前端组件化开发方式的各种框架/库（除Polymer外），在自己的组件实现方式与标准Web Components的结合，组件之间数据模型的同步等问题上，都遇到了不同寻常的挑战。
+ HTML imports和新的组件封装方式的使用，会导致之前常用的以JavaScript为主体的各类组件定义方式处境尴尬，它们的依赖、加载，都面临了新的挑战，而由于全局作用域的弱化，请求的合并变得困难得多

## custom elements

#### 为什么要有这个概念
+ 提供开发者一种可以自定义自己的 dom 元素的方式
+ 使 web 应用的功能特性更易理解和描述

自定义元素的组成：

+ 自定义元素类型（custom element type），要求是小写字母连字符
+ 本地名称 local name
+ 命名空间 namespace
+ 自定义元素原型对象（custome element prototype）
+ 生命周期（lifecycle callbacks）

#### 创建自定义元素
```js
var MyElement =  document.registerElement('my-element');
```

自定义元素继承于 `HTMLElement`，所以以下效果同上：

```js
var MyElement = document.registerElement('my-element', {
  prototype: Object.create(HTMLElement.prototype)
});
```

调用：

```js
document.body.appendChild(new MyElement());
```
```html
<my-element></my-element>
```
**自定义元素命名必须包含`-`，例如`x-foo` 合法，`tabs` 不合法**

```js
// "tabs" is not a valid custom element name
document.createElement('tabs').__proto__ === HTMLUnknownElement.prototype;

// "x-tabs" is a valid custom element name
document.createElement('x-foo').__proto__ == HTMLElement.prototype
```

#### 自定义元素的继承

原生元素扩展：

```js
var MyButton = document.registerElement('my-button', {
  prototype: Object.create(HTMLButtonElement.prototype),
  extends: 'button'
});
```

```html
<button is='my-button'></button>
```

自定义元素扩展：

```js
// prototype
var MyElementProto = Object.create(HTMLElement.prototype);
// custom element my-element
var MyElement = document.registerElement('my-element', {
  prototype: MyElementProto
});
// my-element-extend extended from my-element
var MyElementExtend = document.registerElement('my-element-extend', {
  prototype: MyElementProto,
  extends: 'my-element'
});
```

#### 运行机制

**todo: 栈的理解**

自定义元素的声明和创建可以在注册元素的注册之前，这是因为标准中用栈来管理运行整个自定义元素的过程

声明式：

```html
<my-element></my-element>
```

js 创建：

```js
var myElement = document.createElement('my-element');
myElement.addEventListener('click', function(e) {
  alert('Thanks!');
});
```

#### 更多属性的自定义元素
```js
var MyElement = document.registerElement('my-element', {
  prototype: Object.create(HTMLElement.prototype, {
    name: {
      get: function() { return 'rose'; }
    },
    say: function() {
      alert('foo() called');
    }
  })
});
```

#### lifecycle callbacks
+ createdCallback	an instance of the element is created
+ attachedCallback	an instance was inserted into the document
+ detachedCallback	an instance was removed from the document
+ attributeChangedCallback(attrName, oldVal, newVal)	an attribute was added, removed, or updated

```js
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {...};
proto.attachedCallback = function() {...};

var MyElement = document.registerElement('my-element', {prototype: proto});
```

回调大部分场景用于事件的绑定和销毁

```js
proto.createdCallback = function() {
  this.addEventListener('click', function(e) {
    alert('Thanks!');
  });
};
```

#### 自定义元素添加其他元素

```js
var MyElementProto = Object.create(HTMLElement.prototype);

MyElementProto.createdCallback = function() {
  this.innerHTML = "<p>It's a story about me, long long time ago</p>";
};

var MyElement = document.registerElement('my-element', {prototype: XFooProto});
```

### shadow dom

> 灵活的自定义元素的出现，让我们可以通过自定义元素描述功能特性，问题是内部的dom 还是暴漏在dom 树中，如何解决这个问题呢？于是有了 `shodow dom`.

shadow dom 可以隐藏自定义元素内部的结构，隔离了外部对自定义元素的侵入性修改及探测。

```js
var MyElementProto = Object.create(HTMLElement.prototype);

MyElementProto.createdCallback = function() {
  // 1. Attach a shadow root on the element.
  var shadow = this.createShadowRoot();
  // 2. Fill it with markup.
  shadow.innerHTML = "<p>It's a story about me, long long time ago</p>";
};

var MyElement = document.registerElement('my-element', {prototype: XFooProto});
```

shadow dom 越负责，拼接的字符串就越多，这是一种混乱而且低效的使用方式，还会有额外的 xss 隐患。所以我们有了 `<template>`

### html template

> `<template>` 标签允许声明一段文档片段（dom fragments），是自定义元素的完整结构声明。标准的基于 dom 的客户端模版

`<tempalete>` 的 content 不会被浏览器渲染和执行（包括里面的script 和 style），也不会存在于 dom 树中。

#### 激活模版

模版本身是不可能被与加载的，模版内容的渲染和执行只能通过以下激活的方式：

```js
var t = document.querySelector('#mytemplate');
// Populate the src at runtime.
t.content.querySelector('img').src = 'logo.png';

var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```

需要注意嵌套模版，父模版激活不会影响子模版，子模版要手动激活。

### html imports

## about latest framework
冷知识装逼利器二：

### ploymer
[](http://blog.coding.net/blog/front-end-application-based-on-Polymer)


## 参考

+ [w3c web components](http://www.w3.org/TR/#tr_Web_Components)
+ [2015前端组件化框架之路](https://github.com/xufei/blog/issues/19)
+ [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#publicapi)
+ [html template](http://www.html5rocks.com/en/tutorials/webcomponents/template/)
+ [shadow dom](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
