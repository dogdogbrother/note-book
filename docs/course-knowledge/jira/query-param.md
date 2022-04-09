## useSearchParams url参数

当前有个优化点,当对项目列表进行搜索操作时,url路由也要跟着变化,记录着当前的搜索参数.

`react-router-dom`提供了个`hook`,**`useSearchParams`**.

`useSearchParams`原理基于[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams),需要注意的是,通过`URLSearchParams`获取到的query信息不能直接获得,可以通过迭代器获取到全部的信息.

`useSearchParams`hook返回的一个参数是当前url的query信息的对象,第二个参数是能改变当前url的函数.

```tsx
import { URLSearchParamsInit, useSearchParams } from "react-router-dom"

const [searchParams, setSearchParam] = useSearchParams();
```

## 先看下要什么样的效果

项目列表文件下:
```tsx
export const ProjectListScreen = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  const debouncedParam = useDebounce(param, 200);
  const { isLoading, error, data: list } = useProjects(debouncedParam);
  const { data: users } = useUsers();
  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
}
```

因为搜索是依赖参数 `param` 的,写一个自定义hook`useUrlQueryParam`,把搜索参数装到数组里传进去,会返回个新的对象作为参数,第二个参数为更改 `param` 的函数.

## useUrlQueryParam 的实现

> js和ts的内容都不少,所以先用js实现下,然后补上类型

先用文字梳理下逻辑流程.

1. 首先,这个函数内部一共会接受2个参数,一个是自定义hook函数接受的数组**keys**: `["name", "personId"]`,数组包含了我们所有查询所需的query值.
2. 第二个参数是返出去的函数参数,是最新的对象形式的query值,与默认的初始值进行合并后再设置成最新的`url-query`.

实现步骤:

1. `useSearchParams`返回的query并不是对象形式(但是有迭代器),需要用`Object.fromEntries`转成对象.
2. 有可能当前的url上面的query是比较脏的,无用的数据有一堆,这里hook的初始参数**keys**就有作用了,只要是不在**keys**里面的值的key,就不return出去,所以好需要个`subset`函数来剔除掉无用key的对象.
3. 之前的`params`对象是`useState`,怎么更改都不会让页面重新渲染,这次返回的则是个普通对象,这样会导致不停的刷新死循环,所以要用`useMemo`把1/2逻辑函数包裹住,依赖项是`useSearchParams`的值.也就是说只有重新更改了url上的query信息,才会返回新的参数对象.
4. 自定义hook第二个参数是个函数,根据外面传进来的新的query对象来更新`useSearchParams`.

```js
import { useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from "utils/index"

export const useUrlQueryParam = (keys) => {
  const [searchParams, setSearchParam] = useSearchParams();
  return [
    useMemo(
      () =>
        subset(Object.fromEntries(searchParams), keys)
      [searchParams]
    ),
    (params) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      })
      return setSearchParam(o);
    },
  ]
}
```
`subset`函数内容如下:
```js
export const subset = (obj, keys) => {
  const filteredEntries = Object.entries(obj).filter(([key]) =>
    keys.includes(k)
  );
  return Object.fromEntries(filteredEntries);
};
```

## 类型的定义