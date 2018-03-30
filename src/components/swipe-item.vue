<template>
  <div class="da-swipe-item" :style="style">
    <slot />
  </div>
</template>

<style lang="scss">
    .da-swipe-item{
        float: left;
        width: 100%;
        height: 300px;
        background: #39a9ed;
        color: #fff;
        font-size: 40px;
    }
</style>

<script>
export default {
  name: 'swipe-item',
  data () {
      return {
          offset: 0
      }
  },
  computed: {
      style () {
          return {
              width: this.$parent.width + 'px',
              transform: `translate(${this.offset}px, 0)`
          }
      }
  },
  beforeCreate() {
      console.log(this)
      this.$parent.swipes.push(this)
  },
  destroyed() {
      this.$parents.swipes.splice(this.$parents.swipes.indexOf(this), 1)
  }
}
</script>
