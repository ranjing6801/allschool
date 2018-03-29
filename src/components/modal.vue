<template>
    <!-- 获取语音验证码 -->
  <div id="modal" @click="know">
      <h5 class="title">{{ codeTitle }}</h5>
      <p class="content"> 我们会在短时间内拨打您的电话请注意接听语音验证码</p>
      <div class="btn" @click="know">我知道啦</div>
  </div>
</template>
<script>
export default {
    name:'modal',
    data(){
        return {
            
        }
    },
    props:{
        codeTitle:{
            type:String,
            default:"验证码"
        },
        telNumber:{
            type:String,
            default:"123"
        }
    },
    methods:{
        know(){
            this.$emit("listenModalHide")
        }
    }
}
</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';  
@import '../assets/css/modal.css';  

</style>


