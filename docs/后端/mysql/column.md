## 简单的查询和插入的语句

### 简单的查询语句
如果想查看某个表里已经存储了哪些数据:
```
SELECT * FROM 表名;
```

### 简单插入语句

```
INSERT INTO 表名(列1, 列2, ...) VALUES(列1的值，列2的值, ...);
```
```shell
mysql> INSERT INTO first_table(first_column, second_column) VALUES(1, 'aaa');
```
也可以忽略某些部分列的插入,默认值就是`NULL`了.

### 批量插入
```
INSERT INTO 表名(列1,列2, ...) VAULES(列1的值，列2的值, ...), (列1的值，列2的值, ...), (列1的值，列2的值, ...), ...;
```

### 列的属性

### 默认值
插入数据时,没有插入值的列默认值是null,如果想指定默认值,可以在创建表的时候去指定:
```
列名 列的类型 DEFAULT 默认值
```
```shell
CREATE TABLE first_table (
  irst_column INT,
  second_column VARCHAR(100) DEFAULT 'abc'
);
```
这样默认值就为`abc`了.可以从`SHOW CREATE TABLE`信息中查看默认值情况.

### NOT NULL 必填
```
列名 列的类型 NOT NULL
```
```shell
CREATE TABLE first_table ( 
  first_column INT NOT NULL, 
  second_column VARCHAR(100) DEFAULT 'abc' 
);
```
这样当我们添加数据时,必须指定`first_column`的值.


### 主键
如果主键只是单个列的话，可以直接在该列后声明`PRIMARY KEY`:
```shell
CREATE TABLE student_info (
    number INT PRIMARY KEY,
    sex ENUM('男', '女'),
    enrollment_time DATE
);
```
还可以这样指定单独声明(这样还有个好处是,可以设置多个列组合作为主键):
```
PRIMARY KEY (列名1, 列名2, ...)
```
```shell
CREATE TABLE student_score (
    number INT,
    subject VARCHAR(30),
    sex ENUM('男', '女'),
    PRIMARY KEY (number, subject)
);
```
> 主键列默认是有`NOT NULL`属性,并且是不可重复的,否则添加数据时会失败.

### UNIQUE 不重复属性
有2种设置列数据不重复的方式:
1. 单个列声明
```shell
CREATE TABLE student_info (
    number INT PRIMARY KEY,
    id_number CHAR(18) UNIQUE,
);
```
2. 单独声明(或者说多个列声明,同主键):
```
UNIQUE [约束名称] (列名1, 列名2, ...)
```
或者:
```
UNIQUE KEY [约束名称] (列名1, 列名2, ...)
```

### 主键和 `UNIQUE` 约束的区别
一点是,可以有多个 `UNIQUE` 约束,并且`UNIQUE`属性的列可以存放`NULL`.

### 外键
如果一个表里面的外键的值,在另一个表里面找不到,这很明显是错误的,mysql提供了外键约束.
```
CONSTRAINT [外键名称] FOREIGN KEY(列1, 列2, ...) REFERENCES 父表名(父列1, 父列2, ...);
```
当然,外键名称是可选的,如果不起,mysql也会自动生成.

假如有2个表,`student_info`学生信息表和`student_score`学生成绩表.`student_score`的`number`列依赖于`student_info`的`number`列.

`student_score`作为子表,可以这么定义外键:
```shell
CREATE TABLE student_score (
    number INT,
    subject VARCHAR(30),
    score TINYINT,
    PRIMARY KEY (number, subject),
    CONSTRAINT FOREIGN KEY(number) REFERENCES student_info(number)
);
```

### AUTO_INCREMENT 自增属性
```
列名 列的类型 AUTO_INCREMENT
```
```
CREATE TABLE first_table (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_column INT,
  second_column VARCHAR(100) DEFAULT 'abc'
);
```
`AUTO_INCREMENT` 有几个注意点:
* 表中只能有一个`AUTO_INCREMENT`.
* `AUTO_INCREMENT`必要建立索引(主键和`UNIQUE`会自动建立).
* 不能指定`DEFAULT`默认值.
* 一般`AUTO_INCREMENT`列都是作为主键的,自动生成唯一标识.

