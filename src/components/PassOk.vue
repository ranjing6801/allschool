<template>
    <div id="passOk">
        <div v-if="isIOS" class="ios">
        <div class="content" slot="header">
            <p class="p-img"><img src="/static/images/v.png" alt=""></p>
            <p class="title">恭喜您成为校园认证用户</p>
            <p class="title1">现在起您可以免费享受【晓黑板】提供的增值服务</p>
        </div>
        <div class="footer">
            <div class="btn" @click="openSmallDesk">打开晓黑板</div>
        </div>
      </div>
      <div v-if="isAND" class="android">
        <div class="content2">
            <p class="p-img"><img src="/static/images/v.png" alt=""></p>
            <p class="title">恭喜您成为校园认证用户</p>
            <p class="title1">现在起您可以免费享受【晓黑板】提供的增值服务</p>
        </div>
        <div class="footer2">
            <div class="btn" @click="openSmallDesk">打开晓黑板</div>
        </div>
        <div class="img">
            <p><span class="line1">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>找对方法，下载更快捷<span class="line2">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></p>
            <img src="/static/images/android.png" alt="">
        </div>
      </div>
  </div>
</template>
<script>
export default {
    name:'passOK',
    data(){
        return{
          isIOS: true,
          isAND: false
        }
    },
    methods:{
        openSmallDesk(){
            // 打开晓黑板
            alert("打开晓黑板")
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
#passOk {
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
.btn {
  width: 9.2rem;
  height: 1.28rem;
  font-size: 0.4533rem;
  line-height: 1.28rem;
  border-radius: 0.0533rem;
  margin: 0 auto;
  color: #000000;
  background: #F8E71C;
  text-align: center;
  font-family: PingFangSC-Regular;
}
.img{
  text-align: center;
}
.img p{
  color: #AAAAAA;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin: 0.8rem 0 0.8rem 0;
  font-family: PingFangSC-Light;
}
.img img{
  width: 8.5867rem;
  height: 5.2533rem;
}
.p-img{
  text-align: center;
}
.content .p-img img{
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 2.4rem;
  margin-bottom: 0.4rem;
}
.content2 .p-img img{
  width: 1.6rem;
  height: 1.6rem;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
}
.title{
  color: #FFFFFF;
  font-size: 0.5333rem;
  line-height: 0.4533rem;
  margin-bottom: 0.2667rem;
  text-align: center;
  font-family: PingFangSC-Light;
}
.content .title1{
  color: #aaa;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin-bottom: 2.4rem;
  text-align: center;
  font-family: PingFangSC-Light;
}
.content2 .title1{
  color: #aaa;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin-bottom: 1.3333rem;
  text-align: center;
  font-family: PingFangSC-Light;
}
.line1,.line2{
  color: #888;
  width: 0.8rem;
  line-height: 0.3733rem;
  text-decoration: line-through;
  display: inline-block;
}
.line1{
  margin-right: 0.4rem;
}
.line2{
  margin-left: 0.4rem;
}



</style>


