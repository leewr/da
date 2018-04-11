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
    <div class="da-picker__column" :style="calcHeight">
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
    },
    count: {
      type: Number,
      default: 5
    }
  },
  data () {
    return {
      isSimple: false
<<<<<<< HEAD
=======
    }
  },
  computed: {
    isSimple () {
      return this.columns.length && !this.columns[0].values
>>>>>>> fa5dc7816302ded1973ee00a13978b271fb3fb55
    }
  }
  created () {
    this.initColumn()
  },
  computed: {
    isSimple () {
      return this.columns.length && !this.columns[0].values
    }
  }
  created () {
    this.initColumn()
  },
  methods: {
    initColumn () {
      // 数据类型判断初始化结构数据
      const column = this.isSimple ? [{'values': this.columns}] : columns
    }
  }
}
</script>
```

# 样式初始化
```
computed: {
  calcHeight () {
    return {
      height: (this.count - 1) * this.itemHeight // props itemHeight
    }
  }
}
```
初始化样式后将高度添加到da_columns 上。
<<<<<<< HEAD
<<<<<<< HEAD

下面我们将pickerItem渲染的内容抽象出来为单独的组件。这时我们修改picker的组件为
```
<template>
  <div class="da-picker">
    <div class="da-picker__toolbar">
    </div>
    <div class="da-picker__column" :style="calcHeight">
      <pickItem :column="column"></pickItem>
      <div class="da-iframe da-1pxborder--top-bottom"></div>
    </div>
  </div>
</template>
```


```
<template>
  <div>
    <ul>
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
  </div>
</template>
```
为上面的html添加上数据、以及需要的touch相关事件.
```
<template>
  <div>
    <ul 
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <li v-for="item in options" :key="item">{{item}}</li>
    </ul>
  </div>
</template>
```

# 状态改变
其中最核心的就是每次pickerItem的改变。我们给每一个Item一个index，setIndex(index, userAction) 为核心状态改变函数，userAction 为用户手动点击触摸选择改变,为用户触发一个change事件。
setIndex (index, userAction) {
  this.offset = - index * this.itemHeight
  if(index !== this.currentIndex) {
    userAction && this.$emit('change', index)
  }
}
这样我们得到了picker最核心的一个方法。下面我们来分析每一次index改变时候需要进行的样式位置计算。

1、初始化时候ul元素会有一个初始化baseOffset。随后每次index的改变ui的offset都为 offset + baseOffset。
2、那么重点就是如何计算offset。
    我们每次操作的时候touchStart 需要记录当前的 firstOffset 
    然后是touchMove移动的deltaY 此时offset = firstOffset + deltaY
    最后touchEnd结束的时候 通过offset的值计算出index，最后调用setIndex(index, userAction)

# 用户操作
```
onTouchStart (event) {
  this.startY = event.touches[0].clientY
  this.firstOffset = this.offset
  this.duration = 0
},
onTouchMove (event) {
  const deltaY = event.touches[0].clientY - this.startY
  this.offset = range(this.firstOffset + deltaY, [- this.itemHeight * this.count, this.itemHeight ]) // 最大offset 范围需要注意，ul 高度为 (this.count - 1) * this.itemHeight ,由于在前面已经对位置进行了初始化，ul上下可偏移的位置为自身位置加上一个itemHeight
},
onTouchEnd (event) {
  this.duration = 200
  const index = rang(Math.round(this.offset / this.itemHeight), [0, this.count - 1])
  this.setIndex(index, true)
}

```
通过touchStart获取初始化的位置，以及当前firstOffset，touchMove的时候计算this.offset的位置，并且限制最大滑动范围。最后通过touchEnd 计算出滑动后的Index，调用setIndex以及duration时间完成切换

未完
=======

下面我们将pickerItem渲染的内容抽象出来为单独的组件。这时我们修改picker的组件为
```
<template>
  <div class="da-picker">
    <div class="da-picker__toolbar">
    </div>
    <div class="da-picker__column" :style="calcHeight">
      <pickItem :column="column"></pickItem>
      <div class="da-iframe da-1pxborder--top-bottom"></div>
    </div>
  </div>
</template>
```

>>>>>>> fa5dc7816302ded1973ee00a13978b271fb3fb55

```
=======

下面我们将pickerItem渲染的内容抽象出来为单独的组件。这时我们修改picker的组件为
```
<template>
  <div class="da-picker">
    <div class="da-picker__toolbar">
    </div>
    <div class="da-picker__column" :style="calcHeight">
      <pickItem :column="column"></pickItem>
      <div class="da-iframe da-1pxborder--top-bottom"></div>
    </div>
  </div>
</template>
```


