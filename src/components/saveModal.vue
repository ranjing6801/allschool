<template>
    <!--  确认保存二维码弹窗 -->
    <div id="saveModal" @click="know">
        <p class="title">确认已保存</p>
        <p class="sure">请确保您已保存二维码</p>
        <p class="content">将用于发送给家长,邀请他们进班</p>
        <button class="Btn Btn-left" @click="know">去保存</button>
        <button class="Btn Btn-rigth" @click="saveOk">保存好了</button>
    </div>
</template>

<script>
export default {
    name:'saveModal',
    data(){
        return {

        }
    },
    methods:{
        know(){
            this.$emit("changeIsSaveModal")
        },
        saveOk(){
            if(sessionStorage.getItem('is_regular')){  // 老用户
                this.$router.push({path:'/passOk'});

            }else{  // 新用户
                this.$router.push({path:'/NewAuthenticationOk'})
            }
        }
    }
}
</script>

<style scoped>

#saveModal {
  width: 8.9333rem;
  height: 5.4667rem;
  background: #2B2B2B;
  border: 0.0267rem solid #BBAB71;
  border-radius: 0.2667rem;
  box-sizing: border-box;
}
#saveModal .title {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  margin-top: 0.5333rem;
  text-align: center;
}

#saveModal .content {
  width: 6.64rem;
  height: 1.3867rem;
  margin-left: 1.1467rem;
  margin-right: 1.1467rem;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
}
#saveModal .sure {
    margin-top: 0.5333rem;
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: 0.4533rem;
    color: #FFFFFF;
    line-height: 0.6933rem;
}

#saveModal  .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    line-height: 0.4533rem;
    border-radius: 0.0533rem;
    border: none;
}

.Btn-left{
   margin-left: 0.4rem;
}
#saveModal .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
}

</style>


