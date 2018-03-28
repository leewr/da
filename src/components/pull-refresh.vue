<template>
  <div class="da-pull-refresh">
      <div class="da-pull-refresh__track"
        :style="style"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        @touchcancel="onTouchEnd"
        >
        <div class="da-pull-refresh__head"></div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
import scrollUtils from '@/utils/scroll'
export default {
    name: 'pull-refresh',
    props: {
        value: {
            type: Boolean,
            required: true
        },
        headHeight: {
            type: Number,
            default: 50
        },
        animationDuration: {
            type: Number,
            default: 300
        }
    },
    data () {
        return {
            status: 'normal',
            height: 0,
            duration: 0
        }
    },
    methods: {
        onTouchStart (evente) {
            this.duration = 0
            this.startX = event.touches[0].clientX
            this.startY = event.touches[0].clientY
        },
        onTouchMove (event) {
            if (this.status === 'loading') return
            this.deltaY = event.touches[0].clientY - this.startY
            // this.deltaX = event.touches[0].clientX - this.startX
            this.direction = this.getDirection(event.touches[0])

            if (this.deltaY >= 0) {
                if (this.direction === 'vertical') {
                    console.log(this.deltaY)
                    this.getStatus(this.ease(this.deltaY))
                    event.preventDefault()
                }
            }
        },
        onTouchEnd (event) {
            console.log(this.deltaY)
            if (this.deltaY) {
                this.duration = this.animationDuration
                console.log(this.status)
                if (this.status === 'loosing') {
                    this.getStatus(this.headHeight, true)
                    this.$emit('input', true) // 通过$emit('input')改变data的值 触发v-model 中 的值改变
                    this.$emit('refresh')
                } else {
                     this.getStatus(0)
                }
            }
        },
        getDirection (touches) {
            const distanceX = Math.abs(touches.clientX - this.startX)
            const distanceY = Math.abs(touches.clientY - this.startY)
            return distanceY - distanceX > 0 ? 'vertical' : distanceY - distanceX < 0 ? 'horizontal' : ''
        },
        getStatus (height, isLoading) {
            this.height = height
            const status = isLoading
                ? 'loading' : height === 0
                    ? 'normal' : height < this.headHeight
                        ? 'pulling' : 'loosing'
            console.log(isLoading)
            if (status !== this.status) {
                this.status = status
            }
        },
        getCeiling () {
            this.ceiling = scrollUtils.getScrollTop(this.scrollEl) === 0
            return this.ceiling
        },
        ease (height) {
            const { headHeight } = this
            return height < headHeight
                ? height
                : height < headHeight * 2
                    ? Math.round(headHeight + (height - headHeight) / 2)
                    : Math.round(height * 1.5 + (height - headHeight * 2) / 4)
        }
    },
    computed: {
        style () {
            return {
                transition: `${this.duration}ms`,
                transform: `translate3d(0,${this.height}px, 0)`
            }
        }
    },
    watch: {
        value(val) {
            // debugger;
            this.duration = this.animationDuration
            this.getStatus(val ? this.headHeight : 0, val)
        }
    },
    mounted () {
        console.log(this.value)
        this.scrollEl = scrollUtils.getScrollEventTarget(this.$el)
    }
}
</script>
