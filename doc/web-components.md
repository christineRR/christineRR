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

## Custom Elements

custome elements 提供了开发者一种可以自定义自己的 dom 元素的方式，用语义化的定义使 web 应用本身的功能特性更易理解和描述。

+ 本地名称 local name
+ 命名空间 namespace
+ 自定义元素原型对象（custome element prototype）
+ 生命周期（lifecycle callbacks）

### 创建自定义元素
```js
var MyElement =  document.registerElement('my-element');
```

自定义元素继承于 `HTMLElement`，所以以下效果同上：

```js
var MyElement = document.registerElement('my-element', {
  prototype: Object.create(HTMLElement.prototype)
});
```
**自定义元素命名必须小写字母包含`-`，例如`x-foo` 合法，`tabs` 不合法**

调用：

```js
document.body.appendChild(new MyElement());
```
```html
<my-element></my-element>
```

```js
// "tabs" is not a valid custom element name
document.createElement('tabs').__proto__ === HTMLUnknownElement.prototype;

// "x-tabs" is a valid custom element name
document.createElement('x-foo').__proto__ == HTMLElement.prototype
```

### 自定义元素的继承

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

### 运行机制

在自定义元素的生命周期中，由如下变化会被监听：

+ 自定义元素注册之前被创建
+ 自定义元素注册之后被创建
+ 自定义元素被插入或移除 dom 树中
+ 自定义元素的属性被创建、修改或删除

以上每个条件被触发时，都会有对应的回调函数来处理，w3c 中对不同阶段的回调函数有详细的输入输出定义。

自定义元素的注册是通过脚本执行来完成的，所以创建本身是可以在注册之前的，例如：

```html
<my-element></my-element>
```
```js
var myElement = document.createElement('my-element');
myElement.addEventListener('click', function(e) {
  alert('Thanks!');
});
```

这是因为浏览器会对未识别的元素归类为 unresolved ，在注册完成后提升为一个完整的元素。

### callbacks 类型
+ createdCallback
+ attachedCallback
+ detachedCallback
+ attributeChangedCallback

```js
var proto = Object.create(HTMLElement.prototype);

proto.createdCallback = function() {...};
proto.attachedCallback = function() {...};

var MyElement = document.registerElement('my-element', {prototype: proto});
```

回调大部分场景用于自定义元素中事件的绑定和销毁

```js
proto.createdCallback = function() {
  this.addEventListener('click', function(e) {
    alert('Thanks!');
  });
};
```

#### 自定义元素添加其他元素
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

```js
var MyElementProto = Object.create(HTMLElement.prototype);

MyElementProto.createdCallback = function() {
  this.innerHTML = "<p>It's a story about me, long long time ago</p>";
};

var MyElement = document.registerElement('my-element', {prototype: XFooProto});
```

## Shadow Dom

> 灵活的自定义元素的出现，让我们可以通过自定义元素描述功能特性。问题是自定义元素内部的 dom 结构还是暴漏在文档流中，如何解决这个问题呢？于是有了 `shodow dom`。

shadow dom 可以隐藏自定义元素内部的结构，隔离了外部对自定义元素内部 dom 结构的侵入性修改及探测。

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

### 示例
```html
<div><h3>Light DOM</h3></div>
```
```js
<script>
var root = document.querySelector('div').createShadowRoot();
root.innerHTML = '<style>h3{ color: red; }</style>' + 
                 '<h3>Shadow DOM</h3>';
</script>
```

### 概念
+ shadow host 宿主
+ shadow tree
+ shadow root 宿主根节点

结合文档树做对比：

```html
<!-- shadow host -->
<div>
  <!-- shadow tree -->
  <p>
    <h3>标题</h3>
    <span>内容</span>
  </p>
</div>
```

### multiple shadow roots
```html
<div id="example1">Light DOM</div>
```
```js
<script>
var container = document.querySelector('#example1');
var root1 = container.createShadowRoot();
var root2 = container.createShadowRoot();
var root3 = container.createShadowRoot();
root1.innerHTML = '<div>Root 1 FTW</div>';
root2.innerHTML = '<div>Root 2 FTW</div>';
root3.innerHTML = '<div>Root 3 FTW</div>';
</script>
```

