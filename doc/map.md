# 地图上的数据分析

介绍两种常用的在地图上分析数据的方法，它们的实现及涉及到的相关知识。
地图服务用的是[阿里云地图](http://ditu.aliyun.com/jsdoc/)

### 地域圈选

```js
  // init map
  var map=new AliMap(id);
  var center = new AliLatLng(30.24231,120.16933);
  map.centerAndZoom(center, 11);//显示地图
  
  map.disableDragging();
  
  // init oval
  var oval = new AliRectOverlay();
  oval.setFillColor("#FF9900");
  oval.setLineColor("#FF6600");
  var bounds = map.getProjection().getSquare(center, 10000);
  oval.setBounds(bounds);
  oval.setOpacity(0.3);
  map.addOverlay(oval);

  // trigger start editting
  oval.startEditting();

  // trigger end editting
  oval.endEditting();
```
依赖的[api](http://ditu.aliyun.com/jsdoc/map/classes/AliRectOverlay.html)及[demo](http://ditu.aliyun.com/jsdoc/map/example/overlay/rect.html)

> 常用的geocode（将地址转换为地理坐标）：可以参考[google geocoding api](https://developers.google.com/maps/documentation/javascript/geocoding?hl=zh-cn)、阿里云地图相应[api服务](http://ditu.aliyun.com/jsdoc/map/example/geocoder/geocoding.html)


### 热力图

热力图算法[heatmapjs](http://www.patrick-wied.at/static/heatmapjs/)，用alpha透明度方式页面上画发散的圆。[参考](http://1.aisensiy.sinaapp.com/heatmapjs/)

```js
  // heatmap configuration
  var config = {
      element: document.getElementById("heatmapArea"),
      radius: 30,
      opacity: 50
  };
  
  //creates and initializes the heatmap
  var heatmap = h337.create(config);

  // let's get some data
  var data = {
      max: 20,
      data: [
          { x: 10, y: 20, count: 18 },
          { x: 25, y: 25, count: 14 },
          { x: 50, y: 30, count: 20 }
          // ...
      ]
  };

  heatmap.store.setDataSet(data);
```
> 地图相关数据的存储解析：geohash算法，把二维的经纬度编码成一维的字符串，是一种地址编码方式。比如，北海公园的编码是wx4g0ec1。geohash表示的并不是一个点，而是一个矩形区域。编码与解码[geohashjs](https://github.com/davetroy/geohash-js/blob/master/geohash.js)

