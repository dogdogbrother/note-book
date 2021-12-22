<!-- service -->
开发目录要分层级,结构优化,让项目代码更清晰.

写个伪需求,用户的注册登录功能.

* **routes** 文件夹存放接口和中间件.
* **controllers** 文件夹作为对应的逻辑处理和响应.
* **models** 文件夹作为定义数据库mongodb/mysql的模型Schema(这里用mysql做示例).

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
```js
// models/users.js
const Sequelize = require('sequelize')
const seq = require('./seq')

// 创建表的名字user，数据库会默认变成 users
const User = seq.define('user', {
  // id 会自动创建，并设为主键，自增
  userName: {
    type: Sequelize.STRING, // 对应的是 varchar(255)
    allowNull: false // 是否允许为空
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nickName: {
    type: Sequelize.STRING,
    comment: '昵称' // 注释
  }
  // 会自动创建 createdAt 和 updateAt
})

module.exports = {
  User
}
```

## 数据库相关的配置文件

`models/users.js`中引入的`./seq.js`文件,用于登录数据库,内容如下:
```js
const Sequelize = require('sequelize')

const conf = {
  host: 'localhost',
  dialect: 'mysql'
}

const seq = new Sequelize('test', 'root', '数据库密码', conf)

seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

module.exports = seq
```

`Schema`对应的就是数据库里面字段列的属性,定义好了,要和数据库同步的话,还需要个同步`sync.js`文件:
```js
const seq = require('./seq')

require('./model')

// 测试连接
seq.authenticate().then(() => {
  console.log('连接成功')
}).catch((err) => {
  console.log('连接失败',err)
})

// 执行同步
seq.sync({force: true}).then(() => {
  console.log('同步成功');
  process.exit()
})
```
执行`node ./src/sync.js`就可以了.

