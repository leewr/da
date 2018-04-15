<template>
  <div>
    <span>click me</span>
  </div>
</template>

<script>
// import Toast from '@/components/Toast/Toast'
export default {
  name: 'toastPage',
  components: {
  },
  created () {
    console.log(this.$toast)
    this.$toast('this is toast')
    this.$toast('this is a new toast')
  }
}
</script>
