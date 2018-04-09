<template>
  <div
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd">
    <ul
      :style="calcWrapStyle"
    >
      <li v-for="item in options" :key="item">{{item}}</li>
    </ul>
  </div>
</template>

<script>
const DURATIONtIME = 200
const range = (num, arr) => Math.min(Math.max(num, arr[0]), arr[1])
export default {
  name: 'pickerItem',
  props: {
    options: {
      type: Array,
      default: () => []
    },
    itemHeight: Number,
    defaultIndex: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      currentIndex: this.defaultIndex,
      duration: 0,
      startOffset: 0,
      offset: 0,
      startY: 0
    }
  },
  computed: {
    count () {
      return this.options.length
    },
    baseOffset () {
      return this.itemHeight * (this.options.length - 1) / 2
    },
    calcWrapStyle () {
      return {
        lineHeight: `${this.itemHeight}px`,
        transition: `${this.duration}ms`,
        transform: `translate3d(0, ${this.offset + this.baseOffset}px, 0)`
      }
    }
  },
  watch: {
  },
  methods: {
    onTouchStart (event) {
      this.startY = event.touches[0].clientY
      this.startOffset = this.offset
      this.duration = 0
    },
    onTouchMove (event) {
      const deltaY = event.touches[0].clientY - this.startY
      this.offset = range(this.startOffset + deltaY, [
        -(this.count * this.itemHeight),
        this.itemHeight
      ]) // 可拉动的范围 向下拉最多一个itemHeight 下上最大距离为 -count * itemHeight
    },
    onTouchEnd () {
      console.log('move')
      this.duration = DURATIONtIME
      const index = range(Math.round(-this.offset / this.itemHeight), [0, this.count - 1])
      this.setIndex(index, true)
    },
    setIndex (index, userAction) {
      this.offset = -index * this.itemHeight
      if (index !== this.currentIndex) {
        this.currentIndex = index
        userAction && this.$emit('change', index)
      }
    }
  },
  created() {
  },
  mounted() {
    this.setIndex(this.currentIndex)
  }
}
</script>
