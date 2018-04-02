<template>
   <div id="overCount">
<!--  请求验证码次数超时  -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc">
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
                  <input @click="getRadio1" type="radio" value="yes" name='leader' id="yes"><span class="yes">是</span>
                  <input @click="getRadio2" type="radio" value="no"  name='leader' id="no"><span class="no">否</span>
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
import imgSrc from  '../../static/images/logo.jpg'
import AuthenticationOk from './AuthenticationOk'
export default {
    name:'overCount',
    components:{
        AuthenticationOk
    },
    data(){
        return {
            imgSrc:imgSrc,
            title:'',
            helpMessage:'',
            user:'',
            reback:'',
            value:'',
            isbtn:false,
            rad:'',
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
/*@import  '../assets/css/variables.scss';      
@import  '../assets/css/overCount.css';*/


#overCount .head {
  width: 100%;
  height: 130px;
  display: flex;
  background: #eee;
  justify-content: center;
  align-items: center;
}

#overCount .head .left{
  width: 80px;
  height: 80px;
  margin-right: 20px
}

#overCount .head .left img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
}

#overCount .head .right {
  height: 60px;
  width: 250px;
  font-size: 16px;
  padding-top: 20px;
  font-weight: 600;
  color: #1f1e22;
}

#helpMessage {
  font-size: 12px;
  color: #666;
  margin-top: 10px;
}

#contentList {
  font-size: 16px;
  margin: 10px 10px 10px 10px;
  padding: 10px 20px 20px 38px;
  box-sizing: border-box;
}

.list li{
  list-style: disc;
  margin-bottom: 18px;
}
.list li p{
  color: #666;
  font-size: 14px;
  margin-bottom: 12px;
}
.list li .userName{
  height: 60px;
}
.list .userName p{
  margin-bottom: 0px;
}
.list li .libox{
  height: 80px;
}
.libox span{
  font-size: 16px;
  color: #333;
}
.yes{
  margin-left: 6px;
  margin-right: 32px;
}
.no{
  margin-left: 6px;
}
input{
  outline: none;
  border: none;
}
.username{
  width: 98%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #333;
  border-bottom: 1px solid #666;
}

.btn {
  font-size: 17px;
  line-height: 36px;
  text-align: center;
  color: #666;
  width: 98%;
  height: 36px;
  margin: 0 auto;
  text-align: center;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 20px;
}
.active{
  color: #fff;
  border: 1px solid #ccc;
  background: #ccc;
}

.rebackContent{
  outline: none;
  font-size: 14px;
  color: #666;
  border: 1px solid #ccc;
  padding: 6px 0 0 6px;
  width: 98%;
}



</style>
