## react-router 的使用

```tsx
import { Route, Routes } from 'react-router'
import { BrowserRouter as Router } from 'react-router-dom'

function App() {
  return <Router>
    <Routes>
      <Route path={"/home"} element={<Home />} />
      <Route path={"/login"} element={<Login />} />
      <Route index element={<Home />} />
    </Routes>
  </Router>
}
```

## 使用

```tsx
<Link to={"/home"}>去首页</Link>
```

## 有些说明

使用 `react` 的路由需要有2个库,`react-router`和`react-router-dom`.  
两者的关系和`react`/`react-dom`的关系一样,`react-route-domr`的内容都和**dom元素**有关.  
例如`Routes`里装的是`Contex.Provider`(因为要使用获取路由相关的hook),`Link`是a标签等等.

给`<Route>`标签加上`index`,会让这个路由成为默认的入口.


