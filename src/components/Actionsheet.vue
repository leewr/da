<template>
  <div class="da-actionsheet">
  </div>
</template>

<script>
export default {
  name: 'actionsheet',
  props: {
      value: {
          type: Boolean,
          required: true
      },
      actions: {
          type: Array
      },
      title: {
          type: String,
          default: ''
      },
      'cancel-text': {
          type: String,
          default: ''
      },
      overlay: {
          type: Boolean,
          default: ''
      }
  }
}
</script>

