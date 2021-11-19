## 多页面应用

```js
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  mode: "production",
  entry: {
    home: "./src/index.js",
    other: "./src/other.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve("dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({ 
      template: "./public/index.html",
      filename: "home.html",
      chunks: ["home"]
    }),
    new HtmlWebpackPlugin({ 
      template: "./public/index.html",
      filename: "other.html",
      chunks: ["other"]
    })
  ]
}
```
配置多页面主要有3个关键点:
* entry是可以配置多入口的,配合`output.filename`的变量用法,来生成不同的js文件.
* 通过模板生成html需要`new HtmlWebpackPlugin`插件,那么生成多个,其实就是多new几次.
* 如果没有`chunks`,那么打包出来的html并不知道对应的js文件是哪个,会把所有的js都引入进来,增加`chunks`来控制加载哪些js模块.

## source-map调试

[Devtool的官方文档](https://webpack.docschina.org/configuration/devtool/#root)

先写个bug代码:
```js
class Test {
  constructor() {
    console.lo("error");
  }
}
new Test()
```
虽然控制台会输出错误`Uncaught TypeError: console.lo is not a function`,但是点击查看详情查看具体报错信息,却发现是压缩后的代码,调试极其费劲.

这时,就需要`devtool`属性开启`source-map`功能了.
```js
module.exports = {
  devtool: "source-map",
}
```
再次打包,会发现多了个`build.js.map`文件,此文件是源码映射文件,如果有代码报错,会标识当前报错的行和列.

### 几种常见的source-map

* `source-map`.单独的map文件,大而全.
* `eval-source-map`. 打包后并没有生成map文件,而是在`build.js`用`eval`函数的方式加载了源码映射.
* `cheap-module-source-map`. 生成单独的map文件,但是没有报错的列信息,所以体积小一点.
* `eval-cheap-module-source-map`.从组合上也能看得出,集成在js文件里面没有列信息的源码映射.

### 关于source-map

* source-map的实现原理可以看[阮一峰2013年的科普文](http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html).
* map文件在浏览器的Network中看不到资源加载的,只有在打开开发者工具时才会加载.
* devtool是可以组合的,根据自己的需求来选择对应的map方式.五个关键词:`source-map`,`eval`,`inline`,`cheap`,`module`.[这篇掘金博客写的挺易懂的](https://juejin.cn/post/6969748500938489892)


## watch监听文件变化

当项目文件更改时,devServer会重新编译打包.  
这个比较简单.[官网的watch文档](https://webpack.docschina.org/configuration/watch/)

```js
module.exports = {
  watch: true,
  watchOptions: {
    poll: 1000,
    aggregateTimeout: 600,
    ignored: /node_modules/,
  }
}
```

* poll: 以毫秒为单位进行轮询.
* aggregateTimeout: 构建防抖,某个时间段内文件的改动以最后一次为主.aggregate(合计)
* ignored: 忽略某文件.