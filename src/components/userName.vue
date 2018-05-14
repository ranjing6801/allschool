<template>
<div id="userName">
	<!--  head 部分 -->
    <div class="head">
        <div class="left">
            <img :src="imgSrc ? imgSrc : imgsrc1">
        </div>
        <div :class="isHeight?'height1':'height2'" class="right">
            <span>{{ title }}</span>
        </div>
    </div>
    <div class="contentUser">
        <input maxlength="20" placeholder="请输入您的真实姓名" type="text" v-model="userName" v-on:input="userNameFocus"  class="user" >
        <button class="refer" id="referName" :disabled="dis" @click="NamePromise" >提交</button>
    </div>

     <!--  重复认证弹窗 -->
      <div class="reVolidateModal" v-if="reVolidate" >
          <div class="reVolidate">
              <div id="modal">
                  <p class="titleListen">请勿重复认证</p>
                  <p class="contentListen"> 
                      您已是认证用户,请勿重复认证
                  </p>
                  <button class="Btn" @click="knowing">我知道啦</button>
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
import $ from 'jquery'
import overCount from './overCount'
import AuthenticationOk from './AuthenticationOk'
import NewAuthenticationOk from './NewAuthenticationOk' 
import CLNewTeacher from './CLNewTeacher' 
import imgsrc1 from '../../static/images/logo.jpg'


