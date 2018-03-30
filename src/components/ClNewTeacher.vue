<template>
    <div id="CLNewTeacher">
        <div class="classContent">
            <P>已为您创建以下晓黑板班级:</P>
            <ul >
                <li class="classList">
                    <div class="left">
                        <p >{{clName}} </p>
                        
                            <img :src="secImg">
                        
                        <p class="bot">{{clNum}}: {{clNumber}}</p>
                    </div>
                    <div class="right">
                        <img :src="zhiwenImg" alt="">
                        <p class="save">长按保存二维码</p>
                        <p class="saveSecond">用于发送给家长</p>
                        <p class="last">邀请他们进班</p>
                    </div>
                </li>
                <!-- <li class="classList">
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
                </li> -->
            </ul>
        </div>
        <mt-button class="referOk" size="large" @click="overRefer" >完成认证</mt-button>
        <!--  完成认证 确认保存二维码 弹窗 -->
        <div class="modalShow" v-if="isSave" @click="HiddenSaveModal" >
            <div class="modal">
                <saveModal :saveTitle="saveTitle" :saveContent="saveContent" :saveTip="saveTip" @changeIsSaveModal="HiddenSaveModal"></saveModal>
            </div>
        </div>
    </div>    
</template>

<script>
    import secImg from  '../../static/images/secImg.jpg'
    import zhiwenImg from  '../../static/images/time.png'
    import saveModal from './saveModal'
export default {
    name:'CLNewTeacher',
    components:{
        saveModal
    },
    data(){
        return {
            clName:'一年级一班',
            secImg:secImg,
            zhiwenImg:zhiwenImg,
            clNum:'班级号',
            clNumber:'460540',
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
        }
    },
    mounted(){
        document.title = "创建班级并认证"
    }
}
</script>
<style scoped>
/*// @import  '../assets/css/variables.scss';
// @import  '../assets/css/CLNewTeacher.css';*/


#CLNewTeacher .classContent {
  width: 100%;
  height: 100%;
  padding: 30px;
  font-size: 16px;
  box-sizing: border-box;
}

#CLNewTeacher .classContent .title {
  padding-left: 30px;
  margin-bottom: 10px;
}

#CLNewTeacher .classContent .classList {
  list-style: none;
  margin-bottom: 20px;
  width: 100%;
  height: 100%;
  border: 1px solid #ccc;
  border-radius: 15px;
  float: left;
  margin-top: 10px;
}

#CLNewTeacher .classContent .classList .left {
  width: 44%;
  float: left;
  padding-left: 40px;
}

#CLNewTeacher .classContent .classList .left img {
  width: 65%;
  height: 100%;
  display: block;
  margin-top: 5px;
  margin-right: 10%;
  padding-right: 50px;
  border-right: 1px solid #ddd;
}

#CLNewTeacher .classContent .classList .left p {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  padding-left: 10px;
}

#CLNewTeacher .classContent .classList .left .bot {
  margin-bottom: 10px;
}

#CLNewTeacher .classContent .classList .right {
  float: left;
  width: 40%;
  margin-top: 10px;
  margin-left: 10px;
  color: #ccc;
}

#CLNewTeacher .classContent .classList .right img {
  width: 50%;
  height: 75%;
  padding-left: 8%;
  display: block;
  margin-left: 20%;
}

#CLNewTeacher .classContent .classList .right .save {
  font-size: 14px;
  margin-top: 10px;
  text-align: center;
}

#CLNewTeacher .classContent .classList .right .saveSecond {
  font-size: 12px;
  text-align: center;
}

#CLNewTeacher .classContent .classList .right .last {
  text-align: center;
  font-size: 12px;
}

#CLNewTeacher .referOk {
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

#CLNewTeacher .modalShow {
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

#CLNewTeacher .modalShow .modal {
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



</style>


