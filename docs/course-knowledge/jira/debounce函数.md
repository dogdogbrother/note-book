# 防抖函数

在输入内容进行搜索需求时,为了限制搜索频率,要写个防抖函数.

## 防抖函数
```js
const debounce = (func, delay) => {
  let timeout;
  return (...param) => {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
      func(...param);
    }, delay);
  }
}
const log = debounce(() => console.log('call'), 5000)
log()
log()
log()  // 只执行最后一次
```
原理是通过闭包的特性记录住上次的定时器状态.

## 自定义hook的防抖
```ts
export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // 每次在value变化以后，设置一个定时器
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    // 每次在上一个useEffect处理完以后再运行
    return () => clearTimeout(timeout);
  }, [value, delay]);

  return debouncedValue;
};
```
当我们因为prop改变导致刷新此hook的时候,上次hook的副作用就会被执行,清除掉上次的定时器.

