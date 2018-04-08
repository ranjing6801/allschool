<template>
    <div id="CLNewTeacher">
        <div class="classContent">
            <P class="create">已为您创建以下晓黑板班级:</P>
            <ul >
                <li class="classList">
                    <div class="left">
                        <!-- <p >{{clName}} </p> -->
                            <img :src="secImg">
                            <!-- <div class="line"></div> -->
                        <!-- <p class="bot">{{clNum}}: {{clNumber}}</p> -->
                    </div>
                  

                    <div class="right">
                        <img :src="zhiwenImg" alt="">
                        <p class="save">长按保存二维码</p>
                        <p class="saveSecond">
                          <span>用于发送给家长</span>
                          <span>邀请他们进班</span>
                        </p>
                    </div>
                </li>
                <!-- <li class="classList">
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
                </li> -->
            </ul>
        </div>

        <button class="referOk"  @click="overRefer" >完成认证</button>

        <!--  完成认证 确认保存二维码 弹窗 -->
        <div class="modalShow" v-if="isSave" @click="HiddenSaveModal" >
            <div class="modal">
                <saveModal  @changeIsSaveModal="HiddenSaveModal"></saveModal>
            </div>
        </div>
    </div>    
</template>

<script>
    import secImg from  '../../static/images/secImg.jpg'
    import zhiwenImg from  '../../static/images/zhiwen.png'
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
            isSave:true,
            // saveTitle:'确认已保存',
            // saveContent:'请确保您已保存二维码,将用于发送给家长,邀请他们进班'
            // // saveTip:'将用于发送给家长,邀请他们进班',
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

#CLNewTeacher .classContent {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#CLNewTeacher .classContent  p{
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
  margin-top: 0.5333rem;
  margin-left: 0.5333rem;
  
}

/*#CLNewTeacher .classContent .title {
  padding-left: 30px;
  margin-bottom: 10px;
}*/

#CLNewTeacher .classContent .classList {
  margin-bottom: 20px;
  width: 9.2rem;
  height: 4.7467rem;
  background: #FFFFFF;
  border-radius: 0.0533rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  margin-bottom: 0.5333rem;
  position: relative;
}

#CLNewTeacher .classContent .classList .left {
  width: 9.2rem;
  height: 4.7467rem;
  position: absolute;
  z-index: 5;


}

#CLNewTeacher .classContent .classList .left img {
  height: 3.6267rem;
  width: 2.6667rem;
  display: block;
  padding-top: 0.5067rem;
  margin-left: 0.96rem;
}

.line {
    height: 2.6667rem;
    width: 0.0267rem;
    display: block;
    position: absolute;
    top: 1.04rem;
    left: 4.5867rem;
    background: #F8F8F8;
}
/*#CLNewTeacher .classContent .classList .left p {
  font-size: 16px;
  font-weight: 600;
  margin-top: 10px;
  padding-left: 10px;
}*/

/*#CLNewTeacher .classContent .classList .left .bot {
  margin-bottom: 10px;
}
*/
#CLNewTeacher .classContent .classList .right {
  width: 9.2rem;
  height: 4.7467rem;
  /*background: #ccc;*/
}

#CLNewTeacher .classContent .classList .right img {
  width: 1.2533rem;
  height: 1.3333rem;
  padding-left: 6.2667rem;
  padding-top: 0.9333rem;
  display: block;

}

#CLNewTeacher .classContent .classList .right .save {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #000000;
  line-height: 0.3733rem;
  text-align: center;
  margin-left: 5.6rem;
  margin-top: 0.2667rem;
  width: 2.6133rem;
  height: 0.3733rem;
}

#CLNewTeacher .classContent .classList .right .saveSecond {
  width: 1.8667rem;
  height: 0.7467rem;
  text-align: center;
  margin-left: 5.9733rem;
  margin-top: 0.16rem;
  font-family: PingFangSC-Light;
  font-size: 0.2667rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
}

#CLNewTeacher .classContent .classList .right .last {
  text-align: center;
  font-size: 12px;
}

#CLNewTeacher .referOk {
  width: 9.2rem;
  height: 1.28rem;
  text-align: center;
  margin-left: 0.4rem;
  margin-top: 2.0rem;
  border-radius: 0.0533rem;
  background: #F8E71C;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
}

#CLNewTeacher .modalShow {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  z-index: 100;
}

#CLNewTeacher .modalShow .modal {
  width: 8.9333rem;
  height: 5.4667rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  position: absolute;
  top: 4.8267rem;
  left: 0;
}



</style>


