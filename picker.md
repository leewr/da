# picker ui 组件
首先我们需要思考规范组件的使用、提供那些可选参数、可响应哪些事件、以及提供哪些方法。

下面使用picker组件为例，来一步一步的完成自己的ui组件。

#### 项目使用vue框架、按照同样的思路当然也可以切换到react、angular

首先我们来思考picker组件的使用场景，常见的有城市选择、多列联动选择等场景。常常是用户点击一个按钮弹出背景框和picker组。初始化相关样式、数据后，用户操作pickerItem，滑动选择数据，选定后确认或者取消事件。我们可以看到大致就是这样一个过程。

下面我们来一步一步的完成这个组件，最后并不断完善。
# 使用
1、每次picker被用户改变值的时候change事件
2、组件接受的参数数组 colcumns ，数组可以简单的一元数组/也可能成员为对象的数组
3、有哪些可自定义的参数？ 如确定/取消/中间标题/是否显示toolbar等
哪些我们就先简单的列出组件的使用
```
  <picker 
    @change="onChange()" 
    :columns="columns" 
    :showToolbar="true" 
    :title="title">
  </picker>
```
# 组件html结构
先从最简单的开始我们需要一个picker展示的数据

先写组件的html结构,da-picker 是最外层，da-picker__toolbar是picker顶部的确定/取消按钮，da-column是picker外层里面包裹了pickerItem的数据项。da-iframe是picker选中的横条，固定位置的上下1px的横条。
```
<template>
  <div class="da-picker">
    <div class="da-picker__toolbar">
    </div>
    <div class="da-picker__column">
      <div>
        <ul>
          <li>item1</li>
          <li>item2</li>
          <li>item3</li>
        </ul>
      </div>
      <div class="da-iframe da-1pxborder--top-bottom"></div>
    </div>
  </div>
</template>
```
# 样式
在写一个ui组件的时候，样式库同样重要。这里先不对样式库进行处理，只是先将和picker组件相关的样式放在同一组件之内。
```
<style lang="scss">
  .da-picker{
    overflow: hidden;
    position: relative;
    .da-picker__toolbar{
      display: flex;
      justify-content: space-between;
    }
    .da-column{
      position: relative;
      overflow: hidden;
    }
    .da-iframe{
      left: 0;
      top: 0;
      width: 100%;
      position: absolute;
      transform: translateY(-50%);
      border: 1px 0;
    }
  }
  // 公共样式需要抽离出来
  [class*='da-1pxborder']::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    transform: scale(.5);
    pointer-event: none;
    border: 0px solid #e5e5e5;
  }
<style>
```
写完了页面结构和css后我们着重来思考整个组件的需要处理哪些事情。

# 数据初始化

```
<script>
export default {
  name: 'picker',
  props: {
    columns: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {

    }
  },
  methods: {
    initColumn () {
      // 数据类型判断
    }
  }
}
</script>
```

# 样式初始化

# 状态改变

# 用户操作

# 操作事件

# 修改完善




