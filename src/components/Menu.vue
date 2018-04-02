<template>
<div id="myMenu">
  <!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc">
        </div>
        <div class="right">
            {{ title }}
        </div>
    </div>
    <!--  content  -->
    <div class="content">
      <p class="tip" v-show="tip">无小黑板账号请输入手机号</p>
      <p class="telError"  v-show="isRightNumber">
        <span class="telPhone" @click="rightNumberTip" v-show="isRightNumber"> × </span>
        <span class="rightPhone">请填写正确的手机号码</span>
      </p>
    
      <mt-field @keyup.native="tel" type="tel" placeholder="请输入小黑板账号 / 手机号"  v-model="phone" v-on:input="focus" id="input" :attr="{ maxlength: 13 }">
      </mt-field>
      <button :class="!btn?'active':''" class="refer"  :disabled="btn" @click="telPromise" >手机号码提交</button>
    </div>
    
    <!--  验证码错误弹窗 -->
    <div class="codeFail" v-if="isCodeFailShow" @click="codeFailKnow" >
        <div class="fail">
            <div id="codeFailModal" >
              <p class="title">验证码发送失败</p>
              <p class="content-p">验证码发送失败, 请稍后重试</p>
              <div class="btn" @click="codeFailKnow">我知道啦</div>
            </div>
        </div>
    </div>
    
  
</div>
</template>

<script>
import imgSrc from  '../../static/images/logo.jpg'
import VolidateCode from './VolidateCode'
import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
	export default {
		name:'myMenu',
		data(){
			return {
				title:'苏州工业园二十一世纪实验幼儿园',  // 扫码进来后的标题
				imgSrc:imgSrc,
				tip:true,
				phone:'',
				btn:true,
				isRightNumber:false,
				count:null,
                isCodeFailShow:false
			}
		},
		watch:{ // 监听phone
            phone(newValue,oldValue){
                   this.phone = newValue > oldValue ? newValue.replace(/\s/g,'').replace(/(\d{3})(\d{0,4})(\d{0,4})/,'$1 $2 $3'):this.phone.trim()
            }
        },
		methods:{
			// x 
			rightNumberTip(){
				
			},
			focus(){
                //监听input输入框
                if(this.phone.length > 0){
                  $('.mint-cell').addClass('hot');
                }else{
                  $('.mint-cell').removeClass('hot');
                }
                if(this.phone.length == 13){
                  this.btn = false;
                }else{
                  this.btn = true;
                  this.isRightNumber = false;
                  $('.mint-cell').removeClass('red');
				}
			},
			telPromise(){  // 获取验证码
              console.log('点击按钮了..');
    				  //请求数据之前 要判断手机号是否合法
                let myphone = this.phone.split(' ').join('');
                if(!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(myphone))) {
                    this.isRightNumber = true;
                    console.log('myphone:',myphone);
                    $('.mint-cell').addClass('red');
                    $('.rightPhone').html('请填写正确的手机号码');
                    return;
                }
        
				api.myGet("users",{id:'4'})
				   .then(res => {
					  console.log(res[0].id)			   
						if(res[0].id == 1){   // 提示 该手机号已经加入其他学校
                              this.isRightNumber = true;
                              $('.rightPhone').html('该手机号已经加入其他学校');

						}else if(res[0].id==2){ // 手机号码验证错误
                              this.isRightNumber = true;
                              $('.mint-cell').addClass('red');
                              $('.rightPhone').html('请填写正确的手机号码');

                        }else if(res[0].id==3){
                          // 验证码发送失败

                          this.isCodeFailShow = true;

                        }else{
                          //手机号码验证成功  跳转 到验证码界面

                          sessionStorage.setItem("phone",this.phone)   // 将电话号码存储在 本地 
                          this.$router.push({name:'VolidateCode',query:{title:this.title,phone:this.phone}});
                          
                        }
				   })
				   .catch(err => {
					   // 手机号码验证错误
					   //this.isRightNumber = true;
                        //$('.mint-cell').addClass('red');
				   })
			},
			tel(){
				//禁止输入非数字
				this.phone = this.phone.replace(/[^\d]/g,'');
			},
            codeFailKnow(){
                this.isCodeFailShow = false;
            } 
		},
	    mounted(){
			document.title = "输入手机号";
		}
	}
</script>

<style scoped>
button{
  outline: none;
}
.head {
  width: 100%;
  height: 130px;
  display: flex;
  background: #eee;
  justify-content: center;
  align-items: center;
  
}
.head .left{
  width: 80px;
  height: 80px;
  margin-right: 20px
}
.head .left img {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: block;
}

.head .right {
  height: 60px;
  width: 250px;
  font-size: 16px;
  padding-top: 20px;
  font-weight: 600;
  color: #1f1e22;
}

.content {
  width: 100%;
  margin-top: 30px;
  padding-left: 25px;
  padding-right: 25px;
  box-sizing: border-box;
  position: relative;
}

.content p {
  font-size: 14px;
  color: #333;
  margin-bottom: 30px;
}

.content .mint-cell {
  height: 35px;
  width: 100%;
  font-size: 16px;
  outline: none;
  border: none;
  border-radius: 0;
  letter-spacing: 1px;
  text-indent: 10px;
  border-bottom: 2px solid rgba(150, 150, 150, 0.2);
}
.content .hot{
  border-bottom: 2px solid #333;
}
.content .red{
  border-bottom: 2px solid #CE0000;
}

.content .mint-cell input {
  line-height: 12;
}

.content input::-webkit-input-placeholder {
  color: #eee;
}

.content .volidateNum {
  position: absolute;
  top: 70px;
  right: 25px;
  font-size: 12px;
  color: #ccc;
}

.content .refer {
  width: 100%;
  height: 40px;
  font-size: 16px;
  margin-top: 60px;
  border-radius: 25px;
  border: 1px solid #ccc;
  background: #fff;
  color: #ccc;
}
.content .active{
  border: 1px solid #333;
  background: #333;
  color: #fff;
}

.content #referCode {
  margin-top: 60px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
}

.content #referName {
  margin-top: 60px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
}

.content .listencode {
  font-size: 13px;
  color: #ccc;
  text-align: right;
}

.content .listencode .getListen {
  position: relative;
  color: rgba(0, 0, 0, 0.6);
  font-size: 13px;
  font-weight: bold;
}

.content .telError {
  position: absolute;
  z-index: 10;
  top: 105px;
  left: 25px;
}

.content .telError .telPhone {
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

.content .telError .rightPhone {
  font-size: 12px;
  color: #333;
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

/*.codeFail {
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
}*/



/* 验证码错误弹窗*/
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



.codeFail .fail #codeFailModal {
  height: 100%;
  width: 100%;
}

.codeFail .fail #codeFailModal .title {
  font-size: 16px;
  padding-top: 20px;
  padding-left: 20px;
  font-weight: bold;
}

.codeFail .fail #codeFailModal .content-p {
  font-size: 18px;
  margin-top: 50px;
  padding-left: 30px;
  padding-right: 20px;
  line-height: 2;
  text-align: center;
}

.codeFail .fail #codeFailModal .btn {
  font-size: 16px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 50%;
  height: 40px;
  margin-left: 25%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 80px;
}

</style>