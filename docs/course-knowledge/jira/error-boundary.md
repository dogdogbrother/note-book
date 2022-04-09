### 错误边界的概念

react对于报错的处理方式是卸载发生错误的组件树,因为他们认为,错误的ui的危害要大于不显示内容.

`react`提供了[错误边界(官网)](https://react.docschina.org/docs/error-boundaries.html)的能力,用于捕捉子组件内部发生的代码异常.

### 错误边界的使用

当一个 `class` 组件中定义了 `static getDerivedStateFromError()` 或 `componentDidCatch()`时，那么它就变成一个错误边界.

* `static getDerivedStateFromError()`处理捕捉了错误后的逻辑(哪个组件渲染).
* `componentDidCatch()` 用于打印错误信息.

### 错误边界的限制

有几种情况下错误边界**无法**捕捉:

* 事件处理(例如点击事件等).
* 异步代码.
* 服务端渲染
* 它自身抛出来的错误（并非它的子组件

## 实现

使用时传入报错的组件,`App.tsx`:
```tsx
import { ErrorBoundary } from 'components/error-boundary';

function App() {
  return (
    <div className='App'>
      <ErrorBoundary fallbackRender={/* 捕捉到错误时显示的组件 */}>
        {/* 子组件 */}
      </ErrorBoundary>
    </div>
  )
}
```
定义`ErrorBoundary`:
```tsx
import React from "react";

type FallbackRender = (props: { error: Error | null }) => React.ReactElement;

export class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{ fallbackRender: FallbackRender }>
> {
  state = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    const { error } = this.state;
    const { fallbackRender, children } = this.props;
    if (error) {
      return fallbackRender({ error });
    }
    return children;
  }
}
```

## ts问题

1. `FallbackRender` 是 `App.tsx` 中传入的显示错误的函数组件,定义`函数组件`类型的关键是用`React.ReactElement`表示返回值的类型:

2. `React.Component`的泛型,也就是prop类型是什么呢?  
首先肯定是有`children`,类型`ReactNode`.其次要有`fallbackRender`:
```tsx
class ErrorBoundary extends React.Component<{children: ReactNode, fallbackRender: FallbackRender}>{}
```

这么定义类型是没问题的,但是不太高级,react提供了个类型`PropsWithChildren`,用于合并`children`和其他的prop值.
```tsx
import { Component, PropsWithChildren } from 'react'

export class ErrorBoundary extends Component<
  PropsWithChildren<{ fallbackRender: FallbackRender }>
>
```
点击`PropsWithChildren`查看定义,可以看到是个联合类型,把传入的泛型和`ReactNode`进行 了合并.
```tsx
type PropsWithChildren<P> = P & { children?: ReactNode | undefined };
```


