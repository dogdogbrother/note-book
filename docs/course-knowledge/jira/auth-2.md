这章要做的有2件事:
1. 封装http请求函数,让每次请求接口可以携带`token`.
2. 因为前面判断页面权限的时候根据的是登录和注册返回的`user`信息,所以当我们登录成功进入项目列表时,一刷新页面,`user`就会变成`null`,所以还需要初始化`user`信息.

## 封装 fetch

在新建`utils/http.ts`文件:
```tsx
import qs from "qs";

interface Config extends RequestInit {
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}  // 注释 *1
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      if (response.status === 401) {
        await auth.logout();
        window.location.reload();
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();
      if (response.ok) {
        return data;
      } else {
        return Promise.reject(data);  // 注释 *2
      }
    });
};
```
### 注解
1. `window.fetch`参数的类型是什么呢?点击进去看一下:
```ts
fetch(input: RequestInfo, init?: RequestInit): Promise<Response>;
```
`RequestInfo`类型可以`是string`没问题,`RequestInit`是个`interface`,里面没有`data`和`token`,所以要创建个新的`interface`,来继承`RequestInit`接口.

2. 在不是`response.ok`情况下,`return Promise.reject(data)`的行为有点迷惑(如果你只用过axios的话).  
这是因为`axios`会把**300/400/500**通通当做异常去处理,而`fetch`只有在网络异常等等极少数情况下抛出`catch`.所以要手动的抛出异常,外面才能`.catch()`捕获错误.

## useHttp

还是`utils/http.ts`文件,导出个自定义hook函数,后续想要请求数据时,用此函数就行了:
```tsx
import { useAuth } from 'context/auth-context'

export const useHttp = () => {
  const { user } = useAuth()
  return (endpoint: string, config: Config) => {
    return http(endpoint, { ...config, token: user?.token })
  }
}
```
如果用户登录了,有`token`就自动加上了.

不过不够优雅,因为函数的参数类型是和`http`函数是一致的,如果`http`需要改动就要2个自动一起改动,可以利用`typescript4`新增的`utility-types`操作符`Parameters`来优化:
```tsx
return (...[endpoint, config]: Parameters<typeof http>) => {}
```
[typescript4文档](https://www.typescriptlang.org/docs/handbook/utility-types.html)

`Parameters`返回的是**tuple元祖**类型,所以函数形式应该也是**tuple元祖**,但是外部传入个数组不合理,所以再巧妙用扩展运算符展开元祖.

## 解决刷新页面丢失状态问题

加个获取用户信息接口就行了,加在`<Context.Provider />`组件的声明周期内即可.
```tsx
import { useMount } from 'utils'

// 省略代码
export const AuthProvider = () => {
  const [user, setUser] = useState(null)

  useMount(() => {
    bootstrapUser().then(setUser)
  })
  return (
    <AuthContext.Provider />
  )
}
```
`useMount`其实就是`useEffect`,少写一个依赖项,看着舒服一点.
```tsx
export const useMount = (callback: () => void) => {
  useEffect(() => {
    callback()
  }, [])
}
```