```
>>>>>>> fa5dc7816302ded1973ee00a13978b271fb3fb55
<template>
  <div>
    <ul>
      <li>item1</li>
      <li>item2</li>
      <li>item3</li>
    </ul>
  </div>
</template>
```
为上面的html添加上数据、以及需要的touch相关事件.
```
<template>
  <div>
    <ul 
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <li v-for="item in options" :key="item">{{item}}</li>
    </ul>
  </div>
</template>
```
<<<<<<< HEAD

# 状态改变
其中最核心的就是每次pickerItem的改变。我们给每一个Item一个index，setIndex(index, userAction) 为核心状态改变函数，userAction 为用户手动点击触摸选择改变,为用户触发一个change事件。
```
setIndex (index, userAction) {
  this.offset = - index * this.itemHeight
  if(index !== this.currentIndex) {
    userAction && this.$emit('change', index)
  }
}
```
这样我们得到了picker最核心的一个方法。下面我们来分析每一次index改变时候需要进行的样式位置计算。

- 初始化时候ul元素会有一个初始化baseOffset。随后每次index的改变ui的offset都为 offset + baseOffset。
- 那么重点就是如何计算offset。
  - 我们每次操作的时候touchStart 需要记录当前的 firstOffset 
   - 然后是touchMove移动的deltaY 此时offset = firstOffset + deltaY
   - 最后touchEnd结束的时候 通过offset的值计算出index，最后调用setIndex(index, userAction)

# 用户操作
```
onTouchStart (event) {
  this.startY = event.touches[0].clientY
  this.firstOffset = this.offset
  this.duration = 0
},
onTouchMove (event) {
  const deltaY = event.touches[0].clientY - this.startY
  this.offset = range(this.firstOffset + deltaY, [- this.itemHeight * this.count, this.itemHeight ]) // 最大offset 范围需要注意，ul 高度为 (this.count - 1) * this.itemHeight ,由于在前面已经对位置进行了初始化，ul上下可偏移的位置为自身位置加上一个itemHeight
},
onTouchEnd (event) {
  this.duration = 200
  const index = rang(Math.round(this.offset / this.itemHeight), [0, this.count - 1])
  this.setIndex(index, true)
}

```
通过touchStart获取初始化的位置，以及当前firstOffset，touchMove的时候计算this.offset的位置，并且限制最大滑动范围。最后通过touchEnd 计算出滑动后的Index，调用setIndex以及duration时间完成切换

=======

# 状态改变
其中最核心的就是每次pickerItem的改变。我们给每一个Item一个index，setIndex(index, userAction) 为核心状态改变函数，userAction 为用户手动点击触摸选择改变,为用户触发一个change事件。
```
setIndex (index, userAction) {
  this.offset = - index * this.itemHeight
  if(index !== this.currentIndex) {
    userAction && this.$emit('change', index)
  }
}
```
这样我们得到了picker最核心的一个方法。下面我们来分析每一次index改变时候需要进行的样式位置计算。

- 初始化时候ul元素会有一个初始化baseOffset。随后每次index的改变ui的offset都为 offset + baseOffset。
- 那么重点就是如何计算offset。
  - 我们每次操作的时候touchStart 需要记录当前的 firstOffset 
   - 然后是touchMove移动的deltaY 此时offset = firstOffset + deltaY
   - 最后touchEnd结束的时候 通过offset的值计算出index，最后调用setIndex(index, userAction)

# 用户操作
```
onTouchStart (event) {
  this.startY = event.touches[0].clientY
  this.firstOffset = this.offset
  this.duration = 0
},
onTouchMove (event) {
  const deltaY = event.touches[0].clientY - this.startY
  this.offset = range(this.firstOffset + deltaY, [- this.itemHeight * this.count, this.itemHeight ]) // 最大offset 范围需要注意，ul 高度为 (this.count - 1) * this.itemHeight ,由于在前面已经对位置进行了初始化，ul上下可偏移的位置为自身位置加上一个itemHeight
},
onTouchEnd (event) {
  this.duration = 200
  const index = rang(Math.round(this.offset / this.itemHeight), [0, this.count - 1])
  this.setIndex(index, true)
}

```
通过touchStart获取初始化的位置，以及当前firstOffset，touchMove的时候计算this.offset的位置，并且限制最大滑动范围。最后通过touchEnd 计算出滑动后的Index，调用setIndex以及duration时间完成切换

>>>>>>> fa5dc7816302ded1973ee00a13978b271fb3fb55
未完

# 操作事件

# 修改完善