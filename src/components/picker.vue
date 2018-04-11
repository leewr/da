<template>
  <div class="da-picker">
    <div class="da-picker__toolbar" v-if="showToolbar">
      <slot>
        <div class="da-picker__cancel" @click="emit('cancel')">{{cancelButtonText}}</div>
        <div class="da-picker__text">{{title}}</div>
        <div class="da-picker__confirm" @click="emit('confirm')">{{confirmButtonText}}</div>
      </slot>
    </div>
    <div class="da-picker__columns" @touchmove.prevent :style="columnsStyle">
      <PickerColumn
        v-for="(item, index) in currentColumns"
        :key="index"
        :value-key="valueKey"
        :options="item.values"
        :itemHeight="itemHeight"
        @change="onChange(index)"
      >
      {{item}}
      </PickerColumn>
      <div class="da-picker__frame da-hairline--top-bottom" :style="frameStyle"></div>
    </div>
  </div>
</template>
<script>
import PickerColumn from './pickerItem'
export default {
  name: 'dapicker',
  props: {
    showToolbar: false,
    cancelButtonText: {
      default: '取消'
    },
    confirmButtonText: {
      default: '确定'
    },
    title: {
      type: String,
      default: ''
    },
    columns: {
      type: Array,
      default: () => []
    },
    itemHeight: {
      type: Number,
      default: 44
    },
    visibleItemCount: {
      type: Number,
      default: 5
    }
  },
  data() {
    return {
      currentColumns: []
    }
  },
  computed: {
    columnsStyle () {
      return {
        height: this.itemHeight * this.visibleItemCount + 'px'
      }
    },
    frameStyle () {
      return {
        height: this.itemHeight + 'px'
      }
    }
  },
  created () {
    this.initColumns()
  },
  components: {
    PickerColumn
  },
  methods: {
    initColumns () {
      const isSimpleColumn = this.columns.length && !this.columns[0].values
      this.currentColumns = isSimpleColumn ? [{'values': this.columns}] : this.columns
      console.log(this.currentColumns)
    },
    emit(event) {
      console.log(event)
      this.$emit(event, this)
      if (this.isSimpleColumn) {
        this.$emit(event, this.getColumnValue(0), this.getColumnIndex(0))
      } else {
        this.$emit(event, this.getValues(), this.getIndexs())
      }
    },
    onChange(columnIndex) {
      console.log(columnIndex)
    },
    valueKey () {
      console.log('1')
    },
    columnStyle () {
      console.log(1)
    },
    // 获取index列数据
    getColumn(index) {
      return this.children[index]
    },
    // 获取某列的值
    getColumnValue(index) {
      return (this.getColumn(index) || {}).currentValue
    },
    getValues() {
      return this.children.map(child => child.currentValue)
    }
  }
}
</script>
<style lang="scss">
.da-picker{
  overflow: hidden;
  user-select: none;
  position: relative;
  .da-picker__toolbar{
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    border-left: 0;
    border-right: 0;
    .da-picker__cancel,
    .da-picker__confirm{
      color: #38f;
      padding: 0 15px;
    }
  }
  .da-picker__columns{
    position: relative;
    overflow: hidden;
  }
  .da-hairline--top-bottom{

  }
  .da-picker__frame{
    top: 50%;
    left: 0;
    position: absolute;
    width: 100%;
    transform: translateY(-50%);
    pointer-events:none
  }
  .da-hairline--top-bottom::after {
    border-width: 1px 0;
  }
}
[class*='da-hairline']::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 200%;
    -webkit-transform: scale(.5);
    transform: scale(.5);
    -webkit-transform-origin: 0 0;
    transform-origin: 0 0;
    pointer-events: none;
    box-sizing: border-box;
    border: 0 solid #e5e5e5;
}
</style>
