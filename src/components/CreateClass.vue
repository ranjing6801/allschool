<template>
	<!--  班主任 认证完班级之后  再创建的班级  -->
	<div id="createClass">
        <div class="classContent">
            <p class="create">已为您创建以下晓黑板班级:</p>
            <ul>
                <li class="classList">
                    <div class="left">
                        <img :src="imgSrc">
                    </div>
                    <div class="right">
                      <img :src="zhiwenImg">
                      <p class="save">长按保存二维码</p>
                      <p class="first saveSecond">用于发送给家长</p>
                      <p class="last saveSecond">邀请他们进班</p>
                    </div>
                    <img class="myimg" :src="imgSrc">
                     <!-- 二维码图片分割线 -->
                    <div class="line"></div>
                </li>
            </ul>
        </div>
        <button class="referOk"  @click="overRefer" >确认</button>

        <!--  完成认证 确认保存二维码 弹窗 -->
        <div class="modalShow" v-if="isSave">
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
	name:'createClass',
	components:{
		saveModal    
	},
    data(){
        return {
            createSecImg:'',
            zhiwenImg:zhiwenImg,
            isSave:false,
            indexValue:'',  // [点击创建班级认证 ]  记录 班主任 有班级 创建晓黑板班级的时候  传过来的 整校班级的id 
            imgSrc:'',
            imgArr:[],
            myclass:{},
            myLength:null,
            offline:false
        }
    },
    methods:{
        know(){
            this.isSave = false;
        },
        saveOk(){
            var obj = this.myclass;
            this.$store.state.res2.push(obj);

            var oIndex = this.indexValue;  //整校的索引
            var detail = obj.name;  //晓黑板的班级名字
            var num1 = obj.code;  //晓黑板的班级号

            sessionStorage.setItem(oIndex,num1); 
            
            var myobj = {index:oIndex,name:detail,sta:true,num1:num1};
            console.log('myobj:',myobj);
            
            this.$store.commit('setClass1',myobj);
            //  创建完班级之后 跳转到班主任 班级的列表页
           	this.$router.push({path:'CLYchooseClass'});
        },
        overRefer(){  // 认证完成
            this.isSave = true;
        },
        HiddenSaveModal(){
            this.isSave = false;
        },
        createClassData(){  // 班主任 有小黑板班级 老用户 创建班级认证
              this.axios.post('/h5/index/createSingleXhbClass',{
                      user_token:sessionStorage.getItem('user_token'),
                      class_name:this.$store.state.res1[this.indexValue].class_name,
                      xhb_class_num:this.myLength
                  })
                  .then(res => {
                        console.log('createSingleXhbClass=',res);
                        this.imgSrc = res.data.response.qrcode_url;
                        this.myclass = res.data.response.xhb_class;
                        // for(var i = 0;i<res.data.response.qrcode_url.length;i++){
                        //     var obj = {};
                        //     obj.src = res.data.response.qrcode_url[i];
                        //     this.imgArr.push(obj);
                        // }
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
    mounted(){
        document.title = "创建班级";
        this.indexValue = this.$route.query.index;
        console.log('this.indexValue=',this.indexValue);
        //测试的时候注释
        this.myLength = this.$store.state.res2.length;
        console.log('this.myLength=',this.myLength);
        this.createClassData();
    }
}

</script>

<style scoped>

#createClass .classContent {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

#createClass .classContent  .create{
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
  margin-top: 0.5333rem;
  margin-left: 0.5333rem;
}

#createClass .classContent .classList {
  width: 9.2rem;
  height: 4.7467rem;
  background: #FFFFFF;
  border-radius: 0.0533rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  margin-bottom: 7.7333rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

#createClass .classContent .classList .left {
  width: 4.5867rem;
  height: 4.7467rem;
  flex: 1;
}

#createClass .classContent .classList .left img {
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

#createClass .classContent .classList .right {
  width: 4.5867rem;
  height: 4.7467rem;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

#createClass .classContent .classList .right img {
  width: 1.2533rem;
  height: 1.3333rem;
  display: block;
}

#createClass .classContent .classList .right .save {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #000000;
  line-height: 0.3733rem;
  text-align: center;
  margin-top: 0.2667rem;
  height: 0.3733rem;
}

#createClass  .saveSecond {
  text-align: center;
  font-family: PingFangSC-Light;
  font-size: 0.2667rem;
  color: #AAAAAA;
  line-height: 0.3733rem;
}

#createClass  .first {
  margin-top: 0.16rem;
  margin-bottom: 0.08rem;
}


#createClass .referOk {
  display: block;
  width: 9.2rem;
  height: 1.28rem;
  text-align: center;
  margin: 0 auto 0.8rem;
  border-radius: 0.0533rem;
  background: #F8E71C;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
  border:none;
}

#createClass .modalShow {
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

#createClass .modalShow .modal {
  width: 8.9333rem;
  height: 5.4667rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.myimg{
  height: 4.7467rem;
  width: 4.5867rem;
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0.01;
  z-index: 9;
}

/* 弹窗*/
#createClass .modalShow {
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

#createClass .modal {
  width: 8.9333rem;
  height: 5.4667rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  position: absolute;
  top: 4.8267rem;
  left: 0;
}

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
</style>