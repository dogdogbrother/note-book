## noParse 忽略解析

[官网的文档](https://webpack.docschina.org/configuration/module/#modulenoparse)说的有点模糊.其实就是说,有些库例如`jqury`,`lodash`等工具库并没有使用模块化的形式,直接引入即可,不需要通过webpack对他们进行呢递归解析处理.这样就能提升构建速度.

```js
import jquery from "jquery"
import lodash from "lodash"
console.log(jquery)
console.log(lodash);
```
```js
module.exports = {
  module: {
    noParse: /jquery|lodash/,
  },
};
```
经过测试,没有设置noParse的打包速度为**640ms**左右,设置优化后为**450ms**左右.

## IgnorePlugin 忽略引入

假如使用了momen工具:
```js
import moment from "moment"
console.log(moment().endOf("day").fromNow());
```
会输出`in 8 hours`,如果想要其输出中文,加上`moment.locale("zh-cn")`即可.

但是问题来了,`moment`支持很多种语言,而我们只需要使用中文,其他语言包的引入就很浪费,可以优化一下.

观察得知语言包的引入位置是在`node_modules/moment/locale`文件夹,可以配置:
```js
module.exports = {
  plugins: [
    new webpack.IgnorePlugin({
      resourceRegExp: /^\.\/locale$/,
      contextRegExp: /moment$/,
    }),
  ]
};
```

[这是官网给的案例](https://webpack.docschina.org/plugins/ignore-plugin/#root)这样,当我们需要设置中文包的时候,手动引入下就好了:
```js
import 'moment/locale/zh-cn'
moment.locale("zh-cn")
```

经过测试打包,没有IgnorePlugin的`build.js`为742kb,优化后的为186kb.
