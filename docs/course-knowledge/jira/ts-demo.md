## 项目 demo

src目录下新建`project-list`目录,分别有`index.tsx`,负责搜索的`search-panel.tsx`,负责显示表单的`list.tsx`.

`index.tsx`核心内容:
```tsx
export const ProjectListScreen = () => {
  const [users, setUsers] = useState([]);
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });
  const [list, setList] = useState([]);

  // 省略请求接口逻辑

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
```

这么写自然是会报错的,因为`<SearchPanel />`组件和`<List />`组件的prop类型并没有被定义,这2个组件的prop定义都不难.有点技巧的地方是对`setParam`函数的定义:

```tsx
interface SearchPanelProps {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProps["param"]) => void;
}
```
函数的参数的类型如果是在`interface`中定义的话,就可以用中括号的形式调用自己. 

## @ts-ignore 压制ts报错 

有些ts错误暂时不想解决,由因为报错影响后续开发,就可以在代码上方写上此注释.

## TS 基础知识

### tuple 元祖
tuple和array在js上都是数组,在ts中array是相同类型元素的结合.

而`tuple`元祖是可以由不同类型组成,但是长度固定的数组.

### unknown 类型
`any`可以表示任何类型的值,`unknown`也可以表示任何类型的值.

其实`unknown`是加强版本的`any`,不同的地方有2:
1. `unknown`类型的数据,不能调用其方法.
```ts
const value: unknown = 1
value.toString()  // 会报错
```
2. `unknown`不能当做值付给其他变量:
```ts
const value: unknown = 1
const init = value  // 会报错
```

### 泛型
假如有一个函数,我想我传进去的参数是string,那么返回的就是string,传number就返number.这就需要泛型了.
```ts
function returnFn<V>(value: V) {
  return value
}

// returnValue的类型就是 number 了`
const returnValue = returnFn(1)
```
箭头函数的泛型的位置不太一样:
```ts
const returnFn = <V>(value: V) => {
  return value
}
```