<template>
  <div id="getClass">
    
    <!-- 已经认证完成的班级  可以取消对应列表 -->
    <!-- <ul>
      <p class="leadTitle">您是 {{ num }} 个班级班主任, 请选择:</p>
      <li  class="dataList" v-show="dataListShow" v-for="(item,index) in itemList" :key="index">
          <div class="vipLogo">
            <img src="/static/images/vip.png" >
          </div>

          <div class="teamClass">
            <p class="teamTitle">一年级8班 已对应</p>
            <p class="sun">{{ item.teamName }}</p>
          </div>

          <div class="cancle" @click="cancle">
            <img src="/static/images/cancle.png">
          </div>
      </li>
    </ul> -->

    <!--  班级列表页 -->
    <ul>
      <li class="checkList" v-if="checkList" v-for="(option,index) in optionList" :key="index">
        <div class="checkbox-group" v-if="!option.isbgShow">
          <input type="radio" :id="option.Members"  name="classChoose" :value=option.pid  v-model="team"  @change="change" />
          <label :for="option.Members"></label>
        </div>
        <div class="vipLogo" v-if="option.isbgShow">
            <img src="/static/images/vip.png" >
        </div>

        <div class="right" v-if="!option.isbgShow">
          <div class="logo"  v-if="!option.isbgShow">
              <img src="/static/images/logo.jpg" alt="" >
          </div>

          <div class="title">
   <!--  没有认证完成的班级 -->
              <p class="className" v-if="!option.isbgShow">   
                <span class="classTitle">{{ option.teamName }}</span>
              </p>
              <p class="classNumber" v-if="!option.isbgShow">
                  <span class="classNum common"></span> 
                  <span class="banjiNumber">{{ option.banjiNumber }}</span>
                  <span class="classCreater common"></span> 
                  <span class="created">{{ option.banjichuangjianzhe }}</span>
                  <span class="classMembers common"></span>
                  <span>{{ option.Members }}</span>
              </p>
          </div> 
        </div> 

   <!--  已经认证完成的班级 -->
        <div class="right" v-if="option.isbgShow">
          <div class="logo"  v-if="!option.isbgShow">
              <img src="/static/images/logo.jpg" alt="" >
          </div>

          <div class="title passTitle">
              <div class="teamClass" v-if="option.isbgShow">
                <p class="teamTitle">{{ option.teamShow}} 已对应</p>
              </div>
              <p class="className" v-if="option.isbgShow">
                <span class="classTitle">{{ option.teamName }}</span>
              </p>
              <div class="cancle" @click="cancle(option)">
                <img src="/static/images/cancle.png">
              </div>
          </div> 
        </div> 
      </li>
    </ul>

    <!--  创建班级去认证 -->
    <ul>
      <li class="checkList" v-if="checkList">
          <div class="checkbox-group">
              <input type="radio" name="classChoose" value="4" id="value" v-model="team" @change="change">
              <label for="value"></label>
          </div>
          <div class="textCreate" >
              <label for="create" class="createClass">创建新班级认证</label>
          </div>
      </li>
    </ul> 
    <!--  顶替弹窗 -->
    <div class="modalShow" v-if="isReCertificationShow" @click="ReCertificationShow" >
        <div class="modal">
            <ReCertification :accountTile="accountTile" :classTitle="classTitle" 
                :classUser="classUser" :accountReplace="accountReplace"
                     @ReCertification="ReCertificationShow">
            </ReCertification>
        </div>
    </div>
    <button class="referClass" :disabled="dis"  @click="getClassPromise" >确认</button>
  </div>
</template>
<script>

import axios from 'axios'
import $ from 'jquery'
import api from '../api/api'
import ReCertification from './ReCertification'

export default {
    name:'getClass',
    components:{
        ReCertification
    },
    data(){
        return {
            getClassId:'',  // 接收从CLYchooseClass 组件传过来的id
            value:'',
            num:2,
            itemList:[],  // 展示已经认证过的班级
            create:'',  // 选中  创建班级
            team:'',    // 检测是否 有选择一个班级
            dis:true,    // 按钮disabled属性
            isReCertificationShow:false,  // 重新认证 班级已经被人认证了  顶替弹窗
            accountTile:'重新验证该班级',
            classTitle:'一年级二班',
            classUser:'王宇娟' ,
            accountReplace:'您是否要顶替Ta,成为该班级班主任',
            dataListShow:true,  // 展示点击取消 已经认证好的班级
            checkList:true,     // 已经认证过的班级列表
        }
    },
    computed:{
      optionList(){
        console.log("optionList=",this.$store.state.res2);
        return  this.$store.state.res2
      }    
    },
    methods:{
        getClassListData(){  // 请求数据
            
        },
        getClassPromise(){ //  确认   
            /*
                1.第一种情况: 如果该班级没有被其他的班主任认证    点击确认跳转到 前面 班主任列表查询页
                2.第二种情况:如果在认证某一个班级的时候,他已经被其他老师认证过了,会提示弹窗
                3.第三种情况:就是 班级认证完了,创建班级 
            */
                if(this.team == '4'){
                    alert('班主任创建班级');
                }else{
                  // 选择班级认证
                   console.log("this.taem=",this.team);
                    this.$store.state.res1[this.getClassId].teamId = this.team;
                    this.$store.state.res1[this.getClassId].className = this.$store.state.res2[this.team].teamName;
                    this.$store.state.res2[this.team].teamShow = this.$store.state.res1[this.team].name;
                    console.log('$store.teamShow=',this.$store.state.res1[this.team].name);
                    this.$store.state.res1[this.getClassId].symbol = true;
                    this.$store.state.res2[this.getClassId].isbgShow = true;
                    this.$router.push({path:'/CLYchooseClass'});
                }
        },
        change(){ // 单选框change事件
            if(this.team+1){
                this.dis = false;
                $(".referClass").addClass('active');
            }
        },
        ReCertificationShow(){  // 关闭被顶替的弹窗
            this.isReCertificationShow = false;
        },
        cancle(obj){
          // alert("取消已经认证过的班级,重新认证");
          
          console.log('obj=',obj.pid);
          this.$store.state.res2[obj.pid].isbgShow = false;
          this.$store.state.res1[obj.pid].symbol = false;
       
        }
    },
    mounted(){
        document.title = '选择班级';
        this.getClassId = this.$route.query.userId;
        console.log(this.$route.query.userId);
    }
  
}

