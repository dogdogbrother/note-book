## antd

`antd`的安装照着官网就行了,自定义主题色用的`craco`工具,环境搭建那章有写.

## emotion

[emotion官网在此](https://emotion.sh/docs/introduction),先安装下:
```
npm i @emotion/react @emotion/styled
```
可以看到安装的有2个工具,`@emotion/styled`用来创建`styled-component`,`@emotion/react`用来写行内样式.

### @emotion/styled 的用法
有2种传参的用法:
```tsx
import styled from '@emotion/styled'

const Button = styled.button<{
  primary: string
}>`
  color: ${props =>
    props.primary ? 'hotpink' : 'turquoise'};
`

const Container = styled.div(props => ({
  display: 'flex',
  flexDirection: props.column && 'column'
}))

render(
  <Container column>
    <Button>This is a regular button.</Button>
    <Button primary>This is a primary button.</Button>
  </Container>
)
```

还可以对非原生组件进行包装:
```tsx
import { Button } from "antd";
import styled from "@emotion/styled";

export const LongButton = styled(Button)`
  width: 100%;
`;
```





### emotion/react
`emotion/react`是加强了react的jsx,添加了css属性:
```tsx
/** @jsx jsx */
import { jsx } from '@emotion/react'

render(
  <div
    css={{
      backgroundColor: 'hotpink',
      '&:hover': {
        color: 'lightgreen'
      }
    }}
  >
    This has a hotpink background.
  </div>
)
```

::: tip 提示
要在文件顶层写上注释`/** @jsx jsx */`,指定编译工具.
:::

css属性除了可以写对象,还可以写模板字符串,需要引入`css`:
```tsx
/** @jsx jsx */
import { css, jsx } from '@emotion/react'

const color = 'darkgreen'

render(
  <div
    css={css`
      background-color: hotpink;
      &:hover {
        color: ${color};
      }
    `}
  >
    This has a hotpink background.
  </div>
)
```

## 背景图

有2张图片,需要固定在页面的左右两侧,不需要使用2个元素,一个元素就能搞定:
```tsx
import left from "assets/left.svg";
import right from "assets/right.svg";

const Background = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-position: left bottom, right bottom;
  background-size: calc(((100vw - 40rem) / 2) - 3.2rem),
    calc(((100vw - 40rem) / 2) - 3.2rem), cover;
  background-image: url(${left}), url(${right});
`;
```
2个知识点:
1. `background`可以放多张图片和属性,用`,`分割.
2. `background-attachment: fixed;`属性让背景图固定,不会随着元素固定而发现变化.

## rem 的设置

```css
html {
  font-size: 62.5%;
}
```
是因为根元素的字号是16px,`16*62.5%`为10px,也就是`1rem`等于`10px`,后续使用rem单位即可.
