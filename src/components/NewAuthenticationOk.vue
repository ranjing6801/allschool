<template>
    <!-- 新用户输入姓名认证成功   -->
    <div id="newauthentication">  
      <div v-if="isIOS" class="ios">
        <div class="content" slot="header">
            <p class="p-img"><img src="../../static/images/v.png" alt=""></p>
            <p class="title">恭喜您成为校园认证用户</p>
            <p class="title1">现在起您可以免费享受【晓黑板】提供的增值服务</p>
            <p class="title2">晓黑板账号密码<img src="../../static/images/left3.png" alt=">"><span @click="onOff=true">点击查看</span><img src="../../static/images/right3.png" alt="<">已通过短信发送给您</p>
        </div>
        <div class="footer">
            <div class="btn" @click="openSmallDesk">打开晓黑板</div>
            <p class="tip">如已下载直接在手机中打开</p>
        </div>
      </div>
      <div v-if="isAND" class="android">
        <div class="content2">
            <p class="p-img"><img src="../../static/images/v.png" alt=""></p>
            <p class="title">恭喜您成为校园认证用户</p>
            <p class="title1">现在起您可以免费享受【晓黑板】提供的增值服务</p>
            <p class="title2">晓黑板账号密码<img src="../../static/images/left3.png" alt=">"><span @click="onOff=true">点击查看</span><img src="../../static/images/right3.png" alt="<">已通过短信发送给您</p>
        </div>
        <div class="footer2">
            <div class="btn" @click="openSmallDesk1">打开晓黑板</div>
            <p class="tip">如已下载直接在手机中打开</p>
        </div>
      </div>
      
      <!-- 安卓手机 遮罩层  -->

      <div class="overlay" v-if="mask">
          <img class="arrow" src="../../static/images/arrow.png">
      </div>



      <!-- 查看密码 -->
      <div class="codeFail" v-if="onOff" @click="closeBox" >
        <div class="pushfail">
            <div id="codeFailModal" >
              <p class="title">晓黑板账号密码</p>
              <p class="content-p">账号: {{account}}</p>
              <p class="content-p">密码: {{password}} (默认手机号后6位)</p>
              <div class="btn" @click="closeBox">我知道啦</div>
            </div>
        </div>
      </div>

       <!--  重复验证弹窗 -->
      <div class="reVolidateModal" v-if="reVolidate" >
          <div class="reVolidate">
              <div id="modal">
                  <p class="titleListen">请勿重复认证</p>
                  <p class="contentListen"> 
                      您已是认证用户,请勿重复认证
                  </p>
                  <button class="Btn" @click="knowing">我知道啦</button>
              </div>
          </div>
      </div>
    </div>
