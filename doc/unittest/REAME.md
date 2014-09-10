以下是md概览版，pdf详细版在当前目录下~

## nodejs unit test

By 柳心

## what unit test？
单元测试（又称为模块测试, Unit Testing）是针对程序模块（软件设计的最小单位）来进行正确性检验的测试工作。
OOP中的最小单位即方法。

aside: 在过程化编程中，一个单元就是单个程序、函数、过程等；对于面向对象编程，最小单元就是方法，包括基类（超类）、抽象类、或者派生类（子类）中的方法。为测试时隔离模块，经常使用stubs、mock[1]或fake等测试马甲程序。
单元测试是极限编程的基础，依赖于自动化的单元测试框架。

## why unit test?

+ 代码质量
+ 快速的需求变更
+ 重构

## how unit test?

```js
function division (a, b) {
  if (b === 0) {
    return 0;
  } else {
    return a/b;
  }
}

function test(name, actual, expect) {
  if (actual === expect) {
    console.log(name + ' case passed!');
  } else {
    console.log(name + ' case failed!');
  }
}

test('b != 0', division(10, 5), 2); // b !==0 case passed!
test('b === 0', division(10, 0), 0);
```

## 测试框架

[Testing / Spec Frameworks](https://github.com/joyent/node/wiki/modules#testing)

+ Mocha     BDD or TDD
+ Jasmine   BDD
+ vows      BDD
+ expresso  TDD
+ nodeunit  TDD
+ ...

BDD:Behavior-driven development
```js
// The "BDD" interface provides describe(), it(), before(), after(), beforeEach(), and afterEach()
describe('Array', function(){
  before(function(){
    // ...
  });

  describe('#indexOf()', function(){
    it('should return -1 when not present', function(){
      [1,2,3].indexOf(4).should.equal(-1);
    });
  });
});
```

TDD:Test-driven development
```js
// The "TDD" interface provides suite(), test(), setup(), and teardown().
suite('Array', function(){
  setup(function(){
    // ...
  });

  suite('#indexOf()', function(){
    test('should return -1 when not present', function(){
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});
```

BDD和TDD的区别？

区别于TDD，BDD是从user story的角度来编码，在测试中的描述大多是“When [scenario], giving [conditions], it should [expected results]”。

如何选择测试框架？

示例完整，持续改进，容易上手 

## Mocha

[特性](http://visionmedia.github.io/mocha/)：

+ browser support
+ use any assertion library you want/任何你想使用的断言库
+ extensible reporting, bundled with 9+ reporters/支持9中报告格式，且可扩展
+ before, after, before each, after each hooks/钩子
+ ...

## Jasmine

+ 内建的断言匹配方法expect
+ custom matchers/自定义的断言匹配
+ spies/强大、灵活的spy
+ ...

## 断言库

+ [should](https://github.com/visionmedia/should.js) BDD style

```js
var should = require('should');

(5).should.be.exactly(5).and.be.a.Number;
```

+ [expect](https://github.com/LearnBoost/expect.js) BDD style with expect()

```js
var expect = require('expect.js');

expect(5).to.be.a('number');
```

+ chai expect(), assert() and should style

```js
var chai = require('chai')
  , expect = chai.expect
  , should = chai.should();
var foo = 'bar';

expect(foo).to.be.a('string');
foo.should.be.a('string');
```

+ ...


## 测试覆盖率

+ [jscoverage](http://siliconforks.com/jscoverage/) 行覆盖率
+ [istanbul](https://github.com/gotwarlost/istanbul) 行覆盖率、分支覆盖率

## 实战 with [mocha、expect、istanbul]

[coding](https://github.com/christineRR/unit-test-demo)...

## spy and mock

+ jm-spy —— Jasmine spies
+ sinonjs

## 持续集成

+ toast 内部持续集成服务
+ travis-ci 开源的持续集成服务

## 参考
+ [BDD VS TDD](http://joshldavis.com/2013/05/27/difference-between-tdd-and-bdd/)
+ [node modules](https://github.com/joyent/node/wiki/modules#testing)
+ [istanbul with mocha](https://coderwall.com/p/x6jfwg)
