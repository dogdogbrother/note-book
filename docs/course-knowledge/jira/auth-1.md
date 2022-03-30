目前开发出的页面模块有2个,一个是`project-list`项目列表,一个是`login`登录页面.

现在要做的鉴权就是登录时进入主页就是项目列表,未登录时进入就是登录页面.

## 鉴权的方式

登录或者注册后会返回用户数据,然后用context创建user数据,所以,user有值就是登录了,没有值就是未登录.

创建2个组件,一个组件装着不用登录显示的页面,一个组件装着必须登录才能显示的组件.
```tsx
// App.tsx 内差不多这样子
{user ? <项目列表组件 /> : <登录注册组件 />}
```

## auth-provider 文件处理登录/注册/登出函数逻辑

导出 
```ts
// src/auth-provider
// 在真实环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发

import { User } from "screens/project-list/search-panel";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    } else {
      return Promise.reject(data);  // 注释 *1
    }
  });
};

export const register /** */

export const logout = async () => window.localStorage.removeItem(localStorageKey);  // 注释 *2
```

### 注解
1. `return Promise.reject(data)`的原因是如果没有返回东西,那么使用此函数的地方`.then(res)`里的`res`会被ts判定为有可能是`undefined`.但是`Promise.reject`的话就如同`throw`出错误一般,避开ts的推断.
2. `logout`函数内部的操作并没有异步,`async`的目的是,在想使用`logout`函数后,再执行一些逻辑.返回个`async`函数的好处是,使用时就可以用`then`了.

## 核心逻辑代码 auth-context

`auth-context`文件主要功能有2:
1. 用`createContext`创建个上下文,把前面`auth-provider`内容中的**注册/登录/登出**函数挂载在`<Provider />`上并导出,`index.tsx`入口文件出使用`context`标签包裹下`APP`组件,下面所有组件都可以用过`useContext`获取用户信息和**注册/登录/登出**函数.
```tsx
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";

interface AuthForm {
  username: string;
  password: string;
}

const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: AuthForm) => Promise<void>;
      login: (form: AuthForm) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (form: AuthForm) => auth.login(form).then(setUser);
  const register = (form: AuthForm) => auth.register(form).then(setUser);
  const logout = () => auth.logout().then(() => setUser(null));

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};
```
2. 导出个自定义hook,返回的是用`useContext`生成的`context`上下文:
```tsx
export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
}
```

## 使用一下

1. 在`App.tsx`下判断是否有用户信息,来显示不同的组件:
```tsx
import React from "react";
import { useAuth } from "context/auth-context";
import { AuthenticatedApp } from "authenticated-app";
import { UnauthenticatedApp } from "unauthenticated-app";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </div>
  );
}

export default App;
```

2. 登录组件:
```tsx
import { useAuth } from "context/auth-context";

export const LoginScreen = () => {
  const { login } = useAuth();
  login({ username, password });
  return (<>{/** */}</>)
}
```
