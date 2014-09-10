### nodejs domain 模块

> [domain](http://nodejs.org/api/domain.html)模块可以让我们把多个IO操作放在一个组中，组中发生的任何error都将通知到domain，被domain捕获。而不是在process uncaughtException 中丢失上下文

#### 普通异常捕获：

```js
var fs = require('fs');
try {
  process.nextTick(function () {
    fs.open('non-existent file', 'r', function (err, fd) {
      if (err) throw err;
      // todo
    })
  })
} catch (err) {
  console.log('try catch:', err);
}
process.on('uncaughtException', function (err) {
  console.log('uncaughtException:', err);
})
```

#### domain中的异常：

```js
var fs = require('fs');
var domain = require('domain');
var EventEmitter = require('events').EventEmitter;

var d = domain.create();
d.on('error', function(er) {
  console.log('domain catch error:', er);
});
d.run(function() {
  evt = new EventEmitter();
  process.nextTick(function() {
    fs.open('non-existent file', 'r', function(er, fd) {
      if (er) 
        // domainEmitter
        evt.emit('error', er);
        // domainThrown
        // throw er;
    });
  });
});
process.on('uncaughtException', function (err) {
  console.log('uncaughtException:', err);
});
```

#### domain对error对象的补充：

+ error.domain 第一个处理error的domain对象
+ error.domainEmitter emit的error的事件对象
+ error.domainBound 绑定在domain上的callback，第一个参数是error对象
+ error.domainThrown 是否是throw的error

#### domain如何作用：

  + process.domain && domain.active
  + domain主要影响了nextTick, timers和event这三个模块

#### domain api:

```js
domain.create()
domain.run(fn)
domain.add(emitter)/domain.remove(emitter)
domain.bind(callback)/domain.intercept(callback)
domain.enter()/domain.exit()
domain.depose()
```

#### 在web开发中，我们可以引入一个domain的中间件，来处理异常

[domain-middleware](https://github.com/node-modules/domain-middleware)

```js
var domain = require('domain');
app.use(function (req, res, next) {
  var d = domain.create();
  d.on('error', function () {
    res.statusCode = 500;
    res.end '服务器开小差了~'
    d.dispose();
  });

  d.add(req);
  d.add(res);
  d.run(next);
})
```





