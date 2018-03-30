<template>
  <swipe :autoplay="3000">
      <swipeItem>1</swipeItem>
      <swipeItem>2</swipeItem>
      <swipeItem>3</swipeItem>
  </swipe>
</template>

<script>
import swipe from '@/components/swipe'
import swipeItem from '@/components/swipe-item'
export default {
    name: 'index-demo',
    data () {
        return {
            isLoading: false
        }
    },
    components: {
        swipe,
        swipeItem
    },
    methods: {
        onRefresh () {
            setTimeout(() => {
                console.log('刷新成功')
                this.isLoading = false
                // this.count++;
            }, 500)
        }
    },
    computed: {
    },
    watch: {
    },
    mouted () {
    }
}
</script>
