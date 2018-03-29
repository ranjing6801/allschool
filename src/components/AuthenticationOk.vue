<template>
    <!-- 老用户输入姓名认证成功   -->
    <div id="authentication">  
        <div class="content" slot="header">

            <p class="title">反馈成功</p>
            <p>我们将尽快处理,请耐心等候</p>
        </div>
        <div class="footer">
            <p class="footerTip">您可以使用「小黑板」,体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
    </div>
</template>

<script>
export default {
    name:'authentication',
    data(){
        return{

        }
    },
    methods:{
        openSmallDesk(){
            // 打开小黑板
            alert("打开小黑板")
        }
    },
    created(){
        document.title = "认证成功"
    }
}
</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';      
@import  '../assets/css/authentication.css';

</style>


