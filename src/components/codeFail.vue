<template>
    <!-- 获取验证码失败 -->
  <div id="codeFailModal">
      <p class="title">验证码发送失败</p>
      <p class="content">验证码发送失败, 请稍后重试</p>
      <div class="btn" @click="codeFailKnow">我知道啦</div>
  </div>
</template>

<script>
export default {
  name:'codeFailModal',
  data(){
      return {

      }
  },
  methods:{
      codeFailKnow(){
          this.$emit("codeFailChange")
      }
  }
}
</script>
<style lang="scss" scoped>
@import  '../assets/css/variables.scss';  
@import '../assets/css/codeFail.css';  

</style>