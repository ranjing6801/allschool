<template>
    <!--   创建班级完成  确认保存二维码弹窗 -->
    <div id="CreateClassOkModal"  @click="know">
        <h5 class="title">{{ saveTitle}}</h5>
        <p class="content">{{ saveContent }}</p>
        <p class="saveTip">{{ saveTip }}</p>
        <div class="saveBtn">
            <div class="btn btnLeft" @click="know">去保存</div>
            <div class="btn" @click="goToClassLeaderList">保存好了</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'saveModal',
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
        goToClassLeaderList(){
            // alert("goToClassLeaderList")
            // this.$router.push({path:'/CLYchooseClass'})
        }
    }
}
</script>

<style scoped>

#CreateClassOkModal .title {
  font-size: 18px;
  padding-top: 20px;
  padding-left: 20px;
}

#CreateClassOkModal .content {
  font-size: 20px;
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
  line-height: 2;
}

#CreateClassOkModal .saveTip {
  font-size: 16px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
}

#CreateClassOkModal .saveBtn {
  width: 100%;
  margin-left: 10%;
}

#CreateClassOkModal .saveBtn .btn {
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

#CreateClassOkModal .saveBtn .btnLeft {
  margin-right: 40px;
}


</style>



