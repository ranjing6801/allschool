<template>
<div id="myMenu">
  <!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc ? imgSrc : imgsrc1">
        </div>
        <div :class="isHeight?'height1':'height2'" class="right">
            <span>{{ title }}</span>
        </div>
    </div>
    <!--  content  -->
    <div class="content">
      <p class="tip" v-show="tip">无晓黑板账号请输入手机号</p >
      <input @keyup="tel" type="tel" placeholder="请输入晓黑板账号 / 手机号"  v-model="phone"
               v-on:input="focus" class="input"  maxlength=13 />
      <div class="telError" :class="isRightNumber?'':'hidden'">
        <img src="../../static/images/warn.png" alt="!" />
        <span class="rightPhone">请输入正确的手机号码</span>
      </div>
               
      <span class="telePhone" @click="clearTel" v-if="telNum"></span>
      <button :class="!btn?'referBtn':''" class="refer"  :disabled="btn" @click="telPromise" >提交 (当前测试版本号：v2.1.2)</button>
    </div>
    
    <!--  验证码发送失败 -->
    <div class="codeFail" v-if="isCodeFailShow" @click="codeFailKnow" >
        <div class="fail">
            <div id="codeFailModal" >
              <p class="title">验证码发送失败</p >
              <p class="content-p">验证码发送失败, 请稍后重试</p >
              <div class="btn" @click="codeFailKnow">我知道啦</div>
            </div>
        </div>
    </div>
    <!-- 网络不好 -->
    <div v-show="offline" class="pop">
      网络不佳，请检查后重试
    </div>
</div>
</template>

<script>
import VolidateCode from './VolidateCode'
import $ from 'jquery'
import imgsrc1 from '../../static/images/logo.jpg'

  export default {
    name:'myMenu',
    meataInfo:{
      title:'输入手机号'
    },
    data(){
      return {
        imgsrc1:imgsrc1,
        title:'',
        imgSrc:'',
        tip:true,
        phone:'',
        btn:true,
        isRightNumber:false,
        count:null,
        isCodeFailShow:false,
        telNum:false,// 控制手机号码输入框 右边的 x
        isHeight:false,
        offline:false
      }
    },
    watch:{ // 监听phone
        phone(newValue,oldValue){
               this.phone = newValue > oldValue ? newValue.replace(/\s/g,'').replace(/(\d{3})(\d{0,4})(\d{0,4})/,'$1 $2 $3'):this.phone.trim()
        }
    },
    methods:{
      clearTel(){    //  点击 x  清除
        this.phone = '';
        this.telNum = false;
        this.btn = true;
        this.isRightNumber = false;
        $('input').removeClass('red');  //  清空之后 输入框颜色改为正常的
        $('.input').removeClass('hot');

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
          console.log('点击提交按钮');
          //请求数据之前 要判断手机号是否合法
          let myphone = this.phone.split(' ').join('');
          if(!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(myphone))) {
              this.isRightNumber = true;
              console.log('输入的手机号:',myphone);
              $('.input').addClass('red');
              $('.rightPhone').html('请填写正确的手机号码');
              return;
          }
          console.log('手机号:',myphone);

          this.axios.post('/h5/index/checkPhoneNumber',{
                  phone: myphone,
                })
              .then(res => {
                console.log('checkPhoneNumber:',res);
                if(res.data.response){
                  sessionStorage.setItem("phone",myphone);   // 将电话号码存储在 本地
                  sessionStorage.setItem("myphone",myphone);   // 将电话号码存储在 本地
                  this.$router.push({name:'VolidateCode',query:{title:this.title,phone:this.phone}});
                }
                if(res.data.error_response){
                      this.isRightNumber = true;
                      $('.input').addClass('red');
                      $('.rightPhone').html(res.data.error_response.msg);
                }
              })
              .catch(err => {
                console.log('网络错误');
                this.offline = true;
                clearTimeout(timer);
                var _this = this;
                var timer=null;
                timer = setTimeout(function(){
                  _this.offline = false;
                },2000);
                // 手机号码验证错误
                //this.isRightNumber = true;
              });
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
      var tcode = this.$route.params.tcode;
      console.log('tcode:',this.$route.params.tcode);
      this.axios.get('/h5/index/index?tcode='+ tcode)
          .then(res => {
          //console.log('res:',res.data.response.school_info);
            this.imgSrc = res.data.response.school_info.school_img;
            this.title = res.data.response.school_info.school_name;
            this.title.length > 14 ? this.isHeight=false : this.isHeight=true;
            sessionStorage.setItem("imgSrc",this.imgSrc);
            sessionStorage.setItem("title",this.title);
            sessionStorage.setItem("autoDownload",'true');
          })
          .catch(err => {
            console.log('err:',err);
            this.offline = true;
            clearTimeout(timer);
            var _this = this;
            var timer=null;
            timer = setTimeout(function(){
              _this.offline = false;
            },2000);
          })
    }
  }
</script>

<style scoped>
button{
  outline: none;
}
.head {
  width:9.2rem;
  height: 2.6667rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  display: flex;
  justify-content: center;
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
}
.height1{
  line-height: 1.44rem;
}
.height2{
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
}

.input {
  font-family: PingFangSC-Light;
  margin-top: 0.2667rem;
  width: 8.9333rem;
  height: 1.4rem;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  text-indent:  0.05rem;
  outline: none;
  border: none;
  color: #fff;
  background: #2b2b2b;
  border-bottom: 1px solid #555555;
  border-radius: 0;
}

.telePhone{
    width: 0.4267rem;
    height: 0.4267rem;
    display: inline-block;
    line-height: 0.3733rem;
    text-align: center;
    position: absolute;
    top: 1.2533rem;
    left: 8.3733rem;
    color: #fff;
    background: url('../../static/images/clear.png');
    background-size: 0.4267rem 0.4267rem;
    border-radius: 50%;
}
.content .hot{
  border-bottom: 1px solid #AAAAAA;
}
.content .red{
  border-bottom: 1px solid #FF6688;
}

.content input::-webkit-input-placeholder {
  color: #555555;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  font-family: PingFangSC-Light;
}

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
  margin-top: 1.0133rem;
}

.content .referBtn{
  background: #F8E71C;
}

.content .telError {
  margin-top: 0.2667rem;
  display: flex;
  align-items: center;
}
.hidden{
  opacity: 0.01;
}
.telError img{
  width: 0.2667rem;
  height: 0.2667rem;
  margin-right: 0.1333rem;
  vertical-align: middle;
}

.content .telError .rightPhone {
  font-size: 0.32rem;
  color: #FF6688;
  margin-left: 0.0533rem;
}

/* 验证码错误弹窗*/
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

.codeFail .fail {
  width: 8.9333rem;
  height: 4.7733rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.codeFail .fail #codeFailModal .title {
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  margin-top: 0.5333rem;
}

.codeFail .fail #codeFailModal .content-p {
  margin-top: 0.5333rem;
  margin-left: 1.6rem;
  margin-right: 1.5733rem;
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
}

.codeFail .fail #codeFailModal .btn {
  width: 8.1333rem;
  height:1.28rem;
  font-size: 0.4533rem;
  font-family: PingFangSC-Regular;
  color: #000000;
  line-height: 1.28rem;
  background: #F8E71C;
  border-radius: 0.0533rem;
  text-align: center;
  margin-top: 0.6667rem;
  margin-left: 0.4rem;
}
.pop{
  width: 6.0533rem;
  height: 0.9867rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  text-align: center;
  line-height: 0.9867rem;
}

</style>