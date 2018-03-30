<template>
    <!--   创建班级完成  确认保存二维码弹窗 -->
    <div id="CLcreateOkModal"  @click="know">
        <h5 class="title">{{ saveTitle}}</h5>
        <p class="content">{{ saveContent }}</p>
        <p class="saveTip">{{ saveTip }}</p>
        <div class="saveBtn">
            <div class="btn btnLeft" @click="know">去保存</div>
            <div class="btn" @click="NewClcreated">保存好了</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'CLcreateOkModal',
    data(){
        return {

        }
    },
    props:{
        saveTitle:{
            type:String,
            default:''
        },
        saveContent:{
            type:String,
            default:''
        },
        saveTip:{
            type:String,
            default:''
        }
    },
    methods:{
        know(){
            this.$emit("changeIsSaveModal")
        },
        NewClcreated(obj){
            alert("班主任新用户创建班级成功")
           this.$router.push({path:'/NewAuthenticationOk'})
        }
    }
}
</script>

<style scoped>
/*@import  '../assets/css/variables.scss';
@import  '../assets/css/CLcreateOkModal.css';*/

#CLcreateOkModal .title {
  font-size: 18px;
  padding-top: 20px;
  padding-left: 20px;
}

#CLcreateOkModal .content {
  font-size: 20px;
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
  line-height: 2;
}

#CLcreateOkModal .saveTip {
  font-size: 16px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
}

#CLcreateOkModal .saveBtn {
  width: 100%;
  margin-left: 10%;
}

#CLcreateOkModal .saveBtn .btn {
  float: left;
  height: 40px;
  font-size: 16px;
  text-align: center;
  margin-left: 20px;
  color: #fff;
  margin-top: 50px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.4);
}

#CLcreateOkModal .saveBtn .btnLeft {
  margin-right: 40px;
}


</style>



