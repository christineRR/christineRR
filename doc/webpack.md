## webpack

为了将模块化的技术应用在浏览器，我们有很多可以选择的工具 `RequireJS` `Browserify` 等，同时，由于 W3C 对于组件化模块化的规范标准没有正式确认，又产生了以 CommonJS 为主的一系列对模块规范的定义 `AMD` `CMD` 等。

> module bunler，模块加载器。同时支持CommonJS和AMD形式的模块，对于不支持的模块格式，还支持对模块进行[shimming](http://webpack.github.io/docs/shimming-modules.html)。

![](http://webpack.github.io/assets/what-is-webpack.png)

### 举个栗子

添加 `content.js`

```js
module.exports = 'It works from content.js';
```

添加 `entry.js`

```js
document.write(require('./content.js'));
```

添加首页

```html
<html>
    <head>
        <meta charset="utf-8">
    </head>
    <body>
        <script type="text/javascript" src="bundle.js" charset="utf-8"></script>
    </body>
</html>
```

运行

```bash
$ webpack ./entry.js bundle.js
```

打开 `index.html` 可以看到 content 模块中的代码被加载执行了。除此之外还可以添加 css 样式。

添加样式文件 `style.css`

```css
body {
  background: yellow;
}
```

```js
// entry.js
require("!style!css!./style.css");
document.write(require('./content.js'));
```

打开首页可以发现，样式文件加载进来了。`!style!css!` 分布表示使用到的 webpack loader，包括 `style-loader` `css-loader`，对于不同类型的文件，webpack 提供对应的 loaders 进行解析。

loader 还有另外一种使用方式，可以通过设置配置文件 `webpack.config.js`。

```js
module.exports = {
  entry: './entry.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.css$/, loader: 'style!css'
      }
    ]
  }
};
```

`css-loader` 处理 css 文件中 `@import` `url(...)` 对资源文件的依赖引用。

`style-loader` 将模块中的样式以 `<style>` 标签的形式挂载到页面中。


### 特点

#### [Code Spliting](http://webpack.github.io/docs/code-splitting.html)

webpack 支持同步和异步两种依赖解析，一种是通 `NodeJS` 一样的 `require` 模块的同步加载方式，同上。另外一种是将异步加载的模块，解析成为单独的一个 `chunk` 文件。

如何定义一个分割点呢？

CommonJs

```js
require.ensure(dependencies, callback)
```
**加载依赖的模块，但并不执行**

AMD

```js
require.ensure(["module-a", "module-b"], function(require) {
    var a = require("module-a");
    // ...
});
```
**加载依赖的模块并执行**

详见[示例](https://github.com/christineRR/webpack-test)。

#### [Loaders](http://webpack.github.io/docs/loaders.html)

丰富多样的 loaders，对资源文件进行处理

#### 兼容性 

支持 AMD 和 CommonJs，同时可以在依赖中使用[表达式](http://webpack.github.io/docs/context.html)，动态加载模块。

```js
require("./template/" + name + ".jade");
```

#### [Plugin system](http://webpack.github.io/docs/404.html?/plugins.html)

webpack 拥有丰富的插件，可以让开发者根据自己需求定制使用webpack。

### 参考

+ [github webpack](https://github.com/webpack/webpack)
+ [webpack doc](http://webpack.github.io/docs/what-is-webpack.html)
+ [webpack intro](http://hanjianwei.com/2014/09/10/webpack-package-manager-for-web/)
+ [why webpack](http://www.zhihu.com/question/31352596)


