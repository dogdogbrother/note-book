## 复杂统计的痛点

目前成绩表`student_score`里面的`subject`学科内容有母猪的产后护理和论萨达姆的战争准备.需要查询到这两门学科的平均分,就要查询2次:
```
SELECT AVG(score) FROM student_score WHERE subject = '母猪的产后护理';
```
```
SELECT AVG(score) FROM student_score WHERE subject = '论萨达姆的战争准备';
```

## 分组
`GROUP BY`子句会根据列里面有多少不同的数据,分成多少组:
```
mysql> SELECT subject, AVG(score) FROM student_score GROUP BY subject;
+-----------------------------+------------+
| subject                     | AVG(score) |
+-----------------------------+------------+
| 母猪的产后护理              |    73.0000 |
| 论萨达姆的战争准备          |    73.2500 |
+-----------------------------+------------+
2 rows in set (0.01 sec)
```

分组的目的是为了做统计,如果查询了不需要统计的数据会报错:
```
mysql> SELECT number, subject, AVG(score) FROM student_score GROUP BY subject;
ERROR 1055 (42000): Expression #1 of SELECT list is not in GROUP BY clause and contains nonaggregated column 'xiaohaizi.student_score.number' which is not functionally dependent on columns in GROUP BY clause; this is incompatible with sql_mode=only_full_group_by
```
> `ONLY_FULL_GROUP_BY`的SQL模式可以绕开这个错误,不在讨论范围内.

## 带有WHERE子句的分组查询
```
mysql> SELECT subject, AVG(score) FROM student_score WHERE score >= 60 GROUP BY subject;
+-----------------------------+------------+
| subject                     | AVG(score) |
+-----------------------------+------------+
| 母猪的产后护理              |    89.0000 |
| 论萨达姆的战争准备          |    82.3333 |
+-----------------------------+------------+
```
1. 先查询不足60成绩的数据剔除掉.
2. 最后取平均值.

## 用于分组的过滤 HAVING

假如分组有很多很多,想把平均分不足73的学科过滤掉.可以使用`HAVING`子句.
```
mysql> SELECT subject, AVG(score) FROM student_score GROUP BY subject HAVING AVG(score) > 73;
+-----------------------------+------------+
| subject                     | AVG(score) |
+-----------------------------+------------+
| 论萨达姆的战争准备          |    73.2500 |
+-----------------------------+------------+
1 row in set (0.00 sec)
```

## 分组排序
```
mysql> SELECT subject, AVG(score) AS avg_score FROM student_score GROUP BY subject ORDER BY avg_score DESC;
+-----------------------------+-----------+
| subject                     | avg_score |
+-----------------------------+-----------+
| 论萨达姆的战争准备          |   73.2500 |
| 母猪的产后护理              |   73.0000 |
+-----------------------------+-----------+
2 rows in set (0.01 sec)
```

## 嵌套分组
```
mysql> SELECT department, major, COUNT(*) FROM student_info GROUP BY department, major;
+-----------------+--------------------------+----------+
| department      | major                    | COUNT(*) |
+-----------------+--------------------------+----------+
| 航天学院        | 电子信息                 |        1 |
| 航天学院        | 飞行器设计               |        1 |
| 计算机学院      | 计算机科学与工程         |        2 |
| 计算机学院      | 软件工程                 |        2 |
+-----------------+--------------------------+----------+
4 rows in set (0.00 sec)
```
`GROUP BY department, major`子句,会先在分大组,再分小组,而聚集函数将作用在最后一个分组列上.

## 使用分组注意事项

1. 如果分组列中含有`NULL`值，那么`NULL`也会作为一个独立的分组存在。
2. 如果存在多个分组列，也就是嵌套分组，聚集函数将作用在最后的那个分组列上。
3. 如果查询语句中存在WHERE子句和ORDER BY子句，那么GROUP BY子句必须出现在WHERE子句之后，ORDER BY子句之前。
4. 非分组列不能单独出现在检索列表中(可以被放到聚集函数中)。
5. GROUP BY子句后也可以跟随表达式(但不能是聚集函数)
```
mysql> SELECT concat('专业：', major), COUNT(*) FROM student_info GROUP BY concat('专业：', major);
+-----------------------------------+----------+
| concat('专业：', major)           | COUNT(*) |
+-----------------------------------+----------+
| 专业：电子信息                    |        1 |
| 专业：计算机科学与工程            |        2 |
| 专业：软件工程                    |        2 |
| 专业：飞行器设计                  |        1 |
+-----------------------------------+----------+
4 rows in set (0.00 sec)
```
6. `WHERE` 子句和 `HAVING` 子句的区别在于,`WHERE` 子句过滤掉的记录将不包括在分组中。而 `HAVING` 子句在数据分组后进行过滤，作用于整个分组。

## 子句的顺序

除了`SELECT`之外，其他的子句全都是可以省略,并且顺序
```
SELECT [DISTINCT] 查询列表
[FROM 表名]
[WHERE 布尔表达式]
[GROUP BY 分组列表 ]
[HAVING 分组过滤条件]
[ORDER BY 排序列表]
[LIMIT 开始行, 限制条数]
```