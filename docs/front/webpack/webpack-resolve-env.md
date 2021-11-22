## resolve

[官网文档](https://webpack.docschina.org/configuration/resolve/#resolve)

日常开发感知比较明显的resolve的配置应该就是alias(别名)和extension(延伸，扩展)了.

```js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src/'),
    },
  }
}
```

---

```js
module.exports = {
  resolve: {
    extensions: ['.js', '.css', '.json'],
  }
}
```
当我们`import test from './test'`时,默认找`test.js`,没有的话找`test.css`,以此类推.

## 环境变量的设置

```js
const webpack = require("webpack")
module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production")
    }),
  ]
}
```
在`index,js`中执行`console.log(DEV)`,可以正常打印production.

## 区分不同环境

通过`webpack.base.js`和`webpack.prod.js`和`webpack.dev.js`三个文件的组合,做到区分开发和正式环境.

需要安装merge:
```shell
npm i webpack-merge -D
```

以`webpack.prod.js`为例:
```js
const { merge } = require("webpack-merge")
const base = require("./webpack.base.js")
const webpack = require("webpack")

module.exports = merge(base, {
  mode: "production",
  plugins: [
    new webpack.DefinePlugin({
      DEV: JSON.stringify("production")
    })
  ]
})
```
尝试运行`npm run dev --  --config webpack.prod.js`,可以正常输出production.

这样就可以根据不同的开发环境配置不同的webpack了.
