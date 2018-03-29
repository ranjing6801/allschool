<template>
    <div id="passOk">
        <div class="content" slot="header">
            <p class="title">恭喜成为校园认证用户</p>
            <p class="share">现在您可以免费享受「小黑板」提供的增值信息服务</p>
        </div>
        <div class="footer">
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
        <slot></slot>
  </div>
</template>
<script>
export default {
    name:'passOK',
    data(){
        return {

        }
    },
    methods:{
        openSmallDesk(){
            alert("小黑板")
        }
    },
    mounted(){
        document.title = '认证成功'
    }
}
</script>

<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/PassOk.css';
</style>


