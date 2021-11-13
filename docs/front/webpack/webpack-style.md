## 基本的样式

`index.js`文件下写入代码`require('./index.css')`,`index.css`文件内容入下:
```css
@import './a.css';
html {
  background-color: red;
}
```

尝试dev或者build,会失败,这涉及到2个问题:
* webpack不识别css的`@import`.
* webpack无法把css插入到html中.

所以需要2个loader解决这俩问题,先安装下:
```sh
npm i css-loader style-loader -D
```
再在`webpack.config.js`中编写module相关配置,在webpack官网中,是这么描述[module](https://webpack.docschina.org/configuration/module/)的:这些选项决定了如何处理项目中的不同类型的模块。.
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  }
}
```
`css-loader`负责css的模块化引入,例如解析`@import`语法,`style-loader`负责把css引入到html中.

### loader的一些注意事项
* loader的特点是功能单一.  
* loader可以是字符串,也可以是对象,是对象的话可以传入更多的参数作为配置.[官网的style-loader的options实例](https://webpack.docschina.org/loaders/style-loader/#options)
* loader的执行顺序是从右到左执行的.

## 使用less
先安装less:
```sh
npm i less less-loader -D
```
```js
module.exports = {
  module: {
    rules: [
      // ...刚才写的对css解析
      {
        test: /\.less$/,
        use: [
          "style-loader", 
          "css-loader",
          "less-loader"
        ]
      }
    ]
  }
}
```
在最下面的加上`less-loader`,先把less语法转换成css,再依次向上处理.