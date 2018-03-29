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
            alert("goToClassLeaderList")
            // this.$router.push({path:'/CLYchooseClass'})
        }
    }
}
</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/CreateClassOkModal.css';
</style>



