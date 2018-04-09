<template>
  <div class="da-picker">
    <div class="da-picker__toolbar" v-if="showToolbar">
      <slot>
        <div class="da-picker__cancle">{{cancelButtonText}}</div>
        <div class="da-picker__text">{{title}}</div>
        <div class="da-picker__confirm">{{confirmButtonText}}</div>
      </slot>
    </div>
    <div class="da-picker__column">
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
    }
  },
  data() {
    return {
      currentColumns: []
    }
  },
  computed: {
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
    onChange(columnIndex) {
      console.log(columnIndex)
    },
    valueKey () {
      console.log('1')
    }
  }
}
</script>
<style lang="scss">
.da-picker{
  .da-picker__toolbar{
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border: 1px solid #e5e5e5;
    border-left: 0;
    border-right: 0;
    .da-picker__cancle,
    .da-picker__confirm{
      color: #38f;
      padding: 0 15px;
    }
  }
}
</style>
