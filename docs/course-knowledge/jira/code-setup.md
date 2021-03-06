# 环境配置

## 脚手架安装:
```
npx create-react-app jira --template typescript
```

## 根路径设置
当看到 `import test from '../../util/test'`时,都会想到用webpack提供的`alias`去设置`@`号代替`src`目录.

但是再ts文件中,可以因为会走`tsconfig.json`配置文件,所以可以换种方式配置:
```json
{
  "compilerOptions": {
    "baseUrl": "./src"
  }
}
```
这样在使用的时候就可以`import Test from '/util/test'`

## json-server 作为Mock数据
安装json-server:
```sh
npm i json-server -D
```
在根目录下新建文件夹`__json_server_mock__`,左右各两个的下划线说明此目录和项目无关,里面新建建立个`db.json`:
```json
{
  "users": []
}
```
`package.json`添加脚本:
```json
{
  "json-server": "json-server __json_server_mock__/db.json --watch --port 3001"
}
```
执行此命令时,会在本地开启3001端口的服务器,在postman中可以用`REST API`风格对数据进行增删改查.

### json-server 的中间件
因为日常开发中难免会用到不符合 `REST API` 风格的接口,例如登录功能,所以需要中间件来兼容,`__json_server_mock__`目录下新建`middleware.js`文件:
```js
module.exports = (req, res, next) => {
  if (req.method === "POST" && req.path === "/login") {
    if (req.body.username === "jack" && req.body.password === "123456") {
      return res.status(200).json({
        user: {
          token: "123",
        },
      });
    } else {
      return res.status(400).json({ message: "用户名或者密码错误" });
    }
  }
  next();
}
```
使用此配置文件的方案是在脚本后面加上参数和文件路径即可:
```json
{
  // ...
  "scripts": {
    // ...
    "json-server": "json-server __json_server_mock__/db.json --watch --port 3001 --middlewares ./__json_server_mock__/middleware.js"
  }
}
```

## antd 的自定义主题

[antd官网](https://ant.design/docs/react/use-with-create-react-app-cn)

按照官网步骤按照就好,不过如果需要自定义主题的话,需要引入`antd/dist/antd.less`而不是css样式文件.

```sh
npm i @craco/craco craco-less
```
把项目的启动命令脚本从`"react-scripts start"`改为craco启动
```json
{
  "start": "craco start",
  "build": "craco build",
  "test": "craco test",
}
```
在根目录下配置 `craco` 配置项,新建`craco.config.js`:
```js
const CracoLessPlugin = require("craco-less");

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              "@primary-color": "rgb(0, 82, 204)",
              "@font-size-base": "16px",
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

## 专属的开发者工具
只所以说是专属的,是这个慕课讲师专门为了这门课开发的插件.是因为课程提供的后端服务通常有2个痛点:
* 依赖现有的服务,如果down掉了或者不维护了,学习者就没法用了.
* 学习者对数据库没有权限,无法重置数据库之类的.

此工具还可以控制请求的响应时间,请求的失败的概率等等.

原理是用了`MSW`和`Service Worker`开发的.

```sh
npx imooc-jira-tool
```
如果项目不是yarn的话,还要手动安装下:
```sh
npm i jira-dev-tool
```
可以发现,`/public`目录下多了个`mockServiceWorker.js`文件.

修改`/src/index.tsx`文件:
```js
import {loadDevTools} from 'jira-dev-tool'
import 'antd/dist/antd.less'
loadDevTools(() =>
  ReactDOM.render(
    <React.StrictMode>
      {/*..*/}
    </React.StrictMode>,
    document.getElementById("root")
  )
)
```
> 需要注意的是,因为此工具也用了antd,所以引入的`antd.less`要在他后面引入确保覆盖掉.

此时有可能控制台会报**MSW**的错误,再次执行`npx msw init public`即可.

**前面关于 `json-server`**的相关内容可以删除了....后续也用不到了...