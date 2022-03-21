## input

### accept
当 `type="file"` 时,input成为了文件选择器, `accept`属性可以控制选择文件的格式,例如只支持 GIF 和 JPEG 两种图像:

```html
<input type="file" accept="image/gif, image/jpeg" />
```

如果想不限制图像的格式,可以写: `accept="image/*`.

### multiple
设置 `multiple="multiple"` 允许文件多选.