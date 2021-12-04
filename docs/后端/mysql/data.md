## 准备个表

```
CREATE TABLE first_table (
  first_column INT,
  second_column VARCHAR(100)
);
```
创建个表,有`INT`类型的`first_column`,还有`VARCHAR(100)`类型的`second_column`.

## 插入数据

### 批量插入记录
其实就是把每组数据用`()`包起来,用逗号分割几个:
```shell
INSERT INTO first_table(first_column, second_column) VALUES(7, 'ggg'), (8, 'hhh');
```

### 将某个查询结果插入表中
建个`second_table`表:
```
CREATE TABLE second_table (
  s VARCHAR(200),
  i INT
);
```
这里把`first_table`的一些数据插入到`second_table`表中:
```
INSERT INTO second_table(s, i) SELECT second_column, first_column FROM first_table WHERE first_column < 5;
```

### INSERT IGNORE
对于有些主键或者具有`UNIQUE`约束的列来说,是不需要有重复值的.但是问题在于,我们在插入时并不知道已有的数据是否有重复的.

所以需要个功能是,如果插入的值在列中已经存在,就忽略此次插入(下面的实例假设是有重复的并且有`UNIQUE`约束):
```
mysql> INSERT IGNORE INTO first_table(first_column, second_column) VALUES(1, '哇哈哈') ;
Query OK, `0 rows affected`, 1 warning (0.00 sec)
```
可以看到,`0 rows affected`,没有内容被插入.

当然,批量插入同样适用:
```
INSERT IGNORE INTO first_table(first_column, second_column) VALUES(1, '哇哈哈'), (9, 'iii');
Query OK, 1 row affected, 1 warning (0.00 sec)
Records: 2  Duplicates: 1  Warnings: 1
```

### INSERT ON DUPLICATE KEY UPDATE
对于上述实例中,有个痛点,