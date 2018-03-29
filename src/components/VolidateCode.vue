<template>
    <div id="volidateCode">
        <div class="head">
            <div class="left">
                <img :src="imgSrc">
            </div>
            <div class="right">
                {{ title }}
            </div>
        </div>
        <div class="content">
            <p class="tip" v-if="YZM">短信验证码已发送至 {{ number | value }} </p>
           <mt-field  placeholder="请输入验证码" type="tel" v-model="reCredNum" v-on:input="reCredNumFocus"></mt-field>
            <span class="volidateNum" @click="regetNum" v-if="reNum">重新获取验证码</span>
            <p v-if="listenCode" class="listencode">收不到验证码?
                <span  v-if="listenCode" class="getListen" @click="getListenCode">接听语音验证码</span>
            </p>
            <p class="telError"  v-show="isShowCode">
                <span class="telPhone" @click="clearCode" v-show="isShowCode"> × </span>
                <span class="rightPhone"></span>
            </p>
            <span class="volidateNum"  v-if="isTimer">{{ time }} s</span>
            <mt-button id="referCode" size="large" @click="codePromise" >验证码提交</mt-button>
        </div>
        <!-- 语音验证码  @listenModalHide="modalHidden" -->
        <div class="modalShow" v-if="isMolda"  @click="modalHidden">
            <div class="modal">
                <modal :codeTitle="codeTitle" @listenModalHide="modalHidden"></modal>
            </div>
        </div>
            <!--  验证码发送失败弹窗  -->
        <div class="codeFail" v-if="isCodeFail" @click="codeFailHidden">
            <div class="fail">
                <codeFail @codeFailChange="codeFailHidden"></codeFail>
            </div>
        </div>
    </div>
</template>


<script>
import imgSrc from  '../../static/images/logo.jpg'
import axios from 'axios'
import api from '../api/api'
import modal from './modal'
import codeFail from './codeFail'
import overCount from './overCount'
import userName from './userName'

export default {
    name:'volidateCode',
    components:{
        modal,codeFail,overCount,userName
    },
    data(){
        return {
                imgSrc:imgSrc,
                title:null,
                reCredNum:'',
                YZM:false,
                number:null,
                time:null,
                reNum:false,
                isTimer:false,
                count:0,
                listenCode:false,
                isMolda:false,
                isShowCode:false,
                isCodeFail:false,
                codeOverTime:'验证码发送次数已达上限',
                helpMessage:'您填写的信息可以帮助我们及时更正哦'
        }
    },
    props:{
        codeTitle:{
            type:String,
            default:'接收语音验证码'
        }
    },
    filters:{ // 过滤
        value(val){
            return  val.slice(0,4) +'-' + val.slice(4,9) + '-' + val.slice(9,15)
        }
    },
    methods:{
        codeFailHidden(){ // 验证码发送失败弹窗
            this.isCodeFail = false
        },
        clearCode(){   //  x  清楚错误验证码
            this.reCredNum = ''
            this.isShowCode = false
        },
        reCredNumFocus(){
            if(this.reCredNum){
                this.dis = false
                this.reNum = false
                document.querySelector('#referCode').style.background = "rgba(0,0,0,0.6)"
                document.querySelector('.mint-cell').style.borderBottom = "2px solid #666"
            }else{
                this.reNum = true
            }
        },
        getListenCode(){  // 获取语音验证码
            this.isMolda = true;
        },
        modalHidden(){  // 隐藏语音验证码弹窗
            this.isMolda = false;
            this.ShowNumber()
            this.reNum = false
        },
        regetNum(){ // 重新获取短信验证码
            this.reNum = false
            api.myGet("users",{id:'1'})
				   .then(res => {
					   console.log(res[0].id)
                        this.ShowNumber()
                        this.count++
                        if(this.count > 1){
                            console.log('请求超过2次,请稍后')
                            this.listenCode = true
                        }
                        if(this.count > 2){
                            console.log("验证码发送次数已达上限")
                            this.$router.push({path:'/overCount',query:{title:this.$route.query.title,helpMessage:this.helpMessage}})
                        }
				   })
				   .catch(err => {
					   // 手机号码验证错误
					   consoel.log(err)
					   document.querySelector('.mint-cell').style.borderBottom = "2px solid red"
				   })
        },
        ShowNumber(){  // 显示倒计时
            this.isTimer = true
            this.time = 60
            var timer = setInterval (() => {
                this.time -= 10
                if(this.time <= 0){
                    this.isTimer = false
                    clearInterval(timer)  // 清除定时器
                    this.reNum = true
                }
            },1000)
        },
        codePromise(){ // 验证码提交
            api.myGet("users",{id:'1',reCredNum:this.reCredNum}) 
               .then(res => {
                   console.log(res[0].id)
                   if(res[0].id == 1){  // 跳转到 userName
                       this.$router.push({path:'/userName',query:{title:this.$route.query.title}})
                   }

                   if(res[0].id == 2){  // 验证码错误
                        this.isShowCode = true
						document.querySelector(".rightPhone").innerHTML = "验证码错误"
                   }

                    if(res[0].id == 3){  // 验证码发送失败
                        this.isCodeFail = true
                        
                    }
               })  
               .catch(err => {

               })
        }

    },
    mounted(){
        // console.log(this.$route)
        this.YZM = true
        document.title = "输入验证码"
        this.ShowNumber()
        this.title = this.$route.query.title
        this.number = this.$route.query.phone
    }
}
</script>
<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/volidateCode.css';
</style>
