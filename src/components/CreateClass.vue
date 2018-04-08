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
import zhiwenImg from  '../../static/images/zhiwen.png'
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

<style scoped>
/*@import  '../assets/css/variables.scss';
@import  '../assets/css/CreateClass.css';*/

#createClass .classContent {
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: 16px;
  box-sizing: border-box;
}

#createClass .classContent .title {
  padding-left: 30px;
  margin-bottom: 10px;
}

#createClass .classContent .classList {
  list-style: none;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 15px;
  float: left;
  margin-top: 10px;
}

#createClass .classContent .classList .left {
  width: 44%;
  float: left;
  padding-left: 30px;
}

#createClass .classContent .classList .left img {
  width: 80%;
  height: 100%;
  display: block;
  margin-top: 5px;
  margin-right: 10%;
  padding-right: 20px;
  border-right: 1px solid #ddd;
}

#createClass .classContent .classList .left p {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  padding-left: 10px;
}

#createClass .classContent .classList .left .bot {
  margin-bottom: 10px;
}

#createClass .classContent .classList .right {
  float: left;
  width: 40%;
  margin-top: 20px;
  margin-left: 10px;
  color: #ccc;
}

#createClass .classContent .classList .right img {
  width: 60%;
  height: 73%;
  margin-top: 0.13333rem;
  display: block;
  margin-left: 20%;
}

#createClass .classContent .classList .right .save {
  font-size: 16px;
  text-align: center;
}

#createClass .classContent .classList .right .saveSecond {
  font-size: 14px;
  text-align: center;
}

#createClass .classContent .classList .right .last {
  text-align: center;
  font-size: 14px;
}

#createClass .referOk {
  width: 80%;
  text-align: center;
  margin-left: 10%;
  margin-top: 100px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.5);
  color: orangered;
  position: fixed;
  bottom: 120px;
}

#createClass .modalShow {
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

#createClass .modalShow .modal {
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


/*# sourceMappingURL=CreateClass.css.map */



</style>