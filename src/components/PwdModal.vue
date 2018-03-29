<template>
    <!--  获取晓黑板账号密码   -->
  <div id="pwdModal">
    <h5 class="title">{{ accountTile  }}</h5>
    <p class="accountName">账号: {{ accountName }} </p>
    <p class="accountPwd">密码: {{ accountPwd }} (默认手机号后6位) </p>
    <div class="btn" @click="pwdKnow">我知道啦</div>
  </div>    
</template>

<script>
export default {
    name:'pwdModal',
    data(){
        return {

        }
    },
    props:{
       accountTile:{
            type:String,
            default:''
       },
       accountName:{
            type:Number,
            default:null
       },
       accountPwd:{
            type:Number,
            default:null
       }
    },
    methods:{
        pwdKnow(){
            this.$emit("changePwd")
        }
    }
}
</script>

<style scoped lang="scss" scoped>
@import  '../assets/css/variables.scss';      
@import  '../assets/css/PwdModal.css';
</style>


