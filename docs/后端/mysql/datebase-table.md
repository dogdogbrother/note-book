先登录mysql客户端.

## 数据库的基本操作

### 查看数据库
```
SHOW DATABASES;
```

### 创建数据库
```
CREATE DATABASE test;
```
`SHOW DATABASES;`查看数据库,发现已经创建好了,如果再次创建`test`数据库就会报错.

可以加上判断条件去创建:
```
CREATE DATABASE IF NOT EXISTS test;
```
意思是如果指定的数据库不存在的话就创建它，否则什么都不做.

### 切换当前数据库
```
USE test;
```
如果退出mysql的话,再进入是需要再次选择数据库的,可以登录的时候把数据库加到后面快捷登录.
```
mysql -u root -p test
```


### 删除数据库
```
DROP DATABASE test;
```
当然,也可以使用`IF NOT EXIST`去删除.

## 表的基本操作

选切换到新建立的`test`数据库.

### 展示当前表
```
mysql> SHOW TABLES;
Empty set (0.00 sec)
```
当前还没有数据,自然是空的.

### 建表
```
CREATE TABLE 表名 (
    列名1    数据类型    [列的属性],
    列名2    数据类型    [列的属性],
    ...
    列名n    数据类型    [列的属性]
);
```
照着这种格式,创建下:
```
mysql> CREATE TABLE first_table (
    ->     first_column INT,
    ->     second_column VARCHAR(100)
    -> );
```
命令行输出`Query OK, 0 rows affected (0.06 sec)`以为创建成功,耗时0.06秒.affected(收到影响)

建表的时候也可以添加注释:
```
CREATE TABLE 表名 (
    各个列的信息 ...
) COMMENT '表的注释信息';
```

### 删除表
```
DROP TABLE 表1, 表2, ..., 表n;
```

### 查看表结构
```
DESCRIBE 表名;
DESC 表名;
EXPLAIN 表名;
SHOW COLUMNS FROM 表名;
SHOW FIELDS FROM 表名;
```
这几种查询方式效果是一样的.

还可以这样查询:
```
SHOW CREATE TABLE first_table;
```
输出:
```
first_table | CREATE TABLE `first_table` (
  `first_column` int DEFAULT NULL,
  `second_column` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='第一个表'
```
这种查询会展示表的一些属性,例如储存引擎和默认字符集等等.

### 对非当前库的表的操作

假如我们现在不在`test`数据下,但是想看`test`下有哪些表,可以用:
```
HOW TABLES FROM test;
```

如果想对其他数据库的表进行参考的话,可以这样指明:**数据库名.表名**.

### 修改表名
```
ALTER TABLE 旧表名 RENAME TO 新表名;
```
还可以批量修改表名:
```
RENAME TABLE 旧表名1 TO 新表名1, 旧表名2 TO 新表名2, ... 旧表名n TO 新表名n;
```

>如果在修改表名的时候指定了数据库名，还可以将该表转移到对应的数据库下.


### 增加列
用法:
```
ALTER TABLE 表名 ADD COLUMN 列名 数据类型 [列的属性];
```
尝试给一个表新增个列:
```
ALTER TABLE test_table add column test CHAR(4);
```

把新增的列插入到第一列:
```
ALTER TABLE test_table add column test1 CHAR(4) first;
```

添加到指定列的后边:
```
ALTER TABLE 表名 ADD COLUMN 列名 列的类型 [列的属性] AFTER 指定列名;
```

### 删除列
```
ALTER TABLE 表名 DROP COLUMN 列名;
```

### 修改列信息
有2种修改方式:

1. 修改列内容但是不修改列名:
```
ALTER TABLE 表名 MODIFY 列名 新数据类型 [新属性];
```
2. 修改列名,同时修改列属性:
```
ALTER TABLE 表名 CHANGE 旧列名 新列名 新数据类型 [新属性];
```

需要注意的是,列的类型和属性要兼容本有的数据,如果本来是`VARCHAR(100)`,改成了`VARCHAR(2)`.这有可能会因为原有的数据格式错误导致修改失败.

### 修改列排列位置
1. 将列设为表的第一列:
```
ALTER TABLE 表名 MODIFY 列名 列的类型 列的属性 FIRST;
```
2. 将列放到指定列的后边:
```
ALTER TABLE 表名 MODIFY 列名 列的类型 列的属性 AFTER 指定列名;
```

### 一条语句中包含多个修改操作
```
ALTER TABLE 表名 操作1, 操作2, ..., 操作n;
```
