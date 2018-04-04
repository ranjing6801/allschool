<template>
  <div id="getClass">
    <ul>
      <li class="checkList" v-for='option in options' :key="option.index">
        <div class="checkbox-group ">
          <input type="radio" :id="option.name" name="classChoose" :value="option.name" 
                     v-model="team"  @change="change" />
          <label :for="option.name"></label>
        </div>
        <div class="right">
          <div class="logo">
              <img src="" alt="">
          </div>
          <div class="title">
              <p class="className">
                <span class="classTitle">{{ teamName}} </span>

                <span class="num">({{ classNum }}人)</span>
              </p>
              <p class="classNumber">
                  <span>班级号:</span> <span>{{ banjiNumber }}</span>
                  <span>创建者:</span> <span>{{ banjichuangjianzhe }}</span>
              </p>
          </div> 
        </div> 
      </li>
    </ul>
    <ul>
      <li class="creatClass">
          <div id="Clcreateclass">
              <input type="radio" name="classChoose" id="create" v-model="team">
              <label for="create"></label>
          </div>
          <div class="rightClass" >
              <label for="create" class="create">创建新班级认证</label>
          </div>
      </li>
    </ul> 

    <div class="modalShow" v-if="isReCertificationShow" @click="ReCertificationShow" >
        <div class="modal">
            <ReCertification :accountTile="accountTile" :classTitle="classTitle" 
                :classUser="classUser" :accountReplace="accountReplace"
                     @ReCertification="ReCertificationShow">
            </ReCertification>
        </div>
    </div>
    <mt-button id="referClass" :disabled="dis" size="large" @click="getClassPromise" >确认</mt-button>
    </div>
</template>
<script>
import axios from 'axios'
import api from '../api/api'
import ReCertification from './ReCertification'

export default {
    name:'getClass',
    components:{
        ReCertification
    },
    data(){
        return {
            value:'',
            radioValue:'',
            num:null,
            options:[],  //  
            create:'',  // 选中  创建班级
            team:'',    // 检测是否 有选择一个班级
            teamName:'阳光中队',  // 班级名称
            banjiNumber:'123654',   // 班级号
            banjichuangjianzhe:'王姐姐',   //  班级创建者 如果不知道真实姓名下展示小黑板账号
            classNum:32  ,  // 班级中的人数
            dis:true,    // 按钮disabled属性
            isReCertificationShow:false,  // 重新认证 班级已经被人认证了  顶替弹窗
            accountTile:'重新验证该班级',
            classTitle:'一年级二班',
            classUser:'王宇娟' ,
            accountReplace:'您是否要顶替Ta,成为该班级班主任'
        }
    },
    methods:{
        getClassListData(){  // 请求数据
            
        },
        getClassPromise(){ //  确认   
            /*
                1.第一种情况: 如果该班级没有被其他的班主任认证    点击确认跳转到 前面 班主任列表查询页
                2.第二种情况:如果在认证某一个班级的时候,他已经被其他老师认证过了,会提示弹窗
                3.第三种情况，就是 班级认证完了，创建班级 
            */
            console.log('确认班级认证')
            api.myGet("users",{id:'6'})
                .then(res => {
                    // console.log(res)
                     // 请求接口,数据判断 
                    if(res[0].id == 6){  // 第一种情况: 如果该班级没有被其他的班主任认证    点击确认跳转到 前面 查询 班主任的列表页
                        let data = [{
                            name: this.$route.query.list[0].name,
                            num:this.num,
                            teamName:this.teamName
                        }]
                        console.log("data=",data)
                        this.$router.push({name:'CLYchooseClass',params:data})    
                    }

                    if(res[0].id == 4){   // 第二种情况:如果在认证某一个班级的时候,他已经被其他老师认证过了,会提示弹窗
                         this.isReCertificationShow = true
                    }


                    if(res[0].id == 7){ // 第三种情况，就是 班级认证完了，创建班级
                        alert("开始创建班级")
                        this.$router.push({name:'CreateClass'})
                    }
                })
                .catch(err => {
                    console.log(err)
                })
        },
        change(){ // 单选框change事件
          console.log(this.team)
            if(this.team){
                this.dis = false
                document.querySelector("#referClass").style.background="rgba(0,0,0,0.6)"
            }
        },
        ReCertificationShow(){  // 关闭被顶替的弹窗
               this.isReCertificationShow = false
        }
    },
    mounted(){
        document.title = '选择班级'
        // 进入到这个组件  请求数据
        // console.log('options:',this.options);
        this.options = this.$route.query.list
         this.num = this.$route.query.num
         console.log(this.$route.query)
         console.log(this.options);
    },
}

