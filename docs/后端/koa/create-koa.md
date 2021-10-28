## 搭架子

为了尽量精炼的去输出内容,一口气多安装点东西,再逐一讲解**包**的作用:
```sh
npm init
```
```sh
npm i koa --save
npm install nodemon --save-dev
npm i koa-router --save
npm i koa-bodyparser --save
npm i koa-json-error --save
npm i cross-env --save-dev
npm i koa-parameter --save
```

## koa
非常极简的一个服务器,进入`locahost:3000`就能看到输出:
```js
const Koa = require('koa')
const app = new Koa()
app.use((ctx)=>{
  ctx.body = 'hello word'
})
app.listen(3000)
```

## nodemon
监听本地文件的变化,自动重启服务.修改`package.josn`文件的`scripts`脚本,用**nodemon**启动项目:
```json
"start": "nodemon index.js"
```

## koa-router 路由

基本使用:
```js
const Router = require('koa-router')
const router = new Router()
router.get('/users/:id',(ctx)=>{
  // 操作 ctx 就行了 ctx.params.id 就是传进来的id
})
app.use(router.routes())
```

`koa-router`有一个比较常用的功能,**`路由前缀`**,可以更好的规划模块.
```js
const usersRouter = new Router({prefix:'/users'})
usersRouter.get('/:id',(ctx)=>{})
app.use(usersRouter.routes())
```

### options请求和allowedMethods

`koa-router`还封装了处理`options`请求的方法`allowedMethods`.

假如我们对一个没做`options`方法的接口使用`options`请求,会404.

如果用了 `allowedMethods`,返回内容中则会在 `Allow` 字段中列出 `OPTIONS,GET,HEAD,POST` 等允许方法.
```js
const Koa = require('koa')
const app = new Koa()
const Router = require('koa-router')
const router = new Router()
const usersRouter = new Router({prefix:'/users'})

app.use(router.routes())
app.use(usersRouter.routes())
app.use(usersRouter.allowedMethods())
```
> 需要注意的是,要`use`三次才能把三个功能都注册上.







