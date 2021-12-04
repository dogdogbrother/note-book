## 多表查询的需求

假如我想查询`杜琦燕`的各学科成绩,就需要先从`student_info`中找number,通过number在`student_score`中查询成绩:
```
mysql> SELECT number FROM student_info WHERE name = '杜琦燕';
+----------+
| number   |
+----------+
| 20180102 |
+----------+
1 row in set (0.00 sec)

mysql> SELECT * FROM student_score WHERE number = 20180102;
+----------+-----------------------------+-------+
| number   | subject                     | score |
+----------+-----------------------------+-------+
| 20180102 | 母猪的产后护理              |   100 |
| 20180102 | 论萨达姆的战争准备          |    98 |
+----------+-----------------------------+-------+
2 rows in set (0.00 sec)
```

## 标量子查询

可以用`()`把上述的两个查询结合起来,需要先查询的语句写在`()`内,当然,可以无限嵌套.
```
mysql> SELECT * FROM student_score WHERE number = (SELECT number FROM student_info WHERE name = '杜琦燕');
+----------+-----------------------------+-------+
| number   | subject                     | score |
+----------+-----------------------------+-------+
| 20180102 | 母猪的产后护理              |   100 |
| 20180102 | 论萨达姆的战争准备          |    98 |
+----------+-----------------------------+-------+
2 rows in set (0.01 sec)
```

为什么叫**标量子查询**呢,因为子查询作为表达式,只是单纯的返回了number代表一个值.

## 列子查询

如果子查询的值不是一个值,而是多个值(列),那就可以用 `in` 去查找.
```
mysql> SELECT * FROM student_score WHERE number IN (SELECT number FROM student_info WHERE major = '计算机科学与工程');
+----------+-----------------------------+-------+
| number   | subject                     | score |
+----------+-----------------------------+-------+
| 20180101 | 母猪的产后护理              |    78 |
| 20180101 | 论萨达姆的战争准备          |    88 |
| 20180102 | 母猪的产后护理              |   100 |
| 20180102 | 论萨达姆的战争准备          |    98 |
+----------+-----------------------------+-------+
4 rows in set (0.00 sec)
```

## EXISTS 和 NOT EXISTS 子查询

有时候外层查询只关系子查询是否有值,就可以用这两个操作符:

|操作符|示例|描述|
|--|---|---|
|EXISTS|EXISTS (SELECT ...)|当子查询结果集不是空集时表达式为真|
|NOT EXISTS|NOT EXISTS (SELECT ...)|当子查询结果集是空集时表达式为真|

```
mysql> SELECT * FROM student_score WHERE EXISTS (SELECT * FROM student_info WHERE number = 111111);
Empty set (0.00 sec)
```
因为子查询是false,所以无数据.

## 相关子查询

前面的查询中,子查询和外查询是不关联的,也就是外层只是拿子查询返回的值去查询.

假如要查`student_info`的学生信息,要求是此学生在`student_score`中有成绩记录:
```
SELECT * FROM student_info WHERE EXISTS (SELECT * FROM student_score WHERE student_score.number = student_info.number);
```
1. 外层查询先拿到第一条数据.
2. 子查询用`student_info.number`作为条件去找自己表内是否有同`number`的数据.(因为两个表的number为同名,所以用了**列的全限定名**).
3. 子查询如果有值,EXISTS会判断外层的第一条数据是ok的.
4. 以此类推.

## 对同个表的子查询

假如需求是得知,`student_score`表的'母猪的产后护理'这门课的成绩中，有哪些超过了平均分的记录.

很明显,需要对整个表进行一遍查询后再次查询一遍:
```
SELECT * FROM student_score WHERE subject = '母猪的产后护理' AND score > (SELECT AVG(score) FROM student_score WHERE subject = '母猪的产后护理');
```