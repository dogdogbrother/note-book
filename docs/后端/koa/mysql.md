## 下载安装

[mysql下载地址](https://dev.mysql.com/downloads/mysql/)

无脑下一步安装即可,需要注意的是,安装过程中输入的起始密码,后面登录mysql服务时会用到的.

## mac 环境配置
进去 系统偏好设置-MySQL-configuration(配置),可以看到mysql的安装目录是`/usr/local/mysql`.

```sh
vim ~/.bash_profile
```
把mysql的命令加入环境变量:
```sh
PATH=$PATH:/usr/local/mysql/bin
```
```sh
source ~/.bash_profile
```
尝试登录下(密码为安装时设置的密码):
```sh
mysql -u root -p
```

### 下载安装 Navicat Premium 作为连接调试mysql的工具.
