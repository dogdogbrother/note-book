## npm

* 淘宝源
```sh
npm config set registry https://registry.npm.taobao.org
# 还原
npm config set registry https://registry.npmjs.org
```

* 脚本参数
假如脚本命令为`vue-cli-service serve --port 8088`,我想这个端口号是根据传参动态修改的,可以这么执行命令:
```sh
npm run dev -- --port 8088
```
`--` 后的参数可以当做脚本的尾部字符串,再命令改为`vue-cli-service serve`就ok了.
