## 图片处理
假如有一张图片,想要插入到页面中:
```js
import logo from './logo.png'
const image = new Image()
image.src = logo
document.body.appendChild(image)
```
尝试运行,发现会报错,因为目前可以处理css和js文件,还不能处理别的文件,需要安装新的loader来处理:
```shell
npm i file-loader -D
```
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jgp|gif)$/,
        use: "file-loader"
      },
      // ...
    ]
  }
}
```
尝试打包,一切正常,并且在dist目录下生成一个新名称的图片.  
`file-loader`默认会在内部生成一张图片,放到目标目录下,并把新生成的图片的名字返回来.

## html文件中的图片引入
假如在html文件中引入了图片:
```js
<img src="./logo.png" alt="logo">
```
因为`file-loader`是生产了新的图片,html里的引入都是会404的,所以需要`html-withimg-loader`来处理此问题:
```shell
npm i html-withimg-loader -D
```
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jgp|gif)$/,
        use:[{
          loader:'file-loader',
          options:{
              esModule:false
          }
        }] 
      },
    ]
  }
}
```
> `html-withimg-loader`和`file-loader@5+`版本有冲突,修改下`file-loader`配置即可.

## url-loader 

`url-loader`依赖于 `file-loader`,可以设置图片尺寸,当小于某尺寸时,图片转为base64形式,减少一次网络请求,否则就用`file-loader`产生新的图片.
```shell
npm i url-loader -D
```
```js
module.exports = {
  module: {
    rules: [
      { 
        test: /\.html$/,
        use: "html-withimg-loader"
      },
      {
        test: /\.(png|jgp|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit: 200 * 1024,  // 小于200KB转base64
            esModule:false
          }
        }] 
      },
    ]
  }
}
```

## 文件夹分类

假如打包的时候,想把图片和css分别放到不同文件夹里面,需要配置对应的`outputPath`:
```js
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jgp|gif)$/,
        use:[{
          loader:'url-loader',
          options:{
            limit: 20 * 1024,
            esModule: false,
            outputPath: "img/"
          }
        }] 
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/main.css",
    })
  ]
}
```

### 输出文件前缀
有可能打包后的资源文件都是自动上传CDN的,所以想资源都加上CDN地址,可以在`output`下添加`publicPath`字段.

当然也可以只对css或者js或者图片做处理.[MiniCssExtractPlugin的publicPath文档](https://webpack.docschina.org/plugins/mini-css-extract-plugin/#the-publicpath-option-as-function)