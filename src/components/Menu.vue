<template>
<div id="myMenu">
  <!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc">
        </div>
        <div class="right">
            <span>{{ title }}</span>
        </div>
    </div>
    <!--  content  -->
    <div class="content">
      <p class="tip" v-show="tip">无晓黑板账号请输入手机号</p>
      <input @keyup="tel" type="tel" placeholder="请输入晓黑板账号 / 手机号"  v-model="phone"
               v-on:input="focus" class="input"  maxlength=13 />

      <div class="telError" :class="isRightNumber?'':'hidden'">
        <img src="/static/images/warn.png" alt="!" />
        <span class="rightPhone">请输入正确的手机号码</span>
      </div>
               
      <span class="telePhone" @click="clearTel" v-if="telNum"></span>
      <button :class="!btn?'referBtn':''" class="refer"  :disabled="btn" @click="telPromise" >提交</button>
    </div>
    
    <!--  验证码发送失败 -->
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
// import imgSrc from  '../../static/images/logo.jpg'
import VolidateCode from './VolidateCode'
import $ from 'jquery'

// import api from '../api/api'
  export default {
    name:'myMenu',
    meataInfo:{
      title:'输入手机号'
    },
    data(){
      return {
        title:'',  // 扫码进来后的标题
        imgSrc:'',
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
               this.phone = newValue > oldValue ? newValue.replace(/\s/g,'').replace(/(\d{3})(\d{0,4})(\d{0,4})/,'$1 $2 $3'):this.phone.trim()
        }
    },
    methods:{
      // ! 
      rightNumberTip(){
        
      },
      //  x
      clearTel(){
        this.phone = '';
        this.telNum = false;
        this.btn = true;
        this.isRightNumber = false;
        $('input').removeClass('red');  //  清空之后 输入框颜色改为正常的

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
          if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(myphone))) {
              this.isRightNumber = true;
              console.log('输入的手机号:',myphone);
              $('.input').addClass('red');
              $('.rightPhone').html('请填写正确的手机号码');
              return;
          }
          
          this.axios.post('/h5/index/checkPhoneNumber',{
                  phone:'18616253090',
                })
              .then(res => {
                console.log('resPhone=',res);
                  // console.log(res[0].id)         
                  // if(res[0].id == 1){   // 提示 该手机号已经加入其他学校
                  //       this.isRightNumber = true;
                  //       $('.input').addClass('red');
                  //       $('.rightPhone').html('该手机号已经加入其他学校');

                  // }else if(res[0].id==2){ // 手机号码验证错误
                  //       this.isRightNumber = true;
                  //       $('.input').addClass('red');
                  //       $('.rightPhone').html('请填写正确的手机号码');

                  // }else if(res[0].id==3){
                  //       // 验证码发送失败
                  //       this.isCodeFailShow = true;

                  // }else{
                  //   //手机号码验证成功  跳转 到验证码界面
                          //  localStorage.setItem("phone",this.phone); 
                  //       sessionStorage.setItem("phone",this.phone);   // 将电话号码存储在 本地 
                  //       this.$router.push({name:'VolidateCode',query:{title:this.title,phone:this.phone}});

                  // }
              })
              .catch(err => {
                alert('请求错误');
                console.log('errPhone=',err);
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
      this.axios.get('/h5/index/index?tcode='+ 16695090)
          .then(res => {
            // console.log('res=',res.data.response.school_info);
            this.imgSrc = res.data.response.school_info.school_img;
            this.title = res.data.response.school_info.school_name;
          })
          .catch(err => {
            console.log('err=',err);
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
  top: 5.1733rem;
  bottom: 7.84rem;
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

</style>