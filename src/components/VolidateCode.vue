<template>
    <div id="volidateCode">
        <div class="head">
            <div class="left">
                <img :src="imgSrc">
            </div>
            <div class="right">
                {{ title }} 
            </div>
        </div>
        <div class="content">
            <p class="tip" v-if="YZM">短信验证码已发送至 {{ number | value }} </p>
            <p class="tip" v-if="ListenYzm">语音验证码已发送成功</p>
           <input  maxlength= "4" class="VolidateCode"  placeholder="请输入验证码"
                     type=" tel" v-model="reCredNum" 
                    @keyup="codeNumber" v-on:input="reCredNumFocus" />

            <span class="volidateNum" @click="regetNum" v-if="reNum">重发短信验证码</span>

            <p v-if="listenCode" class="listencode">收不到验证码?
                <span  v-if="listenCode" class="getListen" @click="getListenCode">接听语音验证码</span>
            </p>
            <p class="telError"  v-if="isShowCode">
                <span class="telPhone" @click="clearCode" v-if="isShowCode"></span>
                <span class="rightPhone">验证码错误</span>
            </p>
            <span class="volidateNum"  v-show="isTimer">{{ time }} s</span>
            <button :class="!dis ? 'referBtn': '' " :disabled="dis" class="referCode"   @click="codePromise" >验证码提交</button>
        </div>
        
   <!--  接收 语音验证码  -->
        <div class="codeFail" v-if="isCodeFailShow" >
          <div class="Listenfail">
              <div id="modal">
                  <p class="titleListen">语音验证码</p>
                  <p class="contentListen"> 
                      我们将以电话的形式告知您验证码,你可能会接收到010、0051、024、029等开头的来电，请放心接听
                  </p>
                  <button class="Btn Btn-left" @click="clear">取消</button>
                  <button class="Btn Btn-rigth" @click="know">好的</button>
              </div>
          </div>
        </div>

  <!-- 验证码发送失败弹窗  -->
        <div class="codeFail" v-if="isCodeFail" @click="codeFailHidden" >
        <div class="pushfail">
            <div id="codeFailModal" >
              <p class="title">验证码发送失败</p>
              <p class="content-p">验证码发送失败, 请稍后重试</p>
              <div class="btn" @click="codeFailHidden">我知道啦</div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
import imgSrc from  '../../static/images/logo.jpg'
import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
// import codeFail from './codeFail'
import overCount from './overCount'
import userName from './userName'

