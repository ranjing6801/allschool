<template>
	<!--  班主任 认证完班级之后  再创建的班级  -->
	<div id="createClass">
        <div class="classContent">
            <P>已为您创建以下晓黑板班级:</P>
            <ul >
                <li class="classList">
                    <div class="left">
                        <p >{{clName}} </p>
                        
                            <img :src="secImg">
                        
                        <p class="bot">{{clNum}}: {{clNumber}} 人</p>
                    </div>
                    <div class="right">
                        <img :src="zhiwenImg" alt="">
                        <p class="save">长按保存二维码</p>
                        <p class="saveSecond">用于发送给家长</p>
                        <p class="last">邀请他们进班</p>
                    </div>
                </li>
            </ul>
        </div>
        <mt-button class="referOk" size="large" @click="overRefer" >完成认证</mt-button>

        <!--  完成认证 确认保存二维码 弹窗 -->
        <div class="modalShow" v-if="isSave" @click="HiddenSaveModal" >
            <div class="modal">
                <CLcreateOkModal :saveTitle="saveTitle" :saveContent="saveContent" :saveTip="saveTip"
                	 @changeIsSaveModal="HiddenSaveModal">
                </CLcreateOkModal>
            </div>
        </div>
    </div> 
</template>

<script>
import secImg from  '../../static/images/secImg.jpg'
import zhiwenImg from  '../../static/images/time.png'
import CLcreateOkModal from './CLcreateOkModal'

export default {
	name:'createClass',
	components:{
		CLcreateOkModal    
	},
    data(){
        return {
            clName:'一年级一班',
            secImg:secImg,
            zhiwenImg:zhiwenImg,
            clNum:'小二班',
            clNumber:'45',
            isSave:false,
            saveTitle:'确认已保存',
            saveContent:'请确保您已保存二维码',
            saveTip:'将用于发送给家长,邀请他们进班',
        }
    },
    methods:{
        overRefer(){  // 认证完成
            this.isSave = true
        },
        HiddenSaveModal(){
            this.isSave = false
            //  创建完班级之后 跳转到班主任 班级的列表页
           	// this.$router.push({name:'CLYchooseClass'})

        }
    },
    mounted(){
        document.title = "创建班级"
    }
}


</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/CreateClass.css';

</style>