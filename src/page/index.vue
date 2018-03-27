<template>
  <pullRefresh  v-model="isLoading" @refresh="onRefresh">
      <div>pullRefresh</div>
  </pullRefresh>
</template>

<script>
import pullRefresh from '@/components/pull-refresh'
export default {
    name: 'index-demo',
    data () {
        return {
            isLoading: false
        }
    },
    components: {
        pullRefresh
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