export default {
    name:'volidateCode',
    components:{
        overCount,userName
    },
    data(){
        return {
                imgSrc:imgSrc,
                title:'',
                reCredNum:'',
                YZM:false,
                ListenYzm:false,  // 语音验证码
                number:null,
                time:null,
                reNum:false,
                isTimer:false,
                count:0,
                listenCode:false,
                isShowCode:false,
                isCodeFail:false,   // 验证码发送错误
                codeOverTime:'验证码发送次数已达上限',
                helpMessage:'您填写的信息可以帮助我们及时更正哦',
                txt:'验证码累计错误已达上线',
                dis:true,
                getCodeNum:0,   // 记录获取验证码次数, 到达10次 就进入反馈界面
                isCodeFailShow:false,  // 语音验证码

        }
    },
    filters:{ // 过滤
        value(val){
            return  val.slice(0,4) +' ' + val.slice(4,9) + ' ' + val.slice(9,15);
        }
    },
    methods:{
        codeFailHidden(){ // 验证码发送失败弹窗
            this.isCodeFail = false;
        },
        clearCode(){   //  x  清除错误验证码
            this.reCredNum = '';
            this.isShowCode = false;
            $('.VolidateCode').removeClass('red');
            $('.VolidateCode').removeClass('hot');
        },
        
        reCredNumFocus(){    // 验证码输入框 焦点事件

            if(this.reCredNum.length > 0){

                $('.VolidateCode').addClass('hot');
            }
            else{
                $('.VolidateCode').removeClass('hot');
            }

            if(this.reCredNum.length == 4 ){  
                this.dis = false;

            }
            else{
                this.dis = true;
                this.isShowCode = false // 验证码输入错误的时候 回删一位 验证码错误提示消失
                $('.VolidateCode').removeClass('red');
            }
        },
        codeNumber(){//禁止输入非数字
          this.reCredNum = this.reCredNum.replace(/[^\d]/g,'');
        },
        getListenCode(){  // 获取语音验证码
            this.isCodeFailShow = true;
        },
        
        regetNum(){ // 重新获取短信验证码
            this.reNum = false;
            api.myGet("users",{id:'1'})
    				   .then(res => {
                    this.ShowNumber();
                    this.count++;
                    if(this.count > 0){
                        console.log('this.count:',this.count);
                        this.listenCode = true;
                    }
                    if(this.count > 4){ // 每天最多可以获取5次验证码
                        console.log("验证码发送次数已达上限");
                        this.$router.push({path:'/overCount',query:{title:this.codeOverTime,helpMessage:this.helpMessage}});
                    }
    				   })
    				   .catch(err => {
      					   // 手机号码验证错误
      					   console.log(err);
                   $('.VolidateCode').addClass('hot');
    				   })
        },
        ShowNumber(){  // 显示倒计时
           clearInterval(timer)   //调用定时器之前先清除定时器
            this.isTimer = true;
            this.time = 60;
            var timer = setInterval (() => {
                this.time -= 10;
                if(this.time <= 0){
                    clearInterval(timer);  // 清除定时器
                    this.isTimer = false;
                    this.reNum = true;
                }
            },1000)
        },
        clear(){   
            // 语音验证码  点击取消  弹窗
            this.isCodeFailShow = false; 
            this.reNum = false; 
        },
        know(){  // 请求语音验证码 点击 好的 
            this.isCodeFailShow = false;  //语音短信码弹窗关闭
            this.reNum = false; //关闭重发验证码提示

            //   点击 好的  语音验证码请求数据返回成功  
            this.ListenYzm = true;
            this.YZM = false;
        },
        codePromise(){ // 验证码提交
            api.myGet("users",{id:3,reCredNum:this.reCredNum}) 
               .then(res => {
                   // console.log(res[0].id)
                    if(res[0].id == 1){  // 跳转到 userName
                        this.$router.push({path:'/userName',query:{title:this.$route.query.title}})
                    }

                    if(res[0].id == 2){  // 验证码错误
                      $('.VolidateCode').addClass('red')
                        this.isShowCode = true
                        this.getCodeNum ++ ;
                        $(".rightPhone").html('验证码错误');
                        console.log('验证码输入错误次数:',this.getCodeNum)
                        if(this.getCodeNum > 9){   // 记录验证码输入错误的次数, 到达10次 就进入反馈界面
                            console.log("验证码输入错误超过10次");
                            this.$router.push({path:"/overCount",query:{title:this.txt,helpMessage:this.helpMessage}});
                        } 
                    }
                     if(res[0].id==3){
                        // 验证码发送失败
                        this.isCodeFail = true;
                    }
               })  
               .catch(err => {

               })
        }
    },
    mounted(){
        // console.log(this.$route)
        this.YZM = true
        document.title = "填写验证码"
        this.title = this.$route.query.title
        this.number = this.$route.query.phone

        if(sessionStorage.getItem('phone')){
            this.ShowNumber();
        }else{
          this.reNum = true   // 进入验证码界面就获取验证码.并且显示重新获取验证码提示
        }
        sessionStorage.removeItem('phone')  // 防止刷新页面后出现倒计时, 刷新页面应该出现重新获取验证码
    }
}
</script>
<style scoped>

.head {
  width:9.2rem;
  height: 2.6667rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  display: flex;
  background: #363636;
}
.head .left{
  width: 1.6rem;
  height: 1.6rem;
  margin-top:0.5333rem ;
  margin-left: 0.4rem;
  margin-right:0.2667rem;
}
.head .left img {
  width: 1.6rem;
  height:1.6rem;
  border-radius: 50%;
  display: block;

}

.head .right {
  height: 1.44rem;
  width: 7.8667rem;
  margin-top: 0.64rem;
  margin-right: 0.4rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
}
/*   head end*/


.content {
  width: 9.2rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  box-sizing: border-box;
  position: relative;
}
.content p {
  color: #AAAAAA;
  font-size: 0.1867rem;
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  margin-left: 0.1333rem;
  margin-top: 0.8rem;
  letter-spacing: -0.0091rem;
}


.content input::-webkit-input-placeholder {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #555555;
  letter-spacing: -0.0109rem;
}

