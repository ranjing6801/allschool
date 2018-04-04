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
        <input maxlength="20" placeholder="请输入您的姓名" type="text" v-model="userName" v-on:input="userNameFocus"  class="user" >
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
                // {name:"一年级2班"},
                // {name:"一年级3班"}
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
            api.myGet("users",{id:6})
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
  text-indent: -0.1067rem;
}

.contentUser {
  width: 9.2rem;
  margin-top:0.5333rem;
  margin-left:0.4rem;
  box-sizing: border-box;
  position: relative;
}

.user{
  font-family: PingFangSC-Light;
  margin-top: 0.9333rem;
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

.contentUser input::-webkit-input-placeholder {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #555555;
  line-height: 0.4533rem;
}

.contentUser .refer {
  width: 9.2rem;
  height: 1.28rem;
  margin-top: 1.6rem;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  background: #888888;
  border-radius: 0.0533rem;
  line-height: 0.4533rem;
  border: none;
}
.contentUser .active{
  background: #F8E71C;
}

</style>


  

