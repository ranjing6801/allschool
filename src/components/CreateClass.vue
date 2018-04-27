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
            myclass:{}
        }
    },
    methods:{
        overRefer(){  // 认证完成
            this.isSave = true;
        },
        HiddenSaveModal(){
            this.isSave = false;
            var obj = this.myclass;
            
            this.$store.state.res2.push(obj);

            var oIndex = this.indexValue;  //整校的索引
            var detail = obj.name;  //晓黑板的班级名字
            var num1 = obj.code;  //晓黑板的班级号
            

            var myobj = {index:oIndex,name:detail,sta:true,num1:num1};
            console.log('myobj:',myobj);
            this.$store.commit('setClass',myobj);
            //  创建完班级之后 跳转到班主任 班级的列表页
           	this.$router.push({path:'CLYchooseClass'})
        },
        createClassData(){  // 班主任 有小黑板班级 老用户 创建班级认证
              this.axios.post('/h5/index/createSingleXhbClass',{
                      user_token:sessionStorage.getItem('user_token'),
                      class_name:this.$store.state.res1[this.indexValue].class_name
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
                  })  
        } 
    },
    mounted(){
        document.title = "创建班级";
        this.indexValue = this.$route.query.index;
        console.log('this.indexValue=',this.indexValue);
        //测试的时候注释
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
  top: 4rem;
  left: 0;
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
</style>