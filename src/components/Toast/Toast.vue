<template>
  <transition name="da-fade">
    <div class="da-toast">
      <!-- text only -->
      <div v-if="displayStyle === 'text'">{{message}}</div>
      <div v-if="displayStyle === 'html'" v-html="message"></div>
    </div>
  </transition>
</template>

<script>
const STYLE_LIST = ['succrss', 'fail', 'loading']
export default {
  name: 'Toast',
  props: {
    message: [String, Number],
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    displayStyle () {
      return STYLE_LIST.indexOf(this.type) !== -1 ? 'default' : this.type
    }
  }
}
</script>
