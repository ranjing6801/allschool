<template>
  <div id="ReCertification">
        <h5 class="content">{{ accountTile}}</h5>
        <p class=" title">{{ classTitle }}</p>
        <p class="saveTip">已被 {{ classUser }}   老师认证过</p>
        <p class="replace">{{ accountReplace }}</p>
        <div class="saveBtn">
            <div class="btn " @click="giveUp">取消</div>
            <div class="btn btnLeft" @click="Replace">顶替Ta</div>
        </div>
  </div>
</template>

<script>
export default {
    name:'ReCertification',
    props:["accountTile","classTitle","classUser","accountReplace"],
    data(){
        return {

        }
    },
    methods:{
        giveUp(){  // 取消
            // 弹窗隐藏
            this.$emit("ReCertification",true)
        },
        Replace(){  // 顶替Ta
            // 请求接口
            alert("顶替Ta")
        }
    }
}
</script>
<style scoped>
/*// @import  '../assets/css/variables.scss';
// @import  '../assets/css/ReCertification.css';*/

#ReCertification {
  line-height: 1.5;
}

#ReCertification .title {
  font-size: 18px;
  padding-top: 20px;
  padding-left: 20px;
  text-align: center;
}

#ReCertification .content {
  font-size: 16px;
  margin-top: 40px;
  padding-left: 30px;
  padding-right: 20px;
}

#ReCertification .saveTip {
  font-size: 18px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
  font-weight: bold;
}

#ReCertification .replace {
  font-size: 16px;
  padding-left: 30px;
  padding-right: 20px;
  text-align: center;
}

#ReCertification .saveBtn {
  width: 100%;
  margin-left: 10%;
}

#ReCertification .saveBtn .btn {
  float: left;
  height: 40px;
  font-size: 16px;
  text-align: center;
  margin-top: 50px;
  line-height: 40px;
  padding-left: 15px;
  padding-right: 15px;
}

#ReCertification .saveBtn .btnLeft {
  margin-right: 40px;
  border-radius: 20px;
  margin-left: 40px;
  background: rgba(0, 0, 0, 0.4);
  width: 40%;
  color: #fff;
}


</style>


