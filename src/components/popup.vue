/*
 * @Desc: 
 * @Author: Aleewr 
 * @Date: 2018-04-03 11:55:18 
 */

<template>
  <transition :name="currentTransition">
      <div class="da-popup" v-show="value" :class="{[`da-popup--${position}`]: position}">
          <slot/>
      </div>
  </transition>
</template>

<script>
export default {
    name: 'popup',
    minins: [Popup],
    props: {

    },
    data () {
        const transition = this.transition || (this.position === '' ? 'van-fade' : `popup-slide-${this.position}`)
        return {
            currentTransition: transition
        }
    }
}
</script>

