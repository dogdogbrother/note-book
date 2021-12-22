[mysql下载地址](https://dev.mysql.com/downloads/mysql/)

无脑下一步安装即可,需要注意的是,安装过程中输入的起始密码,后面登录mysql服务时会用到的.

## mac 环境配置
进去 系统偏好设置-MySQL-configuration,可以看到mysql的安装目录是`/usr/local/mysql`.

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

## ContOS 环境配置

[菜鸟教程的安装步骤](https://www.runoob.com/mysql/mysql-install.html)挺好的.

1. 先看下,是否自带安装MySQL:
```
rpm -qa | grep mysql
```
2. 有的话先卸载:
```
rpm -e mysql　　// 普通删除模式
rpm -e --nodeps mysql　　// 强力删除模式，如果使用上面命令删除时，提示有依赖的其它文件，则用该命令可以对其进行强力删除
```
3. 安装MySQL:
```
wget http://repo.mysql.com/mysql-community-release-el7-5.noarch.rpm
rpm -ivh mysql-community-release-el7-5.noarch.rpm
yum update  // 非强制更新
yum install mysql-server
```
4. 启动MySQL:
```
systemctl start mysqld
systemctl status mysqld  // 查看MySQL的运行状态
```
5. 查看版本和设置密码
```
mysqladmin --version
mysqladmin -u root password "new_password";
```

## 登录客户端

尝试登录下(密码为安装时设置的密码):
```sh
mysql -u root -p
```
正常登录是隐藏密码登录的,但是如果你就是要明码登录,可以这样:
```sh
mysql -u root -p123456
```
当显示`mysql>`时,代表登录成功.退出客户端可以用下面任何命令
1. `quit`
2. `exit`
3. `\q`

## 基础操作

当输入一个命令后,必须要用`;`或者`\g`或者`\G`结尾,否则mysql会傻傻的等待命令结束:
```
mysql> select now();
+---------------------+
| now()               |
+---------------------+
| 2021-11-24 12:02:06 |
+---------------------+
1 row in set (0.00 sec)
```
等同于:
```
mysql> select
    -> now()
    -> ;
+---------------------+
| now()               |
+---------------------+
| 2021-11-24 12:02:58 |
+---------------------+
1 row in set (0.00 sec)
```

使用`\c`放弃本次操作:
```
mysql> SELECT NOW()\c
mysql>
```
### 下载安装 Navicat Premium 作为连接调试mysql的工具.

## 数据类型

### 整数类型:
* TINYINT
* SMALLINT
* MEDIUMINT
* INT（别名：INTEGER)
* BIGINT

### 浮点数类型:
* FLOAT
* DOUBLE

### 日期和时间类型
* `YEAR`-1901~2155-年份值
* `DATE`-'1000-01-01' ~ '9999-12-31'-日期值
* `TIME`-'-838:59:59' ~ '838:59:59'-时间值
* `DATETIME`-'1000-01-01 00:00:00' ～ '9999-12-31 23:59:59'-日期加时间值
* `TIMESTAMP`-'1970-01-01 00:00:01' ～ '2038-01-19 03:14:07'-时间戳

### 字符串类型
* `CHAR(M)` M个字符,固定长度的字符串
* `VARCHAR(M)` M个字符,	可变长度的字符串
* `TINYTEXT` 非常小型的字符串
* `TEXT`
* `MEDIUMTEXT`
* `LONGTEXT`

### ENUM类型和SET类型
ENUM枚举就是从指定的值里面选择某一个值,例如男女中选择男还是女.

SET是从指定的值里面选择一个或者多个值.





