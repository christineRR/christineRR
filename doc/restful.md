### RESTFUL API 实践

##### 简介

> [REST](http://zh.wikipedia.org/wiki/REST) 是英文 Representational State Transfer 的缩写，是近年来迅速兴起的，一种基于 HTTP，URI，以及 XML 这些现有协议与标准的，针对网络应用的设计和开发方式。REST是设计风格而不是标准。

RESTFUL API使用HTTP并遵循REST原则，作为一种在web开发中常用的api定义方式，我们需要注意的：

+  每个实体对象仅需要两个URL 

```
/books     # for Collections
/books/2   # for Single Object
```
每个对象仅需要两个url，第一个是获取对象的集合，第二个是获取单个对象

+  使用名词代替动词 

```
/books/2         # Good :)
/getBook?id=2    # Bad :(
```

+  正确使用HTTP方法 

```
GET     # Read    从服务器检索某个资源或者资源集合
POST    # Create  在服务器上创建资源
PUT     # Update  对服务器的现有资源进行更新
DELETE  # Delete  删除服务器的某个资源
```

+  对象间的关联关系 

```
/books/2/author  # book author
/author/1/books  # author's books 
```

+  数据分页 

```
/books?start=10&count=20   # return the books from 10 to 20
```

+  查询条件 

```
/books?order=hot   # return the books order by hot
```

+  返回需要的参数 

```
/books/2?fields=author,isbn,price   # only return the book's author, isbn and price
```

+  错误处理 

```
依靠status code来给程序标识错误，常见的status code如下： 
200 - OK             # GET success
201 - CREATED        # POST success
202 - ACCEPTED       # PUT success
400 - BAD REQUEST    # Wrong path or unsupported parameters
401 - UNAUTHORIZED   # Need Authorize
403 - FORBIDDEN      # forbidden to access
404 - NOT FOUND      # Resource not exists
500 - INTERNAL ERROR # Server error
```

具体的错误信息和错误代码（自定义的错误代码）也要返回：

``` 
{"code": 1000, "message": "missing_args", "request": "GET /books/2"}
```

+  版本管理 

```
GET   /books/2      # version 1
GET   /v2/books/2   # version 2
```

[练习题](http://gitlab.taobao.ali.com/honeycomb/backyard/wikis/home)


[参考资料](http://houxiyang.com/archives/106/)
