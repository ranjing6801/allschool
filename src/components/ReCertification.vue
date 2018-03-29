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
<style scoped lang="scss">
@import  '../assets/css/variables.scss';
@import  '../assets/css/ReCertification.css';
</style>


