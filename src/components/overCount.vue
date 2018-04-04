<template>
   <div id="overCount">
<!--  请求验证码次数超时  -->
    <div class="head">
        <div class="left">
            <img src="/static/images/err.png">
        </div>
        <div class="right">
            {{ title }}
            <p id="helpMessage">{{helpMessage}}</p>
        </div>
    </div> 
    <div id="contentList">
        <ul class="list">
            <li class="userName">
                <div class="libox1">
                  <p>您的姓名</p>
                  <input maxlength="20" @change="txt" class="username" type="text" v-model="user"> 
                </div>
            </li>
            <li>
              <div class="libox">
                 <p>您是班主任吗?</p>
                  <span @click="cur=1" :class="cur==1?'hot':''" class="yes">是</span>
                  <span @click="cur=2" :class="cur==2?'hot':''" class="no">否</span>
              </div>
            </li>
            <li>
                <p>反馈详情</p>
                <textarea maxlength="200" rows="8" cols="40" class="rebackContent" v-model="reback"></textarea>
            </li>
        </ul>
        <div :class="user&&rad&&reback?'active':''" class="btn" @click="getContent">提交</div>
    </div>

   </div>
</template>
<script>
import AuthenticationOk from './AuthenticationOk'
export default {
    name:'overCount',
    components:{
        AuthenticationOk
    },
    data(){
        return {
            imgSrc:imgSrc,
            title:'验证码发送次数已达上限',
            helpMessage:'请填写反馈信息帮助我们及时解决哦',
            user:'冉靖',
            reback:'',
            value:'',
            isbtn:false,
            rad:'',
            cur:''
        }
    },
    methods:{
        getContent(){
          if(this.user&&this.rad&&this.reback){
            this.$router.push({path:'/AuthenticationOk',query:{}})
          }else{
            console.log('请输入完整的信息...');
          }
        },
        txt() {
          console.log('this.user:',this.user);
          console.log('this.rad:',this.rad);
          console.log('this.reback:',this.reback);
        },
        getRadio1() {
          this.rad = 'yes';
        },
        getRadio2() {
          this.rad = 'no';
        }
    },
    mounted(){
        document.title = "反馈信息";
        this.title = this.$route.query.title;
        this.user = this.$route.query.username;
        this.helpMessage = this.$route.query.helpMessage;
        this.reback = this.$route.query.title;
    }
}
</script>
<style scoped>
.head {
  width:9.2rem;
  height: 2.6667rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  margin-bottom: 0.5333rem;
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
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  color: #FFFFFF;
  font-family: PingFangSC-Regular;
}

#helpMessage {
  color: #AAAAAA;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  font-family: PingFangSC-Light;
}

#contentList {
  margin-left: 0.4rem;
  box-sizing: border-box;
}

.list li{
  margin-bottom: 0.4rem;
}
.list li p{
  color: #AAAAAA;
  font-size: 0.3733rem;
  line-height: 0.3733rem;
  margin-bottom: 0.2667rem;
  font-family: PingFangSC-Light;
}
.list .userName p{
  margin-bottom: 0.2667rem;
}
.yes{
  display: inline-block;
  width: 4.44rem;
  height: 1.15rem;
  color: #fff;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  line-height: 1.1733rem;
  border: 0.0267rem solid #FFFFFF;
  border-radius: 0.0533rem;
  margin-right: 0.16rem;
  text-align: center;
}
.no{
  display: inline-block;
  width: 4.44rem;
  height: 1.15rem;
  color: #fff;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  line-height: 1.1733rem;
  border: 0.0267rem solid #FFFFFF;
  border-radius: 0.0533rem;
  text-align: center;
}
.hot{
  background: #F8E71C;
  border: 1px solid #F8E71C;
  border-radius: 0.0533rem;
  color: #000;
}
input{
  outline: none;
  border: none;
}
.username{
  width: 9.2rem;
  height: 1.1733rem;
  color: #000000;
  background: #FFFFFF;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  text-indent: 0.2667rem;
  border-radius: 0.0533rem;
  font-family: PingFangSC-Light;
}

.btn {
  width: 9.2rem;
  height: 1.28rem;
  text-align: center;
  line-height: 1.28rem;
  background: #888;
  border-radius: 2px;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000;
}
.active{
  background: #F8E71C;
  border-radius: 0.0533rem;
  color: #000;
}

.rebackContent{
  outline: none;
  width: 8.9333rem;
  height: 2.4rem;
  color: #000;
  font-size: 0.4533rem;
  border-radius: 0.0533rem;
  padding: 0.2667rem 0 0 0.2667rem;
  font-family: PingFangSC-Light;
}



</style>
