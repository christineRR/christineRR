# Jasmine

> Jasmine基于BDD的javascript测试框架，不依赖于任何的js框架

以下针对jasmine2.0.0

### 语法特性

+ describe/xdescribe 
+ it/xit 
+ beforeEach/afterEach 
+ pending 
+ aysnc done

```js
describe("Pending specs", function() {

  xit("can be declared 'xit'", function() {
    expect(true).toBe(false);
  });

  it("can be declared with 'it' but without a function");

  it("can be declared by calling 'pending' in the spec body", function() {
    expect(true).toBe(false);
    pending();
  });
});
```

断言和匹配

```js
describe('jasmine', function () {
  it ('Expectations and Matchers', function () {
    expect(true).toBe(true);
    expect(false).not.toBe(true);

    var a = 12;
    expect(a).toEqual(12);

    var message = "foo bar baz";
    expect(message).toMatch(/bar/);

    var a = {
      foo: "foo"
    };
    expect(a.foo).toBeDefined();
    expect(a.bar).not.toBeDefined();

    var a = null;
    var foo = "foo";
    expect(a).toBeNull();
    expect(foo).not.toBeNull();

    var a, foo = "foo";
    expect(foo).toBeTruthy();
    expect(a).not.toBeTruthy();
    expect(a).toBeFalsy();
    expect(foo).not.toBeFalsy();

    var a = ["foo", "bar", "baz"];
    expect(a).toContain("bar");
    expect(a).not.toContain("quux");

    var pi = 3.1415926,
      e = 2.78;
    expect(e).toBeLessThan(pi);
    expect(pi).not.toBeLessThan(e); 
    expect(pi).toBeGreaterThan(e);
    expect(e).not.toBeGreaterThan(pi);
    expect(pi).not.toBeCloseTo(e, 2);
    expect(pi).toBeCloseTo(e, 0); 

    var foo = function() {
      return 1 + 2;
    };
    var bar = function() {
      return a + 1;
    };
    expect(foo).not.toThrow();
    expect(bar).toThrow();

    expect({}).toEqual(jasmine.any(Object));
    expect(12).toEqual(jasmine.any(Number));

    var foo = {
      a: 1,
      b: 2,
      bar: "baz"
    };
    expect(foo).toEqual(jasmine.objectContaining({
      bar: "baz"
    }));
  });
});
```
自定义Matchers

```js
beforeEach(function () {
  jasmine.addMatchers({
    toBeHello: function () {
      return {
        compare: function (actual, expected) {
          var result = 'hello ' + actual;
          return {
            pass: result === expected
          }
        }
      };
    }
  });
});
```

### 强大的spies

spy可以监测任意的function的调用和参数情况，还可以注册一个对象中的方法

详细示例参考[官网](http://jasmine.github.io/2.0/introduction.html?catch=false)

```js
spyOn(foo, 'setBar');
spyOn(foo, 'getBar').and.callThrough();
spyOn(foo, "getBar").and.returnValue(745);
spyOn(foo, "getBar").and.callFake(function() {
  return 1001;
});
spyOn(foo, "setBar").and.throwError("quux");

foo.setBar.and.stub();
foo.setBar.calls.any();
foo.setBar.calls.count();
foo.setBar.calls.argsFor(index);
foo.setBar.calls.allArgs();
foo.setBar.calls.all();
foo.setBar.calls.mostRecent();
foo.setBar.calls.first();
foo.setBar.calls.reset();
```

没有function的时候创建spy

```js
// 创建一个spy
foo = jasmine.createSpy('foo');
foo(123);
// 创建多个spy
obj = jasmine.createSpyObj('obj', [set, do]);
obj.set(123);
obj.do();
```

### 讨论：

+ mock和stub的区别
+ jasmine和mocha的区别

[参考](http://segmentfault.com/a/1190000000317146)


