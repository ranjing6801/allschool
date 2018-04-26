<template>
  <div id="ReCertification">
        <p class="content">{{ accountTile}}</p>
        <p class=" title">{{ classTitle }}</p>
        <p class="saveTip">已被  <span class="name">{{ classUser }}</span>   老师认证过</p>
        <p class="replace">{{ accountReplace }}</p>
        <button class="Btn Btn-left" @click="giveUp">取消</button>
        <button class="Btn Btn-rigth" @click="Replace">顶替Ta</button>
  </div>
</template>

<script>
export default {
    name:'ReCertification',
    props:["accountTile","classTitle","classUser","accountReplace"],
    data(){
        return {

        }
    },
    methods:{
        giveUp(){  // 取消
            // 弹窗隐藏
            this.$emit("ReCertification",true)
        },
        Replace(){  // 顶替Ta
            // 请求接口
            alert("顶替Ta");
            console.log('res1=',this.$store.state.res1);
        }
    }
}
</script>
<style scoped>


#ReCertification {
    width: 8.9333rem;
    height: 6.16rem;
}


#ReCertification .content {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}
#ReCertification .title {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
  margin-top:0.5333rem;
}


#ReCertification .saveTip {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
}

#ReCertification .saveTip  .name {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color:#fff;
  line-height: 0.6933rem;
}

#ReCertification .replace {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
}
/**/
#ReCertification .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    line-height: 0.4533rem;
    border-radius: 0.0533rem;
    border: none;
    margin-top:0.6667rem;
}

#ReCertification .Btn-left{
   margin-left: 0.4rem;
}
#ReCertification .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
  margin-right: 0.4rem;
}

</style>


