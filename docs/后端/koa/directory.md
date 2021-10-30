<!-- service -->
开发目录要分层级,结构优化,让项目代码更清晰.

写个伪需求,用户的注册登录功能.

* **routes** 文件夹存放接口和中间件.
* **controllers** 文件夹作为对应的逻辑处理和响应.
* **models** 文件夹作为定义数据库mongodb/mysql的模型Schema.

## routes目录
有两个文件, `user.js`用于注册接口,`index.js`用于汇总所有其余的路由文件.
```js
// user.js
const { login, register } = require('../controllers/users')
const router = new Router()

router.post('/login',login)
router.post('/register',register)

module.exports = router
```
`index.js`整合文件用的是fs模块循环加载:
```js
// index.js
const fs = require('fs')

module.exports = (app) => {
  fs.readdirSync(__dirname).forEach(file => {
    if (file === 'index.js') return
    const route = require(`./${file}`)
    app.use(route.routes())
  })
}
```
## controllers目录
`controllers`暴露的方法和路由是对应的,写的是具体的业务逻辑:
```js
// controllers/users.js
const User = require('../models/users');

class UsersCtl {
    async login(ctx) {
      // ctx...
    }
    async register(ctx) {
      // ctx...
    }
}

module.exports = new UsersCtl()
```

## models目录
所有的数据库的读取操作,都是要通过 `Schema` 的实例操作的.

因为 `MySQL` 和 `MongoDB` 的 `Schema` 的定义方式不一样,这里先不写demo,对应的章节会写.

