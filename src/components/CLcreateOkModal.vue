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

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/CLcreateOkModal.css';
</style>



