<template>
  <div class="da-list">
      <slot />
      <div class="da-list__loading" v-show="loading">
          loading
      </div>
  </div>
</template>

<script>
export default {
  name: 'list',
  model: {
      prop: 'loading'
  },
  props: {
      loading: Boolean,
      finished: Boolean,
      immediateCheck: {
          type: Boolean,
          default: true,
      },
      offset: {
          type: String,
          default: 300
      }
  },

  mounted () {

  },
  destoryed () {
    this.handler(false)
  },
  activated () { // keep-alive 组件被激活时候调用
    this.handler(true)
  },
  deactivated () { //keep-alive 组件停用时调用
    this.handler(false)
  },
  watch: {
		loading () {
				this.$nextTick(this.onScroll)
		},
		finished () {
				this.$nextTick(this.onScroll)
		}
  },
  methods: {
    onScroll () {
        if (this.loading || this.finished) {
            return
        }
        
    }
  }
}
</script>
s