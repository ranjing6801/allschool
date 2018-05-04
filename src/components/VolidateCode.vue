<template>
    <div id="volidateCode">
        <div class="head">
          <div class="left">
              <img :src="imgSrc ? imgSrc : imgsrc1">
          </div>
          <div :class="isHeight?'height1':'height2'" class="right">
              <span>{{ title }}</span>
          </div>
        </div>
        <div class="content">
            <p class="tip" v-if="YZM">验证码已发送至  <span>{{ number | value }} </span></p>
            <p class="tip" v-if="ListenYzm">语音验证码已发送成功</p>
           <input maxlength= "4" class="VolidateCode"  placeholder="请输入验证码"
                     type="text" v-model="reCredNum" 
                    @keyup="codeNumber" v-on:input="reCredNumFocus" />

            <span class="volidateNum" @click="regetNum" v-if="reNum">重发短信验证码</span>
            
            <div class="box">
              <div class="telError" :class="isShowCode?'':'hidden'">
                <img src="../../static/images/warn.png" alt="!">
                <span class="rightPhone">验证码错误</span>
              </div>
              <div v-show="listenCode" class="listencode">收不到验证码?
                <span  v-show="listenCode" class="getListen" @click="getListenCode">接听语音验证码</span>
              </div>
            </div>
            
            <!--  div  占位符 -->
            <!-- <div v-show="!listenCode" class="listencode"></div> -->
            <span class="volidateNum"  v-show="isTimer">{{ time }}s</span>
            <button :class="!dis ? 'referBtn': '' " :disabled="dis" class="referCode"   @click="codePromise" >提交</button>
        </div>
        
   <!--  接收 语音验证码  -->
        <div class="ListenCodeFail" v-if="isCodeFailShow" >
          <div class="Listenfail">
              <div id="modal">
                  <p class="titleListen">语音验证码</p>
                  <p class="contentListen"> 
                      我们将以电话形式告知您验证码, 你可能会接收到010、0551、024、029等开头的来电，请放心接听
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
              <p class="content-p">验证码发送失败,  请稍后重试</p>
              <div class="btn" @click="codeFailHidden">我知道啦</div>
            </div>
        </div>
    </div>
    </div>
</template>


<script>
import $ from 'jquery'
import overCount from './overCount'
import userName from './userName'
import imgsrc1 from '../../static/images/logo.jpg'

