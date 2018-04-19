<template>
  <div id="getClass">
    <ul>
  <!--  已经认证的班级列表页 -->      
      <li class="checkList box" v-if="option.vip" v-for="(option,index) in optionList" :key="option.index" @click="getId(index)">
        <div class="checkbox-group box"  v-if="!option.vip">
          <input type="radio" :id="option.code"  name="classChoose" :value="option.id"  v-model="team"  @change="change" />
          <label :for="option.code"></label>
        </div>
        
        <div class="vipLogo" v-if="option.vip">
            <img src="/static/images/vip.png" >
        </div>
        <div class="right">
          <div class="title passTitle">
              <div class="teamClass">
                <p class="teamTitle">{{ option.teamShow  | teacherName}} 已对应</p>
              </div>
              <p class="className1">
                <span class="classTitle">{{ option.name }}</span>
              </p>
              <div class="cancle" @click="cancle(index)">
                <img src="/static/images/ic.png" />
                <span>取消对应</span>
              </div>
          </div> 
        </div> 
      </li>


<!--  没有认证的班级列表页 -->
      <li class="checkList box2" v-if="!option.vip"  v-for="(option,index) in optionList" :key="option.index" @click="getId(index)">
        <div class="checkbox-group" v-if="!option.vip" >
          <input type="radio" :id="option.code"  name="classChoose" :value="option.id"  v-model="team"  @change="change" />
          <label :for="option.code"></label>
        </div>
        <div class="vipLogo" v-if="option.vip" >
            <img src="/static/images/vip.png" >
        </div>
        <div class="right">
          <div class="logo" v-if="!option.vip">
              <img :src="option.badgeId" alt="" >
          </div>
          <div class="title">
              <p class="className">   
                <span class="classTitle">{{ option.name  }}</span>
              </p>
              <p class="classNumber">
                  <img src="/static/images/classNum.png" class="classNum common" /> 
                  <span class="banjiNumber">{{ option.code }}</span>
                  <img src="/static/images/classCreater.png" class="classCreater common" /> 
                  <span class="created">{{ option.teacherName | teacherName}}</span>
                  <img src="/static/images/classMembers.png" class="classMembers common" />
                  <span>{{ option.membersCount }}</span>
              </p>
          </div> 
        </div> 
      </li>  
    </ul>
    <!--  创建班级去认证 -->
    <ul>
      <li class="checkList">
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
import ReCertification from './ReCertification'

export default {
    name:'getClass',
    components:{
        ReCertification
    },
    data(){
        return {
            logoSrc:'',
            getClassId:'',  // 接收从CLYchooseClass 组件传过来的id
            create:'',  // 选中  创建班级
            team:'',    // 检测是否 有选择一个班级
            dis:true,    // 按钮disabled属性
            isReCertificationShow:false,  // 重新认证 班级已经被人认证了  顶替弹窗
            accountTile:'重新验证该班级',
            classTitle:'一年级二班',
            classUser:'王宇娟' ,
            accountReplace:'您是否要顶替Ta,成为该班级班主任',
            valueId:''
        }
    },
    computed:{
      optionList(){
        // console.log("optionList=",this.$store.state.res2);
        return  this.$store.state.res2;
      }    
    },
    filters:{
      sliceValue(val){
        console.log(typeof val);
         if(val.length >= 10){
            return val.slice(0,5) + '...'+val.slice(5,11);
         } 
      },
      teacherName(value){
        if(value.length >= 6){
            return value.slice(0,2) + '...'+value.slice(2,5);
         }
      }
    },
    methods:{
        getXHBclass(){
          // this.axios.post('/h5/index/getXhbClass',{
          //         user_token:sessionStorage.getItem('user_token')
          //     })
          //     .then(res => {
          //       // console.log('getXhbClass=',res);
          //         // console.log('this.getClassId=',this.getClassId);
          //       var object = res.data.response;
          //       this.logoSrc = object.badgeId;
          //       this.$store.state.res2 = res.data.response.xhb_class;
                
                  
          //       console.log('res2=',this.$store.state.res2);
          //     })
          //     .catch(err => {
          //       console.log('getXhbClass=',err);
          //     })
        },
        getId(idvalue){
            // console.log('idvalue=',idvalue);
            this.idvalue = idvalue;
        },
        getClassPromise(){ //  确认   
            /*
                1.第一种情况: 如果该班级没有被其他的班主任认证    点击确认跳转到 前面 班主任列表查询页
                2.第二种情况:如果在认证某一个班级的时候,他已经被其他老师认证过了,会提示弹窗
                3.第三种情况:就是班级认证完了,创建班级 
            */
                if(this.team == '4'){
                    alert('班主任创建班级');
                    this.$router.push({path:'/ClNewTeacher'});
                }else{
                  // 选择班级认证
                        this.axios.post('/h5/index/isClassBind',{
                              xhb_class_token:this.$store.state.res2[this.idvalue].id
                            })
                            .then(res => {
                                console.log('res=',res);
                                this.$store.state.res1[this.getClassId].teamId = this.idvalue;
                                this.$store.state.res1[this.getClassId].name = this.$store.state.res2[this.idvalue].name;
                                this.$store.state.res1[this.getClassId].xhb_class_token = this.$store.state.res2[this.idvalue].id;
                                this.$store.state.res1[this.getClassId].symbol = true;
                                this.$store.state.res2[this.idvalue].teamShow = this.$store.state.res1[this.getClassId].class_name;
                                this.$store.state.res2[this.idvalue].vip = true;
                                console.log('res2=',this.$store.state.res2);
                                console.log('res1=',this.$store.state.res1);
                           
                                this.$router.push({path:'/CLYchooseClass'});
                            })
                            .catch(err => {
                                console.log('err=',err);
                            })   
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
        cancle(index){
          // alert("取消已经认证过的班级,重新认证");
          this.$store.state.res2[index].vip = false;
          this.$store.state.res1[index].symbol = false;  
          this.$store.state.res1[index].name = '的对应班级';
        }
    },
    mounted(){
        document.title = '选择班级';
        this.getClassId = this.$route.query.userId;
        // this.getXHBclass();
        // console.log('getClassId=',this.$route.query.userId);
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
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.16rem;
  height: 0.64rem;
  border: 1px solid #aaa;
  border-radius: 2.6667rem;
}
#getClass .cancle img {
  width: 0.3rem;
  margin-right: 0.1067rem;
}
#getClass .cancle span {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #AAAAAA;
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
  border: 1px solid transparent;
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
  margin-left: 0.1333rem;
  position: absolute;
  top: 0;
  left:1.4533rem;
}

#getClass .className {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  height: 0.4533rem;
  line-height: 0.4533rem;
  margin-top: 0.3733rem;
  margin-bottom: 0.2667rem;
}
#getClass .className1 {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  height: 0.4533rem;
  line-height: 0.4533rem;
  margin-top: 0.2667rem;
  margin-bottom: 0.2667rem;
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
}

.classNumber {
  height:0.3733rem;
  line-height: 0.3733rem;
  display: flex;
  align-items: center;
}
.banjiNumber{
  margin-right: 0.3467rem;

}
#getClass  .classNumber span {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #888888;
}

.common {
  height: 0.32rem;
  width: 0.32rem;
  font-family: PingFangSC-Light;
  color: #888888;
  margin-right: 0.1067rem;
  display: inline-block;
}
.created {
  margin-right: 0.4rem;
}
#getClass .creatClass {
  width: 100%;
  position: relative;
}

.createClass {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
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

