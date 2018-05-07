<template>
    <div id="authentication">  
      <div v-if="isIOS" class="ios">
        <div class="content" slot="header">
            <p class="p-img"><img src="../../static/images/smile.png" alt=""></p>
            <p class="title">反馈成功</p>
            <p class="title1">我们将尽快处理，请耐心等候</p>
        </div>
        <div class="footer">
            <p class="footerTip">您可以先使用【晓黑板】，体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开晓黑板</div>
            <p class="tip">如已下载直接在手机中打开</p>
        </div>
      </div>
      <div v-if="isAND" class="android">
        <div class="content2">
            <p class="p-img"><img src="../../static/images/smile.png" alt=""></p>
            <p class="title">反馈成功</p>
            <p class="title1">我们将尽快处理，请耐心等候</p>
        </div>
        <div class="footer2">
            <p class="footerTip">您可以先使用【晓黑板】，体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk1">打开晓黑板</div>
            <p class="tip">如已下载直接在手机中打开</p>
        </div>
      </div>

       
      <!-- 安卓手机 遮罩层  -->

      <div class="overlay" v-if="mask">
          <img class="arrow" src="../../static/images/arrow.png">
      </div>
      
    </div>
</template>

<script>
export default {
    name:'authentication',
    data(){
        return{
          isIOS: true,
          isAND: false,
          mask:false    // 遮罩层
        }
    },
    methods:{
        openSmallDesk(){ // ios 下载
            //window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=org.xinkb.blackboard.android&g_f=991653';
            window.location.href = 'https://itunes.apple.com/cn/app/%E6%99%93%E9%BB%91%E6%9D%BF-%E5%A5%BD%E8%80%81%E5%B8%88%E7%9A%84%E5%A5%BD%E5%B7%A5%E5%85%B7/id1003713373?mt=8';
        },
        openSmallDesk1() { // android 下载
            var ua = navigator.userAgent.toLowerCase();
            // 打开晓黑板  http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              this.mask = true;
            }else{
              this.mask = false;
              window.location.href = 'http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk';
            }
            
            //window.location.href = 'http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk';
        }
    },
    created() {
        document.title = "反馈成功";
        //禁止返回
        var XBack = {};

        (function(XBack) {
          XBack.STATE = 'x - back';
          XBack.element;

          XBack.onPopState = function(event) {
            event.state === XBack.STATE && XBack.fire();
            XBack.record(XBack.STATE); //初始化事件时，push一下
          };

          XBack.record = function(state) {
            history.pushState(state, null, location.href);
          };

          XBack.fire = function() {
            var event = document.createEvent('Events');
            event.initEvent(XBack.STATE, false, false);
            XBack.element.dispatchEvent(event);
          };

          XBack.listen = function(listener) {
            XBack.element.addEventListener(XBack.STATE, listener, false);
          };

          XBack.init = function() {
            XBack.element = document.createElement('span');
            window.addEventListener('popstate', XBack.onPopState);
            XBack.record(XBack.STATE);
          };

        })(XBack); 

        XBack.init();
        XBack.listen(function() {});
        //判断手机类型
        var ua = navigator.userAgent.toLowerCase();
        // alert(ua);
        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              return;
            }else{
              window.location.href = 'http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk';
        }
        // if(/android/.test(ua)){
        //     console.log('android...');
        //     window.location.href = 'http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk';
        // }
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
/* 遮罩层*/
.overlay{
  position:fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  width:100%;
  height: 100%;
}
.arrow{
  width: 3.5rem;
  position:absolute;
  right: 1rem;
  top: 0.8rem;
}
/* 遮罩层*/


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
.footerTip {
  color: #AAAAAA;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin-bottom: 0.2667rem;
  text-align: center;
  font-family: PingFangSC-Light;
  margin-top: 2.4rem;
}
.btn {
  width: 9.2rem;
  height: 1.28rem;
  font-size: 0.4533rem;
  line-height: 1.28rem;
  border-radius: 0.0533rem;
  margin: 0 auto 0.2667rem;
  color: #000000;
  background: #F8E71C;
  text-align: center;
  font-family: PingFangSC-Regular;
}
.tip{
  font-size: 0.3733rem;
  color: #AAAAAA;
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
  margin-top: 2.4rem;
}
.content .p-img img{
  width: 1.6rem;
  height: 1.6rem;
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
  text-align: center;
  font-family: PingFangSC-Light;
}
.content2 .title1{
  color: #aaa;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin-bottom: 0.2667rem;
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


