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

<style scoped>
/*@import  '../assets/css/variables.scss';  
@import '../assets/css/modal.css';  */

#modal .title {
  font-size: 18px;
  padding-top: 20px;
  padding-left: 20px;
}

#modal .content {
  font-size: 18px;
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 20px;
  line-height: 2;
  text-align: center;
}

#modal .btn {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 60%;
  height: 50px;
  margin-left: 20%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 50px;
}


/*# sourceMappingURL=modal.css.map */


</style>