export default {
    name:'volidateCode',
    components:{
        overCount,userName
    },
    data(){
        return {
                imgsrc1:imgsrc1,
                imgSrc:sessionStorage.getItem('imgSrc'),
                title:'',
                reCredNum:'',
                YZM:false,
                ListenYzm:false,  // 语音验证码
                number:'',
                time:null,
                timer:null,
                reNum:false,
                isTimer:false,
                count:0,
                listenCode:false,
                isShowCode:false,
                isCodeFail:false,   // 验证码发送失败
                codeOverTime:'验证码发送次数已达上限',
                helpMessage:'请填写反馈信息帮助我们及时解决哦',
                txt:'验证码累计错误已达上限',
                rebackDetail:'验证码累计错误达到10次上限',
                dis:true,
                getCodeNum:0,   // 记录获取验证码次数, 到达10次 就进入反馈界面
                isCodeFailShow:false,  // 语音验证码
                isHeight:false,
        }
    },
    filters:{ // 过滤
        value(val){
            return  val.slice(0,4) +' ' + val.slice(4,9) + ' ' + val.slice(9,15);
        }
    },
    methods:{
        getVolidateCode(){
          // 刚刚进入这个组件  就获取验证码
          this.axios.post('/h5/index/sendMessageCode',{
                phone:sessionStorage.getItem('phone')
          })
          .then(res => {
            // alert('sendMessageCode');
            console.log('sendMessageCode:',res);
            //***** 本地打开测试 *****//
            //this.ShowNumber();  
            //***** 本地打开测试 *****//
            if(res.data.response){
                this.ShowNumber();
            }
            if(res.data.error_response){
              sessionStorage.setItem('school_id',res.data.error_response.school_id);
              if(res.data.error_response.code==213){
                this.reNum = true;
                this.isCodeFail = true;
              }else if(res.data.error_response.code==210){
                 console.log("验证码发送次数已达上限");
                 sessionStorage.setItem('keyword',res.data.error_response.keyword);
                 this.$router.push({path:'/overCount',query:{title:this.codeOverTime,helpMessage:this.helpMessage}});
                }
            }
          })
          .catch(err => {
            console.log('err:',err);
            alert('无可用网络!');
          })
        },
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
          //console.log('暂时不限制格式..');
          // this.reCredNum = this.reCredNum.replace(/[^\d]/g,'');
        },
        getListenCode(){  // 获取语音验证码
            this.isCodeFailShow = true;
        },
        regetNum(){ // 重新获取短信验证码
            this.reNum = false;
            this.YZM = true;
            this.ListenYzm = false;
            this.getVolidateCode();  
        },
        ShowNumber(){  // 显示倒计时
           clearInterval(this.timer)   //调用定时器之前先清除定时器
            this.isTimer = true;
            this.time = 60;
            this.count++;
            console.log('验证码发送次数:',this.count);
            if(this.count > 5){ // 每天最多可以获取5次验证码
                console.log("验证码发送次数已达上限");
                this.$router.push({path:'/overCount',query:{title:this.codeOverTime,helpMessage:this.helpMessage}});
              }
            this.timer = setInterval (() => {
                this.time -= 1;
                if(this.time <= 0){
                    clearInterval(this.timer);  // 清除定时器
                    this.isTimer = false;
                    this.reNum = true;
                    
                    if(this.count > 1){
                        this.listenCode = true;
                    }
                    
                }
            },1000)
        },
        clear(){   
            // 语音验证码  点击取消  弹窗
            this.isCodeFailShow = false; 
            //this.reNum = false; 
        },
        know(){  // 请求语音验证码 点击 好的 
            this.axios.post('/h5/index/sendvoicecode',{
                phone:sessionStorage.getItem('phone')
            })
            .then(res => {
              console.log('sendvoicecode:',res);
                this.isCodeFailShow = false;  //语音短信码弹窗关闭
                this.reNum = false;      //关闭重发验证码提示
                this.ListenYzm = true;    
                this.YZM = false;
                this.listenCode = false;  // 倒计时开始 接收语音验证码 提示文字 隐藏
                this.ShowNumber();
            })
            .catch(err => {
              console.log('err:',err);
              alert('无可用网络!');
            })
            
        },
        codePromise(){ // 验证码提交
            console.log('输入的验证码:',this.reCredNum);
            this.axios.post('/h5/index/checkCode',{
                    phone:sessionStorage.getItem('phone'),
                    code:this.reCredNum
                })
                .then(res => {
                  console.log('checkcode:',res);
                  if(res.data.response){
                    this.$router.push({path:'/userName'})
                  }
                  if(res.data.error_response){
                      $('.VolidateCode').addClass('red');
                      this.isShowCode = true;
                      //this.getCodeNum ++ ;
                      $(".rightPhone").html('验证码错误');
                      // console.log('验证码输入错误次数:',this.getCodeNum)
                      if(res.data.error_response.code == 222){   // 记录验证码输入错误的次数, 到达10次 就进入反馈界面
                          console.log("验证码输入错误超过10次");
                          sessionStorage.setItem('school_id',res.data.error_response.school_id);
                          sessionStorage.setItem('keyword',res.data.error_response.keyword);
                          this.$router.push({path:"/overCountTen",query:{title:this.txt,helpMessage:this.helpMessage,reback:this.rebackDetail}});
                      } 
                  }
                })  
                .catch(err => {
                    console.log('err:',err);
                    alert('无可用网络!');
                })
        }
    },
    created(){
        // this.getVolidateCode();
    },
    mounted(){
        this.YZM = true;
        document.title = "填写验证码";
        this.title = this.$route.query.title;
        this.title.length > 14 ? this.isHeight=false : this.isHeight=true;
        this.number = this.$route.query.phone;

        // alert('mounted');

        if(sessionStorage.getItem('myphone')){
            //this.ShowNumber();
            // console.log('sessionStorage.getItem(myphone)')
            this.getVolidateCode();
        }else{
          this.reNum = true   // 进入验证码界面就获取验证码.并且显示重新获取验证码提示
        }
        sessionStorage.removeItem('myphone')  // 防止刷新页面后出现倒计时, 刷新页面应该出现重新获取验证码
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

.content .code {
  color: #000;
}

.content input::-webkit-input-placeholder {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #555555;
}

.content .volidateNum {
  position: absolute;
  top: 1.3333rem;
  right:0.3333rem;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
  color: #AAAAAA;
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
    padding: 0;
    border-radius: 0;
    color: #fff;
    background: #2b2b2b;
    border-bottom:  2px solid #555555;
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
    margin-top: 1.0133rem;
}
.content .referBtn{
  background: #F8E71C;
}


/* 输入框动态样式*/
.content .hot{  
  border-bottom: 2px solid #AAAAAA;
}
.content .red{
  border-bottom: 2px solid #FF6688;
}
.content .active{
  border: 2px solid #333;
  background: #000;
  color: #fff;
}

.content .listencode {
  /*width: 4.3733rem;*/
  height: 0.32rem;
  text-align: right;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
  color: #AAAAAA;
  line-height: 0.32rem;
  margin-right: 0.2667rem;
  margin-top: 0.2667rem;
}

.content .listencode .getListen {
  position: relative;
  font-family: PingFangSC-Regular;
  font-size: 0.32rem;
  line-height: 0.32rem;
}
.box{
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.content .telError {
  margin-top: 0.2667rem;
  display: flex;
  align-items: center;
}
.telError img{
  width: 0.2667rem;
  height: 0.2667rem;
  margin-right: 0.1333rem;
  vertical-align: middle;
}

.content .telPhone {
    width: 0.2667rem;
    height: 0.2667rem;
    margin-top: 0.2667rem;
    margin-left: -0.4rem;
    color: #FF6688 ;
    display: inline-block;
    /*background-size: 0.2667rem 0.2667rem;*/
    /*background: url('../../static/images/warn.png') no-repeat center;*/
    border-radius: 50%;

}
.telPhone img{
  display: block;
  width: 0.2667rem;
  height: 0.2667rem;
}

.content .telError .rightPhone {
  font-size: 0.32rem;
  color: #FF6688;
  font-family: PingFangSC-Light;
  font-size: 0.32rem;
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

/* 验证码 发送失败 弹窗 start */
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
  line-height: 0.6933rem;
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
  margin-top: 0.6667rem;
  margin-left: 0.4rem;
}

/* 验证码 发送失败 弹窗 end */


.ListenCodeFail {
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

.ListenCodeFail .Listenfail {
  width: 8.9333rem;
  height: 6.16rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 3.0667rem;
  bottom: 7.84rem;
}
.ListenCodeFail .Listenfail #modal .titleListen {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.ListenCodeFail .Listenfail #modal .contentListen {
  width: 7.6533rem;
  height: 2.08rem;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
  margin-left: 0.64rem;
  margin-right: 0.64rem;
  margin-top: 0.5333rem;
}

.ListenCodeFail .Listenfail #modal .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    line-height: 0.4533rem;
    margin-top: 0.6667rem;
    border-radius: 0.0533rem;
    border: none;
}

.Btn-left{
   margin-left: 0.4rem;
}
.ListenCodeFail .Listenfail #modal .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
}
.hidden{
  opacity: 0.01;
}

</style>
