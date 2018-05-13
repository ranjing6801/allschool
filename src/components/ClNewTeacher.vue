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
        <div class="modalShow" v-if="isSecondImg">
            <div class="modal">
                <div id="saveModal">
                    <p class="title">确认已保存</p>
                    <p class="sure">请确保您已保存二维码</p>
                    <p class="content">将用于发送给家长,邀请他们进班</p>
                    <button class="Btn Btn-left" @click="know">去保存</button>
                    <button class="Btn Btn-rigth" @click="saveOk">保存好了</button>
                </div>
            </div>
        </div>

        <!--  完成认证 确认保存二维码 弹窗 -->
        <!-- <div class="modalShow" v-if="isSave" @click="HiddenSaveModal" >
            <div class="modal">
                <saveModal  @changeIsSaveModal="HiddenSaveModal"></saveModal>
            </div>
        </div> -->

        <!-- 网络不好 -->
        <div v-show="offline" class="pop">
          网络不佳，请检查后重试
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
            zhiwenImg:zhiwenImg,
            isSave:false,
            offline:false,
            isSecondImg:false,
            arr:[],
            imgSrc:{
                src:''
            },
            imgArr:[],
            img1:"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1524574592221&di=9c42ed71dd2fa31c0718badd1ee3ab20&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F018e5955490c260000019ae9bffba9.jpg%402o.jpg",
            img2:"http://school-dev.xiaoheiban.cn/h5/index/makeQrcode?class_code=334897&class_name=%E5%A4%A7%E5%A9%B6%E7%BA%A7+1+7%E7%8F%AD"
        }
    },
    methods:{
        overRefer(){  // 完成认证
            this.isSecondImg = true; // 出现二维码弹窗
        },
        know(){
            this.isSecondImg = false;
        },
        saveOk(){   // 点击 保存好了 
            console.log('创建晓黑板班级认证...');
                var pullArr = [] || sessionStorage.getItem('need_pull_class');
                console.log('pullArr:',pullArr);

                this.axios.post('/h5/index/bindInfo',{ 
                  bind_class : JSON.stringify(this.arr),
                  teacher_id : sessionStorage.getItem('teacher_id'),
                  phone : sessionStorage.getItem('phone'),
                  user_token : sessionStorage.getItem('user_token'),
                  need_pull_class : JSON.stringify(pullArr),
                  is_class_director : sessionStorage.getItem('is_class_director'),
                  is_regular : sessionStorage.getItem('is_regular'),
                  is_has_school_class : sessionStorage.getItem('is_has_school_class'),
                  is_has_xhb_class : sessionStorage.getItem('is_has_xhb_class')
                })
                .then(res => {
                  console.log('bindInfo:',res);
                  if(res.data.response){
                    if(sessionStorage.getItem('is_regular')){  // 1 是老用户 0 是新用户
                        this.$router.push({path:'/passOk'});    
                    }
                    else {
                        this.$router.push({path:'/NewAuthenticationOk'});
                    }
                  }
                  if(res.data.error_response){
                      console.log(res.data.error_response.msg);
                  }
                })
                .catch(err => {
                  console.log('err:',err);
                  this.offline = true;
                  clearTimeout(timer);
                  var _this = this;
                  var timer=null;
                  timer = setTimeout(function(){
                    _this.offline = false;
                  },2000);
                })

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
                this.arr = res.data.response.xhb_with_school;
                 console.log('this.imgArr=',this.imgArr);
                 console.log('this.arr=',this.arr);
            })
            .catch(err => {
                console.log('err=',err);
                this.offline = true;
                clearTimeout(timer);
                var _this = this;
                var timer=null;
                timer = setTimeout(function(){
                  _this.offline = false;
                },2000);
            })
        }
    },
    created(){
        
    },
    mounted(){
        document.title = "创建班级并认证";
        //本地测试的时候 注释掉
        this.createClass();
        // if(sessionStorage.getItem('create')=='yes'){
        //   this.createClass();
        // }else{
        //   console.log('不重复创建...');
        // }
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
  margin: 0 auto 0.8rem;
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
.pop{
  width: 6.0533rem;
  height: 0.9867rem;
  color: #fff;
  background: rgba(0, 0, 0, 0.6);
  position: fixed;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 99;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  text-align: center;
  line-height: 0.9867rem;
}


/**/ 

/*  保存二维码弹窗 */
#saveModal {
  width: 8.9333rem;
  height: 5.4667rem;
  background: #2B2B2B;
  border: 0.0267rem solid #BBAB71;
  border-radius: 0.2667rem;
  box-sizing: border-box;
}
#saveModal .title {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  margin-top: 0.5333rem;
  text-align: center;
}

#saveModal .content {
  width: 6.64rem;
  height: 1.3867rem;
  margin-left: 1.1467rem;
  margin-right: 1.1467rem;
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
}
#saveModal .sure {
    margin-top: 0.5333rem;
    text-align: center;
    font-family: PingFangSC-Light;
    font-size: 0.4533rem;
    color: #FFFFFF;
    line-height: 0.6933rem;
}

#saveModal  .Btn {
    width: 4.0rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #F8E71C;
    line-height: 0.4533rem;
    border-radius: 0.0533rem;
    border: none;
}

.Btn-left{
   margin-left: 0.4rem;
}
#saveModal .Btn-rigth{
  
  background:#F8E71C;
  color: #000000;
}
</style>


