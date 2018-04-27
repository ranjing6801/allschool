<template>
    <div id="CLNewTeacher">
        <div class="classContent">
            <P class="create">已为您创建以下晓黑板班级:</P>
            <ul>
                <li class="classList"  v-for="item in imgArr" :key="item.index">
                    <div class="left">
                        <img :src="item.src">
                    </div>
                    <div class="right">
                        <img :src="zhiwenImg">
                        <p class="save">长按保存二维码</p>
                        <p class="first saveSecond">用于发送给家长</p>
                        <p class="last saveSecond">邀请他们进班</p>
                    </div>
                    <img class="myimg" :src="item.src">
                     
                    <div class="line"></div>
                </li>

                <!-- 本地测试打开 -->

                <!-- <li class="classList">
                    <div class="left">
                        <img :src="img1">
                    </div>
                    <div class="right">
                        <img :src="zhiwenImg">
                        <p class="save">长按保存二维码</p>
                        <p class="first saveSecond">用于发送给家长</p>
                        <p class="last saveSecond">邀请他们进班</p>
                    </div>
                    <img class="myimg" :src="img1">

                    <div class="line"></div>
                </li>
                <li class="classList">
                    <div class="left">
                        <img :src="img1">
                    </div>
                    <div class="right">
                        <img :src="zhiwenImg">
                        <p class="save">长按保存二维码</p>
                        <p class="first saveSecond">用于发送给家长</p>
                        <p class="last saveSecond">邀请他们进班</p>
                    </div>
                    <img class="myimg" :src="img1">

                    <div class="line"></div>
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
    import zhiwenImg from  '../../static/images/zhiwen.png'
    import saveModal from './saveModal'
export default {
    name:'CLNewTeacher',
    components:{
        saveModal
    },
    data(){
        return {
            secImg:secImg,
            zhiwenImg:zhiwenImg,
            isSave:false,
            imgSrc:{
                src:''
            },
            imgArr:[],
            img1:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524574592221&di=9c42ed71dd2fa31c0718badd1ee3ab20&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018e5955490c260000019ae9bffba9.jpg%402o.jpg",
            img2:"http://school-dev.xiaoheiban.cn/h5/index/makeQrcode?class_code=334897&class_name=%E5%A4%A7%E5%A9%B6%E7%BA%A7+1+7%E7%8F%AD"
        }
    },
    methods:{
        overRefer(){  // 认证完成
            this.isSave = true;
        },
        HiddenSaveModal(){
            this.isSave = false;
        },
        createClass(){
            this.axios.post('/h5/index/createXhbClass',{
                user_token:sessionStorage.getItem('user_token'),
                teacher_id:sessionStorage.getItem('teacher_id')
            })
            .then(res => {
                console.log('createXhbClass=',res);
                for(var i = 0;i<res.data.response.qrcode_url.length;i++){
                    var obj = {};
                    obj.src = res.data.response.qrcode_url[i];
                    this.imgArr.push(obj);
                }
                // console.log('this.imgArr=',this.imgArr);
            })
            .catch(err => {
                console.log('err=',err);
            })
        }
    },
    created(){
        
    },
    mounted(){
        document.title = "创建班级并认证";
        //本地测试的时候 注释掉
        this.createClass();
    }
}
</script>
<style scoped>

#CLNewTeacher .classContent {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#CLNewTeacher   .create{
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
  margin-top: 0.5333rem;
  margin-left: 0.5333rem;
}

#CLNewTeacher  .classList {
  width: 9.2rem;
  height: 4.7467rem;
  background: #FFFFFF;
  border-radius: 0.0533rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  margin-bottom: 0.5333rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#CLNewTeacher  .left {
  width: 4.5867rem;
  height: 4.7467rem;
  flex: 1;
}

#CLNewTeacher  .left img {
  height: 4.7467rem;
  width: 4.5867rem;
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

#CLNewTeacher  .right {
  width: 4.5867rem;
  height: 4.7467rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#CLNewTeacher  .right img {
  width: 1.2533rem;
  height: 1.3333rem;
  display: block;
}

#CLNewTeacher  .save {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #000000;
  line-height: 0.3733rem;
  text-align: center;
  margin-top: 0.2667rem;
  height: 0.3733rem;
}

#CLNewTeacher  .saveSecond {
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.2667rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
}

#CLNewTeacher  .first {
  margin-top: 0.16rem;
  margin-bottom: 0.08rem;
  
}


#CLNewTeacher .referOk {
  display: block;
  width: 9.2rem;
  height: 1.28rem;
  text-align: center;
  margin: 0 auto;
  margin-top: 2.0rem;
  border-radius: 0.0533rem;
  background: #F8E71C;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
  border:none;
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
  top: 4rem;
  left: 0;
}
.myimg{
    height: 4.7467rem;
    width: 4.5867rem;
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    opacity: 0.01;
    z-index: 9;
}


</style>


