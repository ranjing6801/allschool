<template>
<div id="userName">
	<!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc">
        </div>
        <div class="right">
            {{ title }}
        </div>
    </div>
    <div class="contentUser">
        <input maxlength="20" placeholder="请输入您的姓名" type="text" v-model="userName" v-on:input="userNameFocus">
        <button class="refer" id="referName" :disabled="dis" @click="NamePromise" >提交</button>
    </div>
</div>
</template>
<script>
import imgSrc from  '../../static/images/logo.jpg'
import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
import overCount from './overCount'
import AuthenticationOk from './AuthenticationOk'
import NewAuthenticationOk from './NewAuthenticationOk' 
import CLNewTeacher from './CLNewTeacher' 
export default {
    name:'userName',
    components:{
        overCount,AuthenticationOk,NewAuthenticationOk,CLNewTeacher
    },
    data(){
        return {
            title:null,
            imgSrc:imgSrc,
            userName:'',
            dis:false,
            errTitle:'您填写的教师姓名不存在',
            helpMessage:'您的反馈信息可以帮助我们及时更正哦',
            num:1,
            classList:[
                {name:"一年级1班"},
                {name:"一年级2班"},
                {name:"一年级3班"}
            ]
        }
    },
    methods:{
        userNameFocus(){  // 聚焦
            if(this.userName.length > 0){
                  $('.refer').addClass('active');
                  this.dis = false;
                }else{
                  $('.refer').removeClass('active');
                  this.dis = true;
                }
        },
        NamePromise(){ // 姓名验证 
            // var url = '/h5/index/';
            api.myGet("users",{id:1})
               .then( res => {
                //    console.log(res)
                //    console.log(res[0].id)

            // 姓名不存在的用户
                   if(res[0].id == 1){  // 姓名不存在
                        //alert("姓名不存在")
                        this.title = this.errTitle   // 跳转之前 将title值覆盖
                        this.$router.push({path:'/overCount',query:{username:this.userName,title:this.title,helpMessage:this.helpMessage}})
                   }
            // 无班级的老师        
                   if(res[0].id == 2){  // 姓名存在, 无班级的老师  是老用户
                       this.$router.push({path:'/PassOk',query:{}})
                   }
                   if(res[0].id == 3){  // 姓名存在, 无班级的老师  是新用户
                       this.$router.push({path:'/NewAuthenticationOk',query:{}})
                   }
             
            // 是任课老师
                   if(res[0].id == 4){  // 姓名存在, 是任课老师  是老用户
                        this.$router.push({path:'/PassOk',query:{}})
                   }
                   if(res[0].id == 5){  // 姓名存在, 是任课老师  是新用户
                        this.$router.push({path:'/NewAuthenticationOk',query:{}})
                   }

            //  是班主任       
                   if(res[0].id == 6){  // 姓名存在 是班主任
                        if(res[0].username == "Leopoldo_Corker y"){  // 1. 无班级,自动创建班级并认证
                            this.$router.push({path:'/CLNewTeacher',query:{}}) 
                        }
                        else{  // 有班级 [ 选择班级认证]  或者  [创建班级认证]
                             if(res[0].website == "ola.org"){  //第一种: [ 选择班级认证] 
                                    console.log("选择班级认证")
                                    // console.log(this.classList)
                                    // console.log(this.num);
                                this.$router.push({path:'/CLYchooseClass',query:{num:this.num,classList:this.classList}})

                             }
                        }
                   }
                   //是班主任, 是新用户
                   if(res[0].id == 7){  // 班主任的验证,是新用户 
                        this.$router.push({name:'CreateClass'})
                   }
               })
               .catch(err => {

               })
        }
    },
    mounted(){
        // console.log(this.$route)
        document.title = "填写姓名"
        this.title = this.$route.query.title
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

.contentUser {
  margin: 10px 10px 10px 10px;
  padding: 20px 20px 20px 20px;
  box-sizing: border-box;
  position: relative;
}
input{
  outline: none;
  border: none;
}
.contentUser input{
  width: 98%;
  height: 38px;
  font-size: 16px;
  line-height: 38px;
  color: #333;
  border-bottom: 1px solid #666;
}
.contentUser button{
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

.contentUser p {
  font-size: 14px;
  color: #ccc;
  margin-bottom: 30px;
}

.contentUser input::-webkit-input-placeholder {
  color: #ccc;
}

.contentUser .volidateNum {
  position: absolute;
  top: 70px;
  right: 25px;
  font-size: 12px;
  color: #ccc;
}

.contentUser #referCode {
  margin-top: 60px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
}

.contentUser .refer {
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin-top: 60px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background: #fff;
  color: #ccc;
}
.contentUser .active{
  border: 1px solid #333;
  background: #333;
  color: #fff;
}

.contentUser .listencode {
  font-size: 13px;
  color: #ccc;
  text-align: right;
}

.contentUser .listencode .getListen {
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  font-weight: bold;
}

.contentUser .telError {
  position: absolute;
  z-index: 10;
  top: 105px;
  left: 25px;
}

.contentUser .telError .telPhone {
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

.contentUser .telError .rightPhone {
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


</style>


  

