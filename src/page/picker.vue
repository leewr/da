<template>
  <picker @change="onChange()" :columns="columns" :showToolbar="true" :title="title"></picker>
</template>

<script>
import picker from '@/components/picker'
export default {
    name: 'index-demo',
    data () {
        return {
            columns: ['杭州', '宁波', '温州', '嘉兴', '湖州'],
            title: '城市选择'
        }
    },
    components: {
        picker
    },
    methods: {
        onChange () {
            console.log(1)
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