shadow tree是可以叠加成shadow trees的，叠加后，后者shadow tree会覆盖前者

+ oldest shadow tree
+ youngest shadow tree

![](http://gtms04.alicdn.com/tps/i4/TB1Ov6nHFXXXXbHaXXXEJDq2FXX-1742-1518.png)

### 插入节点

`<shadow></shadow>` ：

shadow trees 的插入节点，一个 shadow tree 只插入第一个位置，其余忽略

`<content></content>`：

宿主节点子节点的插入节点

```js
// multiple shadow root
var container = document.querySelector('#container');
var root1 = container.createShadowRoot();
var root2 = container.createShadowRoot();
var root3 = container.createShadowRoot();

// insert points
root1.innerHTML = '<div>Root 1 FTW</div><content></content>';
root2.innerHTML = '<shadow></shadow><div>Root 2 FTW</div><shadow></shadow>';
root3.innerHTML = '<div>Root 3 FTW</div><shadow></shadow>';

console.log(root3.olderShadowRoot === root2);
// youngest shadow root
console.log(container.shadowRoot === root3);
console.log(root2.olderShadowRoot === root1);
```

`<content></content>` 将宿主节点的内容引入shadow dom中后，是不能通过 document 获取到的。

+ `getDistributedNodes`
+ `getDestinationInsertionPoints`

### 事件模型

shadow dom 子树中的事件可以在文档（document）中被监听，但是在事件在穿过 shadow dom 边界的时候，触发事件的target 会被重新设置，以免暴露 shadow dom 中的内部结构。

但是以下事件会被阻止：

+ abort
+ error
+ select
+ change
+ load
+ reset
+ resize
+ scroll
+ selectstart

### 样式

shadow dom 中的样式中作用于 shadow dom 的域，与外界隔离。

伪类：

+ `:host` 作用于宿主元素，or `:host(<selector>) `
+ `:host-context` 

```html
<body class="different">
  <x-foo></x-foo>
</body>
```
```css
:host-context(.different) {
  color: red;
}
```
+ `::shadow` 作用于 shadow dom 中内部的 shadow tree 中的元素
+ `/deep/` 可以打破所有 shadow dom 的边界，多用于多级 shadow dom 的下，设置样式
+ `::content` 伪类提供了对 shadow dom 中宿主元素插入节点内的样式的获取

## Html Template

shadow dom 越复杂，拼接的字符串就越多，这是一种混乱而且低效的使用方式，还会有额外的 xss 隐患。所以我们有了 `<template>`

> `<template>` 标签允许声明一段文档片段（dom fragments），是自定义元素的完整结构声明，标准的基于 dom 的客户端模版。

### 激活模版

默认浏览器是不会渲染模版内容的，模版内容的渲染和执行只能通过以下激活的方式：

```js
var t = document.querySelector('#mytemplate');
// Populate the src at runtime.
t.content.querySelector('img').src = 'logo.png';

var clone = document.importNode(t.content, true);
document.body.appendChild(clone);
```

需要注意嵌套模版，父模版激活不会影响子模版，子模版要手动激活。

## html imports

>  `import` 特性提供了以link方式来导入一段html文本的功能,相当于是template的进化版,方便做成模板文件

```html
<link rel="import" href="import.html">
```

## 参考

+ [w3c web components](http://www.w3.org/TR/#tr_Web_Components)
+ [2015前端组件化框架之路](https://github.com/xufei/blog/issues/19)
+ [Custom Elements](http://www.html5rocks.com/en/tutorials/webcomponents/customelements/#publicapi)
+ [Shadow Dom 101](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom/)
+ [Shadow Dom 201](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-201/)
+ [Shadow Dom 301](http://www.html5rocks.com/en/tutorials/webcomponents/shadowdom-301/)
+ [Html Template](http://www.html5rocks.com/en/tutorials/webcomponents/template/)

