<template>
  <div class="da-pull-refresh">
      <div class="da-pull-refresh__track"
        :style="style"
        @touchstart="onTouchStart"
        @touchmove="onTouchMove"
        @touchend="onTouchEnd"
        >
        <div class="da-pull-refresh__head"></div>
        <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'pull-refresh',
    props: {
        headHeight: {
            type: Number,
            default: 50
        },
        animationDuration: {
            type: Number,
            default: 300
        },
        value: {
            type: Boolean,
            require: true
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
            this.deltaY = event.touches[0].clientY - this.startY
            // this.deltaX = event.touches[0].clientX - this.startX
            this.direction = this.getDirection(event.touches[0])
            if (this.deltaY >= 0) {
                if (this.direction === 'vertical') {
                    this.getStatus(this.ease(this.deltaY))
                    event.preventDefault()
                }
            }
        },
        onTouchEnd (event) {
            console.log(this.deltaY)
            if (this.deltaY) {
                this.duration = this.animationDuration
                console.log(this.duration)
                if (this.status === 'loosing') {
                    this.getStatus(this.headHeight, true)
                    // this.$emit('input', true)
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
                    ? 'normal' : height < this.headHeight ? 'pulling' : 'loosing'
            if (status !== this.status) {
                this.status = status
            }
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
        value (val) {
            console.log(val)
            this.duration = this.animationDuration
            this.getStatus(val ? this.headHeight : 0, val)
        }
    },
    mouted () {
    }
}
</script>
