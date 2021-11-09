## 安装初使用 webpack

```sh
npm init -y
npm i webpack webpack-cli -D
```

在src目录下新建`index.js`文件,内容为`console.log(1)`.

执行`npx webpack`,会发现多出个文件`/dist/main.js`,内容就是打包后的内容.

---

webpack可以**0配置**,在没有配置的情况下,webpack提供了2个功能:
* 打包.  
* 模块化.(虽然没有写demo,但是是支持的,`index.js`引入其他文件是可以被打包的)

## 手动配置webpack
默认配置文件的名字 `webpack.config.js`:
```js
const path = require("path")

module.exports = {
  mode: "development",
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist")
  }
}
```
`mode`一般有2中模式,`production`(压缩代码)和`development`(具有调试能力).

如果不想用默认的文件
名,也可以文件改名为`webpack.my.js`,执行命令`webpack.my.js --config webpack.my.js`.

当然可以也可以写`package.json`脚本命令:
```json
"scripts": {
  "build": "webpack --config webpack.my.js"
}
```