.content .volidateNum {
  position: absolute;
  top: 1.3333rem;
  right:0.3333rem;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
  color: #AAAAAA;
  letter-spacing:-0.0039rem;
  line-height: 0.32rem;
  margin-bottom: 0.5867rem;

}

.VolidateCode{
    font-family: PingFangSC-Light;
    margin-top: 0.2667rem;
    width: 8.9333rem;
    height: 1.44rem;
    font-size: 0.4533rem;
    line-height: 0.4533rem;
    text-indent:  0.1333rem;
    outline: none;
    border: none;
    color: #fff;
    background: #2b2b2b;
    border-bottom:  0.0267rem solid #555555;
}

.content .referCode {
    width: 9.2rem;
    height: 1.28rem;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #000000;
    border:none;
    display: block;
    line-height: 0.4533rem;
    background: #888888;
    border-radius: 0.0533rem;
    margin-top: 1.6rem;
}
.content .referBtn{
  background: #F8E71C;
}


/* 输入框动态样式*/
.content .hot{  
  border-bottom: 2px solid #AAAAAA;
}
.content .red{
  border-bottom: 2px solid red;
}
.content .active{
  border: 1px solid #333;
  background: #000;
  color: #fff;
}

.content .listencode {
  /*width: 4.3733rem;*/
  text-align: right;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
  color: #AAAAAA;
  letter-spacing: -0.0039rem;
  line-height: 0.32rem;
  margin-top: 0.5333rem;
  margin-right: 0.6667rem;
}

.content .listencode .getListen {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  color: #000000;
  letter-spacing: -0.0039rem;
  line-height: 0.32rem;
}

.content .telError {
  position: absolute;
  z-index: 10;
  top: 1.44rem;
  left: 0.3333rem;
}

.content .telError .telPhone {
    width: 0.2667rem;
    height: 0.2667rem;
    display: inline-block;
    line-height: 0.3733rem;
    margin-top: 0.2667rem;
    margin-left: -0.4rem;
    color: ##FF6688 ;
    background-size: 0.2667rem  0.2667rem;
    background: url('../../static/images/warn.png');
    border-radius: 50%;
}

.content .telError .rightPhone {
  font-size: 0.32rem;
  color: #FF6688;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
  letter-spacing: -0.0039rem;
  line-height: 0.32rem;
}
.modalShow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.modalShow .modal {
  width: 80%;
  height: 20%;
  margin-left: 10%;
  margin-right: 10%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}

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
  height: 4.7733rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 5.1733rem;
  bottom: 7.84rem;
}



.codeFail .pushfail #codeFailModal .title {
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  letter-spacing: -0.0064rem;
  line-height: 0.5333rem;
  margin-top: 0.5333rem;
}

.codeFail .pushfail #codeFailModal .content-p {
  margin-top: 0.5333rem;
  margin-left: 1.6rem;
  margin-right: 1.5733rem;
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  letter-spacing: 0.0055rem;
  line-height: 0.6933rem;
}

.codeFail .pushfail #codeFailModal .btn {
  width: 8.1333rem;
  height:1.28rem;
  font-size: 0.4533rem;
  font-family: PingFangSC-Regular;
  color: #000000;
  letter-spacing: -0.41px;
  line-height: 1.28rem;
  background: #F8E71C;
  border-radius: 0.0533rem;
  text-align: center;
  margin-top: 0.6667rem;
  margin-left: 0.4rem;
}


.codeFail .Listenfail #modal .titleListen {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  letter-spacing: -0.0064rem;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.codeFail .Listenfail #modal .contentListen {
  width: 7.6533rem;
  height: 2.08rem;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  letter-spacing: -0.0109rem;
  line-height: 0.6933rem;
  text-align: center;
  margin-left: 0.64rem;
  margin-right: 0.64rem;
  margin-top: 0.5333rem;
}

.codeFail .Listenfail #modal .clear{
    border: none;
    font-size: 16px;
    background: #fff;
    height: 40px;
    width: 80px;
    margin-left: 30px;
    margin-right: 40px;
}
.codeFail .Listenfail #modal .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    letter-spacing:-0.0109rem;
    line-height: 0.4533rem;
    margin-top: 0.6667rem;
    border-radius: 0.0533rem;
    border: none;
}

.Btn-left{
   margin-left: 0.4rem;
}
.codeFail .Listenfail #modal .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
}

</style>
