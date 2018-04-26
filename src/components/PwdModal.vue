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

<style  scoped>

#pwdModal {
  font-size: 16px;
  font-weight: 600;
}

#pwdModal .title {
  font-size: 16px;
  padding-top: 20px;
  padding-left: 20px;
}

#pwdModal .accountName {
  color: #aaa;
  margin-top: 20px;
  padding-left: 40px;
  line-height: 2;
}

#pwdModal .accountPwd {
  color: #aaa;
  margin-top: 10px;
  padding-left: 40px;
  line-height: 2;
  margin-bottom: 30px;
}

#pwdModal .btn {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 70%;
  height: 40px;
  margin-left: 15%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 40px;
}



</style>


