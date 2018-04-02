<template>
    <!-- 获取语音验证码 -->
  <div id="modal" @click="know">
      <h5 class="title">{{ codeTitle }}</h5>
      <p class="content"> 
          我们将以电话的形式告知您验证码,你可能会接收到010、0051、024、029等开头的来电，请放心接听
      </p>
      <!-- <button class="clear">取消</button> -->
      <button class="btn" @click="know">我知道啦</button>
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
  padding-left: 20px;
}

#modal .content {
  font-size: 18px;
  margin-top: 40px;
  padding-left: 40px;
  padding-right: 25px;
  line-height: 2;
  text-align: center;
}

#modal .clear{
    border: none;
    font-size: 16px;
    background: #fff;
    height: 40px;
    width: 80px;
    margin-left: 30px;
    margin-right: 40px;
}
#modal .btn {
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 40%;
  height: 40px;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 50px;
  border:none;
}


/*# sourceMappingURL=modal.css.map */


</style>


