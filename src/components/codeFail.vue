<template>
    <!-- 获取验证码失败 -->
  <div id="codeFailModal">
      <p class="title">验证码发送失败</p>
      <p class="content">验证码发送失败, 请稍后重试</p>
      <button class="btn" @click="codeFailKnow">我知道啦</button>
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
          this.$emit("codeFailChange",true)
      }
  }
}
</script>
<style scoped>

#codeFailModal {
  height: 100%;
  width: 100%;
}

#codeFailModal .title {
  font-size: 16px;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: bold;
}

#codeFailModal .content {
  font-size: 18px;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 20px;
  line-height: 2;
  text-align: center;
}

#codeFailModal .btn {
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 50%;
  height: 40px;
  margin-left: 25%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 80px;
  border:none;
}



</style>