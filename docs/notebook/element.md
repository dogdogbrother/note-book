## Button 按钮
```js
<el-button type="primary" plain disabled round size="small">全功能按钮</el-button>
```
* size  -- medium | small | mini
* type  -- primary | success | warning | danger | info | text

## Radio 单选
```vue
<template>
    <el-radio v-model="radio" label="1">备选项</el-radio>
    <el-radio v-model="radio" label="2">备选项</el-radio>
</template>
```

## Checkbox 多选
```vue
<template>
    <el-checkbox-group v-model="checkList">
        <el-checkbox label="复选框 A"></el-checkbox>
        <el-checkbox label="复选框 C"></el-checkbox>
        <el-checkbox label="禁用" disabled></el-checkbox>
        <el-checkbox label="选中且禁用" disabled></el-checkbox>
    </el-checkbox-group>
</template>
```
### indeterminate 状态, 全选/半选
```vue
<template>
    <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll"    @change="handleCheckAllChange">全选</el-checkbox>
</template>
```
* isIndeterminate -- `true`时半选状况,`false`为空.
* checkAll -- `true`时选中状况,`false`为空.

## Input 输入框
```vue
<template>
    <el-input v-model="input" placeholder="请输入内容"></el-input>
</template>
```
* disabled -- 为禁止输入。
* clearable -- 为可清空.
* show-password -- 可切换显示隐藏的密码框
### 文本域
```vue
<template>
    <el-input
    type="textarea"
    :rows="2"
    placeholder="请输入内容"
    v-model="textarea" />
</template>
```
* resize -- 控制是否能被用户缩放. none, both, horizontal, vertical
* autosize -- 自适应内容高度. boolean | { minRows: 2, maxRows: 6 }
### 复合型输入框
可通过 slot 来指定在 input 中前置或者后置内容
```vue
<template>
  <el-input placeholder="请输入内容" v-model="value" class="input-with-select">
    <el-select v-model="select" slot="prepend" placeholder="请选择">
        <el-option label="餐厅名" value="1"></el-option>
        <el-option label="订单号" value="2"></el-option>
    </el-select>
    <el-button slot="append" icon="el-icon-search"></el-button>
  </el-input>
</template>
```
* prepend 前置内容，append 后置内容。
* prefix 和 suffix，在输入框的首位处通过 `slot` 插入内容.(在输入框的内部展示).

## Select 选择器
```vue
<template>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
</template>
```
* disabled -- `<el-option />`和`<el-select />`都可有此属性禁用.
* multiple -- 是否多选.

## Cascader 级联选择器
```vue
<template>
  <el-cascader
    v-model="value"
    :options="options"
    @change="handleChange" />
<template>
```
```js
export default {
  data() {
    return {
      value: [],
      options: [
        {
          value: 'zhinan',
          label: '指南',
          children: [
            {
              value: 'shejiyuanze',
              label: '设计原则',
              children: [
                {
                  value: 'yizhi',
                  label: '一致'
                }
              ]
            }
          ]
        }
      ]
    }
}
```
* clearable -- 可清空.
* show-all-level -- 是否显示完整的路径,为 `false` 只显示最后一级.默认值 `true`.
### options 配置
* expandTrigger -- expandTrigger 次级菜单的展开方式,click | hover,默认click.
* multiple -- 多选.
* disabled -- 此选项禁止被选中.
* value | label | children -- 数据显示相关.
* leaf -- 如果某个 `options` 对象有 `leaf` 属性,就是叶节点了(默认leaf).

## Switch 开关
```vue
<template>
  <el-switch
    v-model="value"
    active-color="#13ce66"
    inactive-color="#ff4949">
  </el-switch>
</template>
```
* width -- switch的宽度(像素).number,默认40.
* active-text | inactive-text -- switch 打开时的文字描述 | switch 关闭时的文字描述.
* active-value -- switch 打开时的值,默认true.
* inactive-value -- switch 关闭时的值,默认false.
* active-color -- switch 打开时的背景色,默认true.
* inactive-color -- switch 关闭时的背景色,默认false.

## TimePicker 时间选择器
```vue
<template>
  <el-time-select
    v-model="value"
    :picker-options="{
      start: '08:30',
      step: '00:15',
      end: '18:30'
    }"
    placeholder="选择时间" />
    
  <el-time-picker />
</template>
```

* arrow-control -- 配置此属性后,选择时间的方式从滚轮到图标操作.
* default-value -- 选择器打开时默认显示的时间
* is-range -- 是否为时间范围选择
### picker-options 配置
* start | end -- 指定可选的起始时间和结束时间.
* step -- 步长.
使用 el-time-select 标签，分别通过`start`、`end`和s`tep`指定可选的起始时间、结束时间和步长.
* selectableRange --- '18:30:00 - 20:30:00',任意时间点.
* minTime | maxTime -- 最小(大)时间，小于该时间的时间段将被禁用


