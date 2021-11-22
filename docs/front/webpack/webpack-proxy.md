## 跨域设置

在根目录下新建个文件`server.js`:
```js
const express = require("express")
const app = express()
app.get("/user", (_req, res) => {
  res.json({name: "senlin"})
})
app.listen(3000)
```
在`src/index.js`中,写下请求代码:
```js
let xhr = new XMLHttpRequest()
xhr.open("GET", '/api/user', true)
xhr.onload = function() {
  console.log(xhr.response);
}
xhr.send()
```
最后配置下devServer的跨域配置:
```js
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
```
先运行`node serve.js`,再运行webpack-server.发现接口请求正常.

## 单纯的模拟数据返回
```js
module.exports = {
  devServer: {
    onBeforeSetupMiddleware(devServer) {
      devServer.app.get("/api/user", (_req, res) => {
        res.json({name: "senlin999"})
      })
    }
  }
}
```
这样就模拟了自定义数据的返回.

>因为webpack-derver服务本身就是express,所以可以无缝的使用express.  

## 让接口和项目用同一个端口

也就是把webpack作为中间件运行在服务中,需要安装middleware:
```shell
npm i webpack-dev-middleware -D
```

修改`server.js`文件:
```js
const express = require("express")
const webpack = require("webpack")
const midlle = require("webpack-dev-middleware")
const config = require("./webpack.config")

const compiler = webpack(config)
const app = express()

app.use(midlle(compiler))

app.get("/user", (_req, res) => {
  res.json({name: "senlin"})
})

app.listen(3000)
```
再次执行`node server.js`即可.

