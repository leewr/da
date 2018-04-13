# 组件规划 可接收参数
```
props: {
  // 是否显示popup
  value: Boolean,
  // 是否显示overlay
  overlay: Boolean,
  closeOnclick: Boolean,
  zIndex: 1000, // 层级
  lockScroll: true
}
```
# 数据监听
watch: {
  value(): {
    if(this.value) {
      this.open()
    } else {
      this.close()
    }
  }
}
# 初始化
```
created() {
  // 处理弹层key值
  const key = context.plusKey()
  if (this.value) {
    this.open()
  }
},
methods: {
  open() {
    if (this.$isServe) {
      return
    }
    this.renderOverlay()
    if (this.loclScroll) {
      // ...
    }
    this.move()
  },
  move() { // move的作用将popup添加到body 、getContainer下
    
  },
  close() {

  }
}

```