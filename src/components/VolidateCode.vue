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
           <input  maxlength= "4" class="VolidateCode"  placeholder="请输入验证码" type="tel" v-model="reCredNum" 
                    @keyup.native="codeNumber" v-on:input="reCredNumFocus" >

            <span class="volidateNum" @click="regetNum" v-if="reNum">重新获取验证码</span>

            <p v-if="listenCode" class="listencode">收不到验证码?
                <span  v-if="listenCode" class="getListen" @click="getListenCode">接听语音验证码</span>
            </p>
            <p class="telError"  v-if="isShowCode">
                <span class="telPhone" @click="clearCode" v-if="isShowCode"> × </span>
                <span class="rightPhone">验证码错误</span>
            </p>
 <!--            <span class="volidateNum"  v-show="listenTimer">{{ value }} s</span> -->
            <span class="volidateNum"  v-show="isTimer">{{ time }} s</span>
            <button :class="!dis ? 'active': '' " :disabled="dis" class="referCode"   @click="codePromise" >验证码提交</button>
        </div>

        <div class="codeFail" v-if="isCodeFailShow" >
          <div class="fail">
              <div id="modal">
                  <h5 class="title">语音验证码</h5>
                  <p class="content"> 
                      我们将以电话的形式告知您验证码,你可能会接收到010、0051、024、029等开头的来电，请放心接听
                  </p>
                  <button class="btn" @click="know">我知道啦</button>
              </div>
          </div>
        </div>

            <!--  验证码发送失败弹窗  -->
        <div class="codeFail" v-if="isCodeFail" @click="codeFailHidden">
            <div class="fail">
                <codeFail @codeFailChange="codeFailHidden"></codeFail>
            </div>
        </div>
    </div>
</template>


<script>
import imgSrc from  '../../static/images/logo.jpg'
import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
import codeFail from './codeFail'
import overCount from './overCount'
import userName from './userName'

export default {
    name:'volidateCode',
    components:{
        codeFail,overCount,userName
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
                isCodeFail:false,
                codeOverTime:'验证码发送次数已达上限',
                helpMessage:'您填写的信息可以帮助我们及时更正哦',
                txt:'验证码累计错误已达上线',
                dis:true,
                getCodeNum:0,   // 记录获取验证码次数, 到达10次 就进入反馈界面
                isCodeFailShow:false,

        }
    },
    filters:{ // 过滤
        value(val){
            return  val.slice(0,4) +'- ' + val.slice(4,9) + '- ' + val.slice(9,15);
        }
    },
    methods:{
        codeFailHidden(){ // 验证码发送失败弹窗
            this.isCodeFail = false;
        },
        clearCode(){   //  x  清楚错误验证码
            this.reCredNum = '';
            this.isShowCode = false;
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
      					   document.querySelector('.VolidateCode').style.borderBottom = "2px solid red";
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
        know(){  // 请求语音验证码
            this.isCodeFailShow = false;
            this.reNum = false;

            // 语音验证码请求数据返回成功  
            this.ListenYzm = true;
            this.YZM = false;
        },
        codePromise(){ // 验证码提交
            api.myGet("users",{id:'1',reCredNum:this.reCredNum}) 
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

               })  
               .catch(err => {

               })
        }
    },
    mounted(){
        // console.log(this.$route)
        this.YZM = true
        document.title = "输入验证码"
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
/*@import  '../assets/css/variables.scss';
@import  '../assets/css/volidateCode.css';*/


.head {
  width: 100%;
  height: 130px;
  display: flex;
  background: #eee;
  justify-content: center;
  align-items: center;
  
}
.head .left{
  width: 80px;
  height: 80px;
  margin-right: 20px
}
.head .left img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
}

.head .right {
  height: 60px;
  width: 250px;
  font-size: 16px;
  padding-top: 20px;
  font-weight: 600;
  color: #1f1e22;
}

.content {
  margin-top: 40px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  position: relative;
}

.content p {
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
}

.content input::-webkit-input-placeholder {
  color: #ccc;
}

.content .volidateNum {
  position: absolute;
  top: 80px;
  right: 25px;
  font-size: 12px;
  color: #333;
}

.VolidateCode{
    outline: none;
    border: none;
    font-size: 16px;
    height: 30px;
    width: 100%;
    border-bottom:2px solid rgba(0,0,0,0.2);
}
.content .refer {
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
}

.content .referCode {
    width: 100%;
    height: 40px;
    font-size: 16px;
    margin-top: 60px;
    border-radius: 25px;
    border: 1px solid #ccc;
    background: #fff;
    color: #ccc;
}

/* 输入框动态样式*/
.content .hot{  
  border-bottom: 2px solid #333;
}
.content .red{
  border-bottom: 2px solid red;
}
.content .active{
  border: 1px solid #333;
  background: #000;
  color: #fff;
}


.content #referName {
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
}

.content .listencode {
  font-size: 13px;
  color: #ccc;
  text-align: right;
}

.content .listencode .getListen {
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  font-weight: bold;
}

.content .telError {
  position: absolute;
  z-index: 10;
  top: 108px;
  left: 25px;
}

.content .telError .telPhone {
  display: inline-block;
  font-size: 16px;
  width: 14px;
  height: 14px;
  line-height: 14px;
  text-align: center;
  border-radius: 50%;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

.content .telError .rightPhone {
  font-size: 12px;
  color: #666;
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
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.codeFail .fail {
  width: 90%;
  height: 40%;
  margin-left: 5%;
  margin-right: 5%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
}


.codeFail .fail #modal .title {
  font-size: 16px;
  padding-left: 20px;
}

.codeFail .fail #modal .content {
  font-size: 16px;
  padding-right: 25px;
  text-align: center;
}

.codeFail .fail #modal .clear{
    border: none;
    font-size: 16px;
    background: #fff;
    height: 40px;
    width: 80px;
    margin-left: 30px;
    margin-right: 40px;
}
.codeFail .fail #modal .btn {
    font-size: 16px;
    display: block;
    text-align: center;
    color: #fff;
    width: 80%;
    height: 40px;
    margin: 60px auto 0;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 20px;
    border: none;
}

</style>