export default {  
    name:'userName',
    components:{
        overCount,AuthenticationOk,NewAuthenticationOk,CLNewTeacher
    },
    data(){
        return {
            imgsrc1:imgsrc1,
            title:sessionStorage.getItem('title'),
            imgSrc:sessionStorage.getItem('imgSrc'),
            userName:'',
            dis:false,
            errTitle:'您填写的教师姓名不存在',
            helpMessage:'您的反馈信息可以帮助我们及时更正哦',
            num:1,
            reVolidate:false, // 用户重复认证弹窗
            isHeight:false,
            offline:false,
        }
    },
    methods:{
        userNameFocus(){  // 聚焦
            if(this.userName.length > 0){
                  $('.refer').addClass('active');
                  $('.user').addClass('hot');
                    this.dis = false;
            }else{
                  $('.refer').removeClass('active');
                  $('.user').removeClass('hot');
                    this.dis = true;
            }
        },
        knowing(){
          this.reVolidate = false;
        },
        NamePromise(){ // 姓名验证 
          // 1 无整校班级 — 老用户 - 认证成功：打开晓黑板        user1/14444441120
          // 2 无整校班级 — 新用户 - 认证成功：打开晓黑板（账号密码）   user7 /14444441143 加 

          // 3 有整校班级 — 非班主任 — 老用户 - 认证成功：打开晓黑板     user2 /14444441121
          // 4 有整校班级 — 非班主任 — 新用户 - 认证成功：打开晓黑板（账号密码）   user8 /14444441152 加

          // 5 有整校班级 — 班主任 — 老用户 — 无晓黑板班级 - 创建班级 - 生成二维码 - 认证成功：打开晓黑板   user5/14444441125
          // 6 有整校班级 — 班主任 — 老用户 — 有晓黑板班级 - 认证班级/创建班级 - 认证成功：打开晓黑板       user3/ 14444441122
          // 7 有整校班级 — 班主任 — 新用户 — 无晓黑板班级 - 创建班级 - 生成二维码 - 认证成功：打开晓黑板  user6 / 144442241171  加
            console.log('输入的姓名是:',this.userName);
            console.log('您的手机号是:',sessionStorage.getItem('phone'));
            if(this.userName == ''){
                this.dis = true;
                return 
            }
            this.axios.post('/h5/index/getUserDetail',{
                    //name:'user12',
                    //phone:'14444441014'
                    name:this.userName,
                    phone:sessionStorage.getItem('phone')
                })
               .then( res => {
                  console.log('getUserDetail:',res);
                  if(res.data.response){
                    console.log('xhb_class:',res.data.response.xhb_class);
                        var obj = res.data.response;
                        sessionStorage.setItem('teacher_id',obj.teacher_id);  // 保存teacher_id
                        sessionStorage.setItem('user_token',obj.user_token);   // 保存user_token
                        sessionStorage.setItem('is_regular',obj.is_regular);   // 记录老用户还是新用户  
                        sessionStorage.setItem('is_class_director',obj.is_class_director);  // 记录是否是班主任
                        sessionStorage.setItem('is_has_school_class',obj.is_has_school_class);  // 记录是否有整校班级
                        sessionStorage.setItem('is_has_xhb_class',obj.is_has_xhb_class);  // 记录是否有晓黑板班级



                        if(obj.need_pull_class){
                          sessionStorage.setItem('need_pull_class',obj.need_pull_class); 
                        }
                        
                        this.$store.state.res1 = res.data.response.school_class;
                        this.$store.state.res2 = res.data.response.xhb_class;
                        
                        if(res.data.response.school_class){
                          for(var i = 0; i<this.$store.state.res1.length; i++){
                              this.$store.state.res1[i].xhb_class_token = '';  
                          }
                        }

                        // if(res.data.response.xhb_class){
                        //   for(var i = 0; i<this.$store.state.res2.length; i++){
                        //       this.$store.state.res2[i].hadBind = false;
                        //       this.$store.state.res2[i].index = i;
                        //       this.$store.state.res2[i].title = res.data.response.xhb_class[i].name;

                        //   }
                        // }

                        console.log('res1:',this.$store.state.res1);
                        console.log('res2:',this.$store.state.res2);
                        localStorage.setItem('res1',JSON.stringify(this.$store.state.res1));
                        localStorage.setItem('res2',JSON.stringify(this.$store.state.res2));

                      //1
                      if(obj.is_has_school_class==0 && obj.is_regular==1){
                        this.$router.push({path:'/PassOk',query:{}})
                      }
                      //2
                      if(obj.is_has_school_class==0 && obj.is_regular==0){
                        this.$router.push({path:'/NewAuthenticationOk',query:{}})
                      }
                      //3
                      if(obj.is_has_school_class==1 && obj.is_class_director==0 && obj.is_regular==1){
                        this.$router.push({path:'/PassOk',query:{}})
                      }
                      //4
                      if(obj.is_has_school_class==1 && obj.is_class_director==0 && obj.is_regular==0){
                        this.$router.push({path:'/NewAuthenticationOk',query:{}})
                      }
                      //5
                      if(obj.is_has_school_class==1 && obj.is_class_director==1 && obj.is_regular==1 && obj.is_has_xhb_class==0){
                        this.$router.push({path:'/CLNewTeacher',query:{}})
                      }
                      //6
                      if(obj.is_has_school_class==1 && obj.is_class_director==1 && obj.is_regular==1 && obj.is_has_xhb_class==1){            
                         this.$router.push({path:'/CLYchooseClass',query:{}})
                      }
                      //7
                      if(obj.is_has_school_class==1 && obj.is_class_director==1 && obj.is_regular==0 && obj.is_has_xhb_class==0){
                        this.$router.push({path:'/CLNewTeacher',query:{}})
                      }
                  }
                  if(res.data.error_response){
                    console.log('error_response');
                    // sessionStorage.setItem('school_id',res.data.error_response.school_id);
                    if(res.data.error_response.code==218){//姓名不存在
                        this.title = this.errTitle;   // 跳转之前 将title值覆盖
                        sessionStorage.setItem('keyword',res.data.error_response.keyword);
                        this.$router.push({path:'/overCountUser',query:{username:this.userName,title:this.title,helpMessage:this.helpMessage}})
                      }else if(res.data.error_response.code==219){//已经认证过
                        console.log('已经认证过');
                        this.reVolidate = true;
                    }
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
        }
    },
    mounted(){
        document.title = "填写姓名";
        this.title = sessionStorage.getItem('title');
        this.title.length > 14 ? this.isHeight=false : this.isHeight=true;
    }
}
</script>
<style scoped>

.head {
  width:9.2rem;
  height: 2.6667rem;
  /* margin-top:0.5333rem;
  margin-left:0.4rem; */
  margin: 0.5333rem auto;
  display: flex;
  background: #363636;
}
.head .left{
  width: 1.6rem;
  height: 1.6rem;
  margin-top:0.5333rem ;
  margin-left: 0.4rem;
  margin-right:0.2667rem;
}
.head .left img {
  width: 1.6rem;
  height:1.6rem;
  border-radius: 50%;
  display: block;

}

.head .right {
  height: 1.44rem;
  width: 7.8667rem;
  margin-top: 0.64rem;
  margin-right: 0.4rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
}
.height1{
  line-height: 1.44rem;
}
.height2{
  line-height: 0.6933rem;
}

.contentUser {
  width: 9.2rem;
  /* margin-top:0.5333rem;
  margin-left:0.4rem; */
  margin: 0.5333rem auto;
  box-sizing: border-box;
  position: relative;
}

.user{
  font-family: PingFangSC-Light;
  margin-top: 0.9333rem;
  width: 8.9333rem;
  height: 1.44rem;
  font-size: 0.4533rem;
  line-height: 0.4533rem;
  text-indent:  0.1333rem;
  outline: none;
  color: #fff;
  background: #2b2b2b;
  border-radius: 0;
  border-left: none;
  border-right: none;
  border-top: none;
  border-bottom:  2px solid #555555;
}
.hot{
  border-bottom:  2px solid #aaa;
}

.contentUser input::-webkit-input-placeholder {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #555555;
  line-height: 0.4533rem;
}

.contentUser .refer {
  width: 9.2rem;
  height: 1.28rem;
  margin-top: 1.6rem;
  text-align: center;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  background: #888888;
  border-radius: 0.0533rem;
  line-height: 0.4533rem;
  border: none;
}
.contentUser .active{
  background: #F8E71C;
}

/* 重复认证弹窗*/


.reVolidateModal {
  width: 100%;
  height: 100%;
  color: #fff;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}

.reVolidateModal .reVolidate {
  width: 8.9333rem;
  height: 4.7733rem;
  margin-left: 0.5333rem;
  margin-right: 0.5333rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.reVolidateModal .reVolidate #modal .titleListen {
  font-family: PingFangSC-Light;
  font-size: 0.5333rem;
  color: #FFFFFF;
  line-height: 0.5333rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.reVolidateModal .reVolidate #modal .contentListen {
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.6933rem;
  text-align: center;
  margin-top: 0.5333rem;
}

.reVolidateModal .reVolidate #modal .Btn {
    width: 8.1333rem;
    height: 1.28rem;
    background: #2B2B2B;
    font-family: PingFangSC-Regular;
    font-size: 0.4533rem;
    color: #000000;
    line-height: 0.4533rem;
    margin-top: 0.6667rem;
    margin-left: 0.4rem;
    border-radius: 0.0533rem;
    background: #F8E71C;
    border: none;
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


  

