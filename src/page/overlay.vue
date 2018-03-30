<template>
  <div class="box">
      <div class="boxwrap">
      </div>
      <div class="layercontext"></div>
  </div>
</template>
<script>
export default {
  data () {
        return {
            dataNum: [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7, 2, 3, 4, 5, 6, 7]
        }
    }
}
</script>

<style lang="scss">
body{
    overflow: hidden;
}
    .box{
        height: 1200px;
        .layercontext{
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #fff;
            border-radius: 6px;
            z-index: 11;
            height: 140px;
            width: 80%;
            height: 60px;
        }
    }
    .layerbg{
            background: rgba(0, 0, 0, 0.8);
            position: fixed;
            left:0;
            top:0;
            right: 0;
            bottom: 0;
            z-index: 10;
            overflow: hidden;
        }
</style>
