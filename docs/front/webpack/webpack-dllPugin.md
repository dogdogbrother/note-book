## DllPlugin

>dll是动态链接库的意思,是Dynamic Link Library的缩写.

[DllPlugin文档解释](https://webpack.docschina.org/plugins/dll-plugin/)

### 案例

假如给项目安装`react`和`react-dom`,和解析react语法用的`@babel/preset-react`:
```shell
npm i react react-dom @babel/preset-react
```
`webpack.config.js`加上对应的loader配置:
```
presets: [
  "@babel/preset-env",
  "@babel/preset-react"
]
```

在`index.js`中写react内容:
```js
import React from "react"
import { render } from "react-dom"

render(<h1>react-demo</h1>, window.root)
```
`window.root`指的是挂载的dom节点,所以`public/index.html`中增加对应的节点:
```html
<body>
  <div id="root"></div>
</body>
```
尝试`npm run dev`,没问题.

### 痛点

`react`和`react-dom`是不会经常变动的,而每次修改或是打包,都会把这两个库的内容打包进`build.js`中.

`DllPlugin`的作用就是把某些库从bundles中抽离出来,提升构建速度.

### 
