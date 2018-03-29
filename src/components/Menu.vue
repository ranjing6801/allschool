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
		
		<mt-field @keyup.native="tel" type="tel" placeholder="请输入小黑板账号 / 手机号"  v-model="phone" v-on:input="focus" id="input" :attr="{ maxlength: 11 }">
        </mt-field>
		<mt-button  class="refer" :disabled="dis" size="large" @click="telPromise" >手机号码提交</mt-button>
    </div>
</div>
</template>

<script>
import imgSrc from  '../../static/images/logo.jpg'
import VolidateCode from './VolidateCode'
import axios from 'axios'
import api from '../api/api'
	export default {
		name:'myMenu',
		data(){
			return {
				title:'苏州工业园二十一世纪实验幼儿园',  // 扫码进来后的标题
				imgSrc:imgSrc,
				tip:true,
				phone:'',
				dis:false,
				isRightNumber:false,
				count:null
			}
		},
		watch:{ // 监听phone
                // phone(newValue,oldValue){
                //     this.phone = newValue > oldValue ? newValue.replace(/\s/g,'').replace(/(\d{3})(\d{0,4})(\d{0,4})/,'$1 $2 $3'):this.phone.trim()
                // }
    	},
		methods:{
			// x 
			rightNumberTip(){
				
			},
			focus(){
				if(this.phone.length>10){
					console.log(this.phone);
					this.dis = false
					document.querySelector('.refer').style.background = "rgba(0,0,0,0.6)"
					document.querySelector('.mint-cell').style.borderBottom = "2px solid #666"
				}else{

				}
			},
			telPromise(){  // 获取验证码
				// 请求数据之前 要判断手机号是否合法( 不合法提示 请输入正确的手机号码)
				api.myGet("users",{id:'2'})
				   .then(res => {
					   console.log(res[0].id)			   
						if(res[0].id == 1){   // 提示 该手机号已经加入其他学校
							console.log(document.querySelector(".rightPhone"))
							this.isRightNumber = true
							document.querySelector(".rightPhone").innerHTML = "该手机号已经加入其他学校"
						}

						else{ //跳转 到验证码界面
							
							  this.$router.push({name:'VolidateCode',query:{title:this.title,phone:this.phone}})
						}

					 
						
				   })
				   .catch(err => {
					   // 手机号码验证错误
					   consoel.log(err)
					   this.isRightNumber = true
					   document.querySelector('.mint-cell').style.borderBottom = "2px solid red"
				   })
			},
			tel(){
				//禁止输入非数字
				this.phone = this.phone.replace(/[^\d]/g,'');
			}
		},
	    mounted(){
			document.title = "输入手机号"
			
		}
	   
	}


</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/Menu.css';
</style>