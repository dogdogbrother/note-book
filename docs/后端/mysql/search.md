## 简单比较搜索条件

其实就是`WHERE`子句配合条件符号,例如:
```shell
SELECT * FROM student_info WHERE name = '范剑';
```
列举些常用的操作符:
|操作符|示例|描述|
|-|---|---|
|=|a = b|a等于b|
|<>或者!=|a <> b|a不等于b|
|<|a < b|a小于b|
|<=|a <= b|a小于或等于b|
|>|a > b|a大于b|
|>=|a >= b|a大于或等于b|
|BETWEEN|	a BETWEEN b AND c|满足 b <= a <= c|
|NOT BETWEEN|a NOT BETWEEN b AND c|不满足 b <= a <= c|

这里面`BETWEEN`和`NOT BETWEEN`稍稍不那么常见,举个例子.  

假如要查询学号在`20180102`~`20180104`间的学生信息:
```
SELECT * FROM student_info WHERE number BETWEEN 20180102 AND 20180104;
```
相反,查找不在这个区间内的值,就用`NOT BETWEEN`.

## 匹配列表中的元素
|操作符|示例|描述|
|-|---|---|
|IN|	a IN (b1, b2, ...)|a是b1, b2, ... 中的某一个|
|NOT IN|a NOT IN (b1, b2, ...)|a不是b1, b2, ... 中的任意一个|
```
SELECT * FROM student_info WHERE major IN ('软件工程', '飞行器设计');
```

## 匹配`NULL`值

NULL值不能用`=`去判断,需要专门的操作符,`IS NULL`和`IS NOT NULL`.

### AND操作符
```
SELECT * FROM student_score WHERE subject = '母猪的产后护理' AND score > 75;
```
要同时满足`subject = '母猪的产后护理'`和`score > 75`的数据会被找出来.

### OR操作符
或者.满足其中一个搜索条件即可.

## AND和OR的组合查询
```
mysql> SELECT * FROM student_score WHERE score > 95 OR score < 55 AND subject = '论萨达姆的战争准备';
+----------+-----------------------------+-------+
| number   | subject                     | score |
+----------+-----------------------------+-------+
| 20180102 | 母猪的产后护理              |   100 |
| 20180102 | 论萨达姆的战争准备          |    98 |
| 20180104 | 论萨达姆的战争准备          |    46 |
+----------+-----------------------------+-------+
3 rows in set (0.00 sec)
```
想找的是成绩大于95或者小于55,并且学科是论萨达姆的战争准备的数据.但是第一条数据是错的.这是因为`AND`的优先级高于`OR`.

所以真实的搜索情况是`score > 95`或者`score < 55 AND subject = '论萨达姆的战争准备'`.

所以,需要用`()`来保证搜索条件的顺序.
```shell
SELECT * FROM student_score WHERE (score > 95 OR score < 55) AND subject = '论萨达姆的战争准备';
```

## 通配符

|操作符|示例|描述|
|-|---|---|
|LIKE|a LIKE b|a匹配b|
|NOT LIKE|a NOT LIKE b|a不匹配b|

通配符用符号代替字符搜索:
1. `%`: 代表任意一个字符**串**,支持匹配0~N个字符.
`name LIKE '杜%';`可以找到杜子腾,杜子腾,杜123...,找名字里只要有香的,可以`'%香%'`.(找到史珍香)
2. `_`: 代表任意一个字符.

## 转义通配符

如果数据流里面的值里就带`'%'`和`'_'`的字符串,就要用`'\%'`和`'\_'`:
```
SELECT number, name, id_number, major FROM student_info WHERE name LIKE '范\_';
```



