<template>
    <!-- 新用户输入姓名认证成功   -->
    <div id="newauthentication">  
        <div class="content">
            <p class="title">恭喜您成为校园认证用户</p>
            <p class="tips">现在起您可以免费享用「小黑板」提供的增值服务</p>
            <p class="password">晓黑板账号密码 <span class="check" @click="checkPwd">点击查看</span> 已通过短信发送给您</p>
        </div>
        <div class="footer">
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
        <div class="pwdModal" v-if="pwdModalShow" @click="isChangePwd">
            <div class="modalContent">
                <pwdModal :accountTile="accountTile" 
                          :accountName="accountName"
                          :accountPwd="accountPwd"  @changePwd="isChangePwd">
                 </pwdModal>
            </div>
        </div>
    </div>
</template>
<script>
import pwdModal from './pwdModal'
export default {
    name:'newauthentication',
    components:{
        pwdModal
    },
    data(){
        return{
            pwdModalShow:false,
            accountTile:'晓黑板账号密码',
            accountName:18616253090,
            accountPwd:253090
        }
    },
    methods:{
        openSmallDesk(){
            // 打开小黑板
            alert('打开小黑板')
        },
        checkPwd(){
            // 打开弹窗 modal弹窗 请求数据 向modal弹窗传参数
            this.pwdModalShow = true
        },
        isChangePwd(){
            
            this.pwdModalShow = false
        }
    },
    created(){
        document.title = "认证成功"
    }
}
</script>

<style scoped>
/*    @import  '../assets/css/variables.scss';      
    @import  '../assets/css/NewAuthenticationOk.css';*/

#newauthentication {
  width: 100%;
  height: 100%;
  line-height: 100%;
  box-sizing: border-box;
}

#newauthentication .content {
  width: 100%;
  height: 100%;
  padding-top: 50%;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  font-family: "微软雅黑";
}

#newauthentication .content .tips {
  font-size: 14px;
  letter-spacing: 1px;
  color: #ccc;
}

#newauthentication .content .password {
  font-size: 14px;
  letter-spacing: 1px;
  color: #ccc;
}

#newauthentication .content .password .check {
  font-weight: bold;
  color: #666;
}

#newauthentication .footer {
  margin-top: 50%;
}

#newauthentication .footer .footerTip {
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-bottom: -5px;
  text-align: center;
  color: #666;
}

#newauthentication .footer .btn {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 80%;
  height: 40px;
  margin-left: 10%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 0px;
}

#newauthentication .pwdModal {
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

#newauthentication .pwdModal .modalContent {
  width: 80%;
  height: 40%;
  margin-left: 10%;
  margin-right: 10%;
  position: absolute;
  top: -10%;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  background: #fff;
  overflow: hidden;
}


/*# sourceMappingURL=NewAuthenticationOk.css.map */



</style>


