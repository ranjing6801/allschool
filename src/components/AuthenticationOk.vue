<template>
    <div id="authentication">  
      <div v-if="isIOS" class="ios">
        <div class="content" slot="header">
            <p class="p-img"><img src="/static/images/smile.png" alt=""></p>
            <p class="title">反馈成功</p>
            <p class="title1">我们将尽快处理,请耐心等候</p>
        </div>
        <div class="footer">
            <p class="footerTip">您可以先使用【小黑板】，体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
      </div>
      <div v-if="isAND" class="android">
        <div class="content2">
            <p class="title">反馈成功</p>
            <p class="title1">我们将尽快处理,请耐心等候</p>
        </div>
        <div class="footer2">
            <p class="footerTip">您可以使用「小黑板」,体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
        <div class="img">
            <img src="/static/images/and.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'authentication',
    data(){
        return{
          isIOS: true,
          isAND: false
        }
    },
    methods:{
        openSmallDesk(){
            // 打开小黑板
            alert("打开小黑板")
        }
    },
    created() {
        document.title = "反馈成功"
    },
    mounted() {
      //判断手机类型
      var ua = navigator.userAgent.toLowerCase();

      if(/android/.test(ua)){
          console.log('android...');
          this.isAND = true;
          this.isIOS = false;
        }

      if(/iphone|ipad|ipod/.test(ua)){
          console.log('ios...');
          this.isIOS = true;
          this.isAND = false;
        }
    }
}
</script>

<style scoped>

#authentication {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.content {
  width: 100%;
  height: 100%;
}
.content2{
  width: 100%;
  height: 100%;
}

.footer {

}
.footer .footerTip {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
  text-align: center;
}
.footer2{
  
}
.footer2 .footerTip{
  color: #AAAAAA;
  font-size: 0.1867rem;
  text-align: center;
  font-family: PingFangSC-Light;
}



.btn {
  width: 9.2rem;
  height: 1.28rem;
  line-height: 1.28rem;
  color: #000000;
  background: #F8E71C;
  font-size: 0.4533rem;
  border-radius: 0.0533rem;
  text-align: center;
  font-family: PingFangSC-Regular;
}
.img{
  text-align: center;
}
.p-img{
  text-align: center;
}
.p-img img{
  width: 1.6rem;
  height: 1.6rem;
}
.title{
  color: #FFFFFF;
  font-size: 0.5333rem;
  line-height: 0.4533rem;
  text-align: center;
  font-family: PingFangSC-Light;
}
.title1{
  color: #FFFFFF;
  font-size: 0.5333rem;
  line-height: 0.4533rem;
  text-align: center;
  font-family: PingFangSC-Light;
}


</style>