</script>

<style scoped>
/* 已经认证完成的班级列表样式 start*/
#getClass .vipLogo {
  width: 1.3067rem;
  height: 1.8667rem;
  display: flex;
  justify-content: center;
  align-items: center;
 
}

#getClass .vipLogo img{
  width: 0.64rem;
  height: 0.64rem;
  display: block;
}


#getClass .teamTitle {
  width: 3.1467rem;
  font-family: PingFangSC-Regular;
  font-size: 0.3733rem;
  color: #888888;
  line-height: 0.4533rem;
  margin-top: 0.3467rem;
}

#getClass .cancle {
    position: absolute;
    top: 0.6133rem;
    right: -0.6rem;
    justify-content: center;
    display: flex;
    align-items: center;
}
#getClass .cancle img {
  width: 2.16rem;
}

/* 已经认证完成的班级列表样式 end*/


#getClass .checkList {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  margin-left: 0.4rem;
  margin-top: 0.5333rem;
  position: relative;
}


/* 选择班级修饰input[type=radio]*/

#getClass .checkList .checkbox-group {
  width: 1.3067rem;
  height: 1.8667rem;
}

.checkbox-group input {
  display: none;
  opacity: 0;
}

.checkbox-group input[type=radio]+label {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  display: block;
  height: 1.8667rem;
}

.checkbox-group input[type=radio]+label:before {
  width: 0.64rem;
  height: 0.64rem;
  display: inline-block;
  line-height: 0.64rem;
  content: '';
  background: rgba(43,43,43,0.30);
  margin-left: 0.4rem;
  margin-right: 0.2667rem;
  margin-top: 0.64rem;
  color: #000;
  border: 1px solid #FFFFFF;
  border-radius: 50%;
}

.checkbox-group input[type=radio]:checked+label:before {
  content: '';
  background:url('../../static/images/radio.png') no-repeat center;
  background-size: 0.64rem 0.64rem;
  border-radius: 50%;
}


#getClass .checkList .right {
  height: 1.8667rem;
  width: 7.8933rem;
  position: absolute;
  top: 0px;
  right: 0;
  height: 100px;
  height: 1.8667rem;
  margin-left: 0.1333rem;
}

#getClass .logo {
  width: 1.3333rem;
  height: 1.8667rem;
  margin-right: 6.56rem;
}
.logo img {
    width: 1.3333rem;
    height: 1.3333rem;
    display: block;
    margin-top: 0.2667rem;
    border-radius: 0.2667rem;
}

#getClass  .title {
  height: 1.8667rem;
  width: 6.2667rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
  margin-left: 0.1333rem;
  position: absolute;
  top: 0;
  left:1.4533rem;
}

#getClass .className {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
  height: 0.4533rem;
  margin-top: 0.3733rem;
}
#getClass  .passTitle{
    position: absolute;
    top: 0;
    left: 0;
}

#getClass  .classTitle {
  display: inline-block;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
  /*margin-top: 0.3733rem;*/

}

.classNumber {
  margin-top: 0.2667rem;
  height:0.3733rem;
}
.banjiNumber{
  margin-right: 0.3467rem;

}
#getClass  .classNumber span {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #888888;
  line-height: 0.3733rem;
}

.common {
  height: 0.32rem;
  width: 0.32rem;
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #888888;
  line-height: 0.3733rem;
  display: inline-block;
  background-size: 0.32rem 0.32rem;
}
.classNum {
  background: url('../../static/images/classNum.png') no-repeat center;
}
.classCreater {
  background: url('../../static/images/classCreater.png') no-repeat center;
}
.created {
  margin-right: 0.4rem;
}
.classMembers {
  background: url('../../static/images/classMembers.png') no-repeat center;
}

#getClass .creatClass {
  width: 100%;
  position: relative;
}

.createClass {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
}
.textCreate {
    position: absolute;
    left: 1.44rem;
    top: 0.72rem;
}

#getClass .referClass {
  width: 9.2rem;
  height: 1.28rem;
  margin-left: 0.4rem;
  position: fixed;
  bottom: 0.8rem;
  border-radius: 0.0533rem;
  background: #AAAAAA;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
  border: none;
}
#getClass .active {
  background: #F8E71C;
}

#getClass .modalShow {
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

#getClass .modalShow .modal {
  width: 8.9333rem;
  height: 6.16rem;
  margin-left: 0.5333rem;
  margin-right:0.5333rem;
  position: absolute;
  top: 4.48rem;
  background: #2B2B2B;
  border: 0.0533rem solid #BBAB71;
  border-radius: 0.2667rem;
}
</style>