</script>


<style scoped>
/*@import  '../assets/css/variables.scss';
@import  '../assets/css/getClass.css';*/

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
  width: 50px;
  height: 100px;
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
  line-height: 100px;
  text-align: center;
  width: 50px;
  height: 100px;
  background: red;
}

.checkbox-group input[type=radio]+label:before {
  line-height: 20px;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  content: '';
  color: #fff;
  border: 1px solid #dce4e6;
  background-color: #f3f6f8;
  border-radius: 50%;
}

.checkbox-group input[type=radio]:checked+label:before {
  content: '\2713';
  color: #fff;
  background-color: #31b968;
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  border-color: #31b968;
}


/* 创建班级修饰input[type=radio]*/

#getClass .checkList #Clcreateclass {
  width: 60px;
  height: 70px;
}

#Clcreateclass input {
  display: none;
  opacity: 0;
}

#Clcreateclass input[type=radio]+label {
  display: flex;
  -webkit-box-align: center;
  -webkit-align-items: center;
  -ms-flex-align: center;
  display: block;
  line-height: 70px;
  text-align: center;
  width: 50px;
  height: 70px;
  background: red;
}

#Clcreateclass input[type=radio]+label:before {
  line-height: 20px;
  display: inline-block;
  width: 18px;
  height: 18px;
  margin-right: 8px;
  content: '';
  color: #fff;
  border: 1px solid #dce4e6;
  background-color: #f3f6f8;
  border-radius: 50%;
}

#Clcreateclass input[type=radio]:checked+label:before {
  content: '\2713';
  color: #fff;
  background-color: #31b968;
  border-radius: 50%;
  font-size: 16px;
  text-align: center;
  border-color: #31b968;
}


/* 创建班级修饰input[type=radio]*/

#getClass .checkList .right {
  position: absolute;
  top: 0px;
  right: 0;
  height: 100px;
  background: #ccc;
  width: calc(100% - 50px);
  margin-left: 50px;
}

#getClass .checkList .right .logo {
  width: 50px;
  height: 100px;
  background: lime;
}

#getClass .checkList .right .title {
  font-size: 18px;
  height: 100px;
  width: calc(100% - 50px);
  position: absolute;
  top: 0px;
  left: 60px;
}

#getClass .checkList .right .title .className {
  font-size: 18px;
  height: 50px;
  line-height: 75px;
}

#getClass .checkList .right .title .className .classTitle {
  font-size: 16px;
}

#getClass .checkList .right .title .className .num {
  color: #666;
  font-size: 16px;
}

#getClass .checkList .right .title .classNumber {
  font-size: 14px;
  color: #fff;
  height: 50px;
  line-height: 25px;
}

#getClass .checkList .right .title span {
  font-size: 14px;
  margin-right: 10px;
}

#getClass .checkList .right .createClass {
  font-size: 18px;
  margin-left: 20px;
}

#getClass .creatClass {
  width: 100%;
  position: relative;
}

#getClass .creatClass .create {
  height: 70px;
  width: calc(100% - 50px);
  background: #ccc;
  position: absolute;
  top: 0;
  left: 50px;
  padding-left: 20px;
  line-height: 70px;
  font-size: 18px;
}


#getClass .checkList .rightClass {
  position: absolute;
  top: 0;
  left: 50px;
  font-size: 18px;
  padding-left: 20px;
  line-height: 60px;
  background: #666;
  width: calc(100% - 50px);
}

#getClass #referClass {
  width: 80%;
  margin-left: 10%;
  position: fixed;
  bottom: 120px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.1);
  color: orangered;
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

