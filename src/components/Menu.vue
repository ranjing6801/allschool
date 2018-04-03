<template>
<div id="myMenu">
  <!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc">
        </div>
        <div class="right">
            {{ title }}
        </div>
    </div>
    <!--  content  -->
    <div class="content">
      <p class="tip" v-show="tip">无小黑板账号请输入手机号</p>
      <p class="telError"  v-show="isRightNumber">
        <span class="telPhone" @click="rightNumberTip" v-show="isRightNumber">！</span>
        <span class="rightPhone">请输入正确的手机号码</span>
      </p>
    
      <input @keyup="tel" type="tel" placeholder="请输入小黑板账号 / 手机号"  v-model="phone"
               v-on:input="focus" class="input"  maxlength=13 />
               
      <span class="telePhone" @click="clearTel" v-if="telNum">x</span>
      <button :class="!btn?'referBtn':''" class="refer"  :disabled="btn" @click="telPromise" >提交</button>
    </div>
    
    <!--  验证码错误弹窗 -->
    <div class="codeFail" v-if="isCodeFailShow" @click="codeFailKnow" >
        <div class="fail">
            <div id="codeFailModal" >
              <p class="title">验证码发送失败</p>
              <p class="content-p">验证码发送失败, 请稍后重试</p>
              <div class="btn" @click="codeFailKnow">我知道啦</div>
            </div>
        </div>
    </div>
    
  
</div>
</template>

<script>
import imgSrc from  '../../static/images/logo.jpg'
import VolidateCode from './VolidateCode'
import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
  export default {
    name:'myMenu',
    data(){
      return {
        title:'苏州工业园二十一世纪实验幼儿园',  // 扫码进来后的标题
        imgSrc:imgSrc,
        tip:true,
        phone:'',
        btn:true,
        isRightNumber:false,
        count:null,
        isCodeFailShow:false,
        telNum:false,    // 控制手机号码输入框 右边的 x
      }
    },
    watch:{ // 监听phone
        phone(newValue,oldValue){
               this.phone = newValue > oldValue ? newValue.replace(/\s/g,'').replace(/(\d{3})(\d{0,4})(\d{0,4})/,'$1 $2 $3'):this.phone
        }
    },
    methods:{
      // ! 
      rightNumberTip(){
        
      },
      //  x
      clearTel(){
        this.phone = null;
        this.telNum = false;
        this.btn = true;

      },
      focus(){
          //监听input输入框
          if(this.phone.length > 0){
            this.telNum = true
            $('.input').addClass('hot');
          }else{
            this.telNum = false
            $('.input').removeClass('hot');
          }
          if(this.phone.length == 13){
            this.btn = false;

          }else{
            this.btn = true;
            this.isRightNumber = false;
            $('input').removeClass('red');

        }
      },
      telPromise(){  // 获取验证码
            console.log('点击按钮了..');
      //请求数据之前 要判断手机号是否合法
          let myphone = this.phone.split(' ').join('');
          if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(myphone))) {
              this.isRightNumber = true;
              console.log('myphone:',myphone);
              $('.mint-cell').addClass('red');
              $('.rightPhone').html('请填写正确的手机号码');
              return;
          }
  
          api.myGet("users",{id:1})
               .then(res => {
                  console.log(res[0].id)         
                  if(res[0].id == 1){   // 提示 该手机号已经加入其他学校
                        this.isRightNumber = true;
                        $('.rightPhone').html('该手机号已经加入其他学校');

                  }else if(res[0].id==2){ // 手机号码验证错误
                        this.isRightNumber = true;
                        $('.mint-cell').addClass('red');
                        $('.rightPhone').html('请填写正确的手机号码');

                  }else if(res[0].id==3){
                        // 验证码发送失败
                        this.isCodeFailShow = true;

                  }else{
                    //手机号码验证成功  跳转 到验证码界面

                        sessionStorage.setItem("phone",this.phone);   // 将电话号码存储在 本地 
                        this.$router.push({name:'VolidateCode',query:{title:this.title,phone:this.phone}});

                  }
         })
         .catch(err => {
           // 手机号码验证错误
           //this.isRightNumber = true;
                      //$('.mint-cell').addClass('red');
         })
      },
      tel(){
        //禁止输入非数字
        this.phone = this.phone.replace(/[^\d]/g,'');
      },
            codeFailKnow(){
                this.isCodeFailShow = false;
            } 
    },
      mounted(){
      document.title = "输入手机号";
    }
  }
</script>

<style scoped>
button{
  outline: none;
}
#myMenu{
    
    
}
.head {
  width:9.2rem;
  height: 2.6667rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  display: flex;
  background: #363636;
  /*justify-content: center;
  align-items: center;*/
  
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
  font-size: 16px;
  margin-top: 0.64rem;
  margin-right: 0.4rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
   line-height: 0.6933rem;
}

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

.input {
  font-family: PingFangSC-Light;
  margin-top: 0.2667rem;
  width: 100%;
  height: 1.44rem;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  text-indent:  0.1333rem;
  outline: none;
  border: none;
  color: #fff;
  background: #2b2b2b;
  border-bottom:  2px solid #555555;;
}

.telePhone{
    width: 0.4267rem;
    height: 0.4267rem;
    display: inline-block;
    line-height: 0.3733rem;
    background: red;
    text-align: center;
    position: absolute;
    top: 1.2533rem;
    left: 8.3733rem;
    color: #fff;
    background: #AAAAAA;
    border-radius: 50%;
}
.content .hot{
  border-bottom: 2px solid #AAAAAA;;
}
.content .red{
  border-bottom: 2px solid #FF6688;
}

.content input::-webkit-input-placeholder {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #555555;
  letter-spacing: -0.0109rem;
  line-height: 0.4533rem;
}

/*.content .volidateNum {
  position: absolute;
  top: 70px;
  right: 25px;
  font-size: 12px;
  color: #ccc;
}
*/
.content .refer {
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

.content .telError {
  position: absolute;
  z-index: 10;
  top: 1.6rem;
  left: 0.1333rem;
}

.content .telError .telPhone {
  display: inline-block;
  font-size: 0.2133rem;
  width: 0.2667rem;
  height: 0.2667rem;
  line-height: 0.2667rem;
  text-align: center;
  border-radius: 50%;
  color: #000;
  background: #FF6688;
}

.content .telError .rightPhone {
  font-size: 0.32rem;
  color: #FF6688;
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
  width: 90%;
  height: 45%;
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

/* 验证码错误弹窗*/
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
  width: 80%;
  height: 40%;
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



.codeFail .fail #codeFailModal {
  height: 100%;
  width: 100%;
}

.codeFail .fail #codeFailModal .title {
  font-size: 16px;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: bold;
}

.codeFail .fail #codeFailModal .content-p {
  font-size: 18px;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 20px;
  line-height: 2;
  text-align: center;
}

.codeFail .fail #codeFailModal .btn {
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 50%;
  height: 40px;
  margin-left: 25%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 80px;
}

</style>