</template>
<script>
import pwdModal from './pwdModal'
import $ from 'jquery'
export default {
    name:'newauthentication',
    data(){
        return{
          isIOS: true,
          isAND: false,
          onOff: false,
          reVolidate:false,
          account: '',
          password: '',
          mask:false    // 遮罩层
        }
    },
    methods:{
        openSmallDesk() {  // ios 
            // 打开晓黑板  http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk
            //window.location.href = 'http://a.app.qq.com/o/simple.jsp?pkgname=org.xinkb.blackboard.android&g_f=991653';
            window.location.href = 'https://itunes.apple.com/cn/app/%E6%99%93%E9%BB%91%E6%9D%BF-%E5%A5%BD%E8%80%81%E5%B8%88%E7%9A%84%E5%A5%BD%E5%B7%A5%E5%85%B7/id1003713373?mt=8';
        },
        openSmallDesk1() { // android
            // 打开晓黑板  http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk
            var ua = navigator.userAgent.toLowerCase();
            // 打开晓黑板  http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){
              this.mask = true;
            }else{
              this.mask = false;
            }
        },
        closeBox() {
          this.onOff = false;
        },
        forbiddenReback(){
          this.reVolidate = true;
        },
        knowing(){
          this.reVolidate = false;
        },
        downLoad(){  // 下载晓黑板 地址
            // this.axios.post('https://www.xiaoheiban.cn/admin-Apk-findNew')
            //     .then(res => {
            //       console.log('res=',res);
            //     })
            //     .catch(err => {
            //       console.log('err=',err);
            //     })

            // $.ajax({
            //   type:'get',
            //   url:'https://www.xiaoheiban.cn/admin-Apk-findNew',
            //   success(response){
            //       console.log(response);
            //   }
            // })

                
        }
    },
    created(){
        document.title = "认证成功";
        //this.downLoad();

        //判断手机类型
      
        var ua = navigator.userAgent.toLowerCase();

        //alert(ua);

        if(/android/.test(ua)){
            console.log('android...');
            window.location.href = 'http://apk-1252817547.file.myqcloud.com/blackboard_xiaoheiban_4026.apk';
          }

    },
    mounted() {
      
      //默认用户名密码
      if(sessionStorage.getItem('phone')){
        this.account = sessionStorage.getItem('phone');
        this.password = sessionStorage.getItem('phone').slice(5,12);
      }

      //判断手机类型
      
      var ua = navigator.userAgent.toLowerCase();

      //alert(ua);

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
        
      //微信浏览器 返回事件
      pushHistory();  
      let that = this;
      window.addEventListener("popstate", function(e) {  
            that.forbiddenReback();

      }, false);  
    
      function pushHistory() {  
          var state = {  
              title: "",  
              url: ""  
          };  
          window.history.pushState(state, state.title, state.url);  
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

#newauthentication {
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
  margin: 2.4rem auto 0.2667rem ;
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
  margin-bottom: 0.2667rem;
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
.content .title2{
  color: #aaa;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  /*margin-bottom: 2.4rem;*/
  text-align: center;
  font-family: PingFangSC-Light;
}
.content .title2 img{
  width: 0.4rem;
  height: 0.24rem;
  margin-left: 0.1067rem;
  margin-right: 0.1067rem;
}
.content .title2 span{
  color: #F8E71C;
  font-size: 0.3733rem;
  font-family: PingFangSC-Regular;
}
.content2 .title2{
  color: #aaa;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  text-align: center;
  font-family: PingFangSC-Light;
}
.content2 .title2 img{
  width: 0.4rem;
  height: 0.24rem;
  margin-left: 0.1067rem;
  margin-right: 0.1067rem;
}
.content2 .title2 span{
  color: #F8E71C;
  font-size: 0.3733rem;
  font-family: PingFangSC-Regular;
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
/* 弹窗 */
.codeFail {
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.codeFail .pushfail {
  width: 8.9333rem;
  height: 5.4667rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 4.4rem;
  bottom: 7.84rem;
}



.codeFail .pushfail #codeFailModal .title {
  color: #FFFFFF;
  font-size: 0.5333rem;
  margin-top: 0.5333rem;
  line-height: 0.5333rem;
  margin-bottom: 0.5333rem;
  text-align: center;
  font-family: PingFangSC-Light;
}

.codeFail .pushfail #codeFailModal .content-p {
  color: #FFFFFF;
  font-size: 0.4rem;
  margin-left: 1.6rem;
  margin-bottom: 0.14rem;
  font-family: PingFangSC-Light;
}

.codeFail .pushfail #codeFailModal .btn {
  width: 8.1333rem;
  height:1.28rem;
  font-size: 0.4533rem;
  font-family: PingFangSC-Regular;
  color: #000000;
  line-height: 1.28rem;
  background: #F8E71C;
  border-radius: 0.0533rem;
  text-align: center;
  margin-top: 0.78rem;
  margin-left: 0.4rem;
}

/*重复认证弹窗*/
.reVolidateModal {
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.reVolidateModal .reVolidate {
  width: 8.9333rem;
  height: 4.7733rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 3.84rem;
  bottom: 9.1733rem;
}
.reVolidateModal .reVolidate #modal .titleListen {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.reVolidateModal .reVolidate #modal .contentListen {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.reVolidateModal .reVolidate #modal .Btn {
    width: 8.1333rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #000000;
    line-height: 0.4533rem;
    margin-top: 0.6667rem;
    margin-left: 0.4rem;
    border-radius: 0.0533rem;
    background: #F8E71C;
    border: none;
}



</style>


