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
        <div class="contentUser">
            <mt-field  placeholder="请输入您的姓名" type="text" v-model="userName" v-on:input="userNameFocus"></mt-field>
            <mt-button id="referName" :disabled="dis" size="large" @click="NamePromise" >姓名提交</mt-button>
        </div>
    </div> 
</div>
</template>
<script>
import imgSrc from  '../../static/images/logo.jpg'
import axios from 'axios'
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
            userName:null,
            dis:false,
            errTitle:'您填写的姓名不存在',
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
            if(this.userName){
                this.dis = false
                document.querySelector('#referName').style.background = "rgba(0,0,0,0.6)"
                document.querySelector('.mint-cell').style.borderBottom = "2px solid #666"
            }
        },
        NamePromise(){ // 姓名验证 
            // var url = '/h5/index/';
            api.myGet("users",{id:'6'})
               .then( res => {
                //    console.log(res)
                //    console.log(res[0].id)

            // 姓名不存在的用户
                   if(res[0].id == 5){  // 姓名不存在
                        alert("姓名不存在")
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
        document.title = "输入姓名"
        this.title = this.$route.query.title
    }
}
</script>
<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/userName.css';
</style>


  

