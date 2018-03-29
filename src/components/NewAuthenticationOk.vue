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

<style lang="scss">
    @import  '../assets/css/variables.scss';      
    @import  '../assets/css/NewAuthenticationOk.css';
</style>


