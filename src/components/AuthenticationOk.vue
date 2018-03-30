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

<style scoped>
/*// @import  '../assets/css/variables.scss';      
// @import  '../assets/css/authentication.css';*/


#authentication {
  width: 100%;
  height: 100%;
  line-height: 100%;
  box-sizing: border-box;
}

#authentication .content {
  width: 100%;
  height: 100%;
  padding-top: 50%;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  font-family: "微软雅黑";
}

#authentication .footer {
  margin-top: 50%;
}

#authentication .footer .footerTip {
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-bottom: -5px;
  text-align: center;
  color: #666;
}

#authentication .footer .btn {
  font-size: 20px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  width: 80%;
  height: 40px;
  margin-left: 10%;
  text-align: center;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 20px;
  margin-top: 0px;
}





</style>


