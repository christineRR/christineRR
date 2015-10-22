## React (Virtual) DOM Terminology

在 React 中，有以下五种重要的类型要加以区分：

+ ReactElement/ReactElement Factory
+ ReactNode
+ ReactComponent/ReactComponent Class

#### ReactElement

React中的基础类型是ReactElement，它包含四个属性：`type` `props` `key` `ref`

ReactElement 并不是实际的dom元素，它是一个轻量、无状态、不变的虚拟dom。

```js
var root = React.createElement('div');
ReactDom.render(root, document.getElementById('example'));
```

```js
var child = React.createElement('li', null, 'Text Content');
var root = React.createElement('ul', {className: 'my-list'}, child);
ReactDom.render(root, document.getElementById('example'));
```

the same to

```js
// virtual dom
var root = <ul className='my-list'>
				<li>Text Content</li>
			</ul>;
ReactDom.render(root, document.getElementById('example'));
```

#### Factories

ReactElement的工厂函数，包含一个特殊的参数`type`，React内部有定义的标准函数来实现，类似如下：

```js
function createFactory(type) {
    return React.createElement.bind(null, type);
}
```
example in React:

```js
var div = React.createFactory('div');
var root = div({className: 'my-div');
ReactDom.render(root, document.getElementById('example'));
```

对于通用的HTMl标签，React有内建的工厂函数。

```js
var root = React.Dom.ul({className: 'my-list'},
            React.Dom.li(null, 'Text Content')
           );
```

如果使用JSX就不需要工厂函数，JSX提供了便利的写法来创建ReactElements。

#### ReactNodes

一个`ReactNode`可以是以下任意一种： 

+ `ReactElement`
+ `string`（又名`ReactText`）
+ `number`（又名`ReactText`）
+ `ReactNodes`的数组（又名`ReactFragment`）

它们都可以作为`ReactElement`的子节点，构成树型的`ReactElement`s。

#### React Components

充分使用React的方式，是通过 React Component 来封装不同的内部实现。

一个`React Component`就是一个javascript 类或者构造器函数。

```js
var MyComponent = React.createClass({
    render: function() {}
});
```
当构造器被执行会返回一个包含render方法的对象，这个对象被成为一个`React Component`。

```js
// 这种用法仅用于测试，实际使用中React会自行调用
var component = new MyComponent(props);
```

除此之外，将 ReactComponent 类传递给`createELement`方法获得一个`ReactElement`。

```js
var element = React.createElement(MyComponent);
```

或者使用JSX

```js
var element = <MyComponent />;
```

当这个ReactElement作为参数传递给ReactDom时，React会调用构造函数返回一个ReactComponent的对象实例。

```js
var component = ReactDom.render(element, document.getElementById('example'));
```

如果重复调用`ReactDom.render`传入同一类型的ReactElement和同一个Dom容器节点，会返回同一个对象实例。

```js
var componentA = ReactDom.render(element, document.getElementById('example'));
var componentB = ReactDom.render(element, document.getElementById('example'));
componentA === componentB; // true
```

这就是为什么不需要自主的实例化对象。在实例化之前`ReactElement`是一个虚拟的`ReactComponent`，旧的和新的`ReactElement`会作比较，来确定是否创建一个新的`ReactComponent`实例或者使用以及存在的实例。
`ReactComponent`的`render`方法期待返回另外一个`ReactElement`，这样组件之间才能合并构建。最终渲染函数将`ReactElement`初始化为一个Dom元素的实例并插入到文档树中。

## 通用类型定义

#### Entry Point

```js
ReactDOM.render = (ReactElement, HTMLElement | SVGElement) => ReactComponent;
```

#### Nodes and Elements
```js
type ReactNode = ReactElement | ReactFragment | ReactText;

type ReactElement = ReactComponentElement | ReactDOMElement;

type ReactDOMElement = {
  type : string,
  props : {
    children : ReactNodeList,
    className : string,
    etc.
  },
  key : string | boolean | number | null,
  ref : string | null
};

type ReactComponentElement<TProps> = {
  type : ReactClass<TProps>,
  props : TProps,
  key : string | boolean | number | null,
  ref : string | null
};

type ReactFragment = Array<ReactNode | ReactEmpty>;

type ReactNodeList = ReactNode | ReactEmpty;

type ReactText = string | number;

type ReactEmpty = null | undefined | boolean;
```

#### Classes and Components

```js
type ReactClass<TProps> = (TProps) => ReactComponent<TProps>;

type ReactComponent<TProps> = {
  props : TProps,
  render : () => ReactElement
};
```

## 参考
+ [React (Virtual) DOM Terminology](https://facebook.github.io/react/docs/glossary.html)
+ [The Secrets of React's Virtual DOM](http://fluentconf.com/fluent2014/public/schedule/detail/32395)


