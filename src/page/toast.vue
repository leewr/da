<template>
  <div>
    <span>click me</span>
    <Toast></Toast>
  </div>
</template>

<script>
import Toast from '@/components/Toast/Toast'
export default {
  name: 'toastPage',
  components: {
    Toast
  },
  created () {
    console.log(this.$toast)
  }
}
</script>
