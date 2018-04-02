<template>
    <!-- 老用户输入姓名认证成功   -->
    <div id="authentication">  
      <div v-if="isIOS" class="ios">
        <div class="content" slot="header">
            <p class="title">反馈成功</p>
            <p>我们将尽快处理,请耐心等候</p>
        </div>
        <div class="footer">
            <p class="footerTip">您可以使用「小黑板」,体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
      </div>
      <div v-if="isAND" class="android">
        <div class="content2">
            <p class="title">反馈成功</p>
            <p>我们将尽快处理,请耐心等候</p>
        </div>
        <div class="footer2">
            <p class="footerTip">您可以使用「小黑板」,体验高效的家校管理</p>
            <div class="btn" @click="openSmallDesk">打开小黑板</div>
        </div>
        <div class="img">
            <img src="/static/images/and.jpg" alt="">
        </div>
      </div>
    </div>
</template>

<script>
export default {
    name:'authentication',
    data(){
        return{
          isIOS: true,
          isAND: false
        }
    },
    methods:{
        openSmallDesk(){
            // 打开小黑板
            alert("打开小黑板")
        }
    },
    created() {
        document.title = "反馈成功"
    },
    mounted() {
      //判断手机类型
      var ua = navigator.userAgent.toLowerCase();

      if(/android/.test(ua)){
          console.log('android...');
          this.isAND = true;
          this.isIOS = false;
        }

      if(/iphone|ipad|ipod/.test(ua)){
          console.log('ios...');
          this.isIOS = true;
          this.isAND = false;
        }
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
}
.content2{
  width: 100%;
  height: 100%;
  padding-top: 10%;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
}

#authentication .footer {
  margin-top: 50%;
}
.footer2{
  margin-top: 2%;
  margin-bottom: 4%;
}
.footer2 .footerTip{
  font-size: 14px;
  letter-spacing: 1.5px;
  text-align: center;
  color: #666;
}

#authentication .footer .footerTip {
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-bottom: -5px;
  text-align: center;
  color: #666;
}

.btn {
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
.img{
  text-align: center;
}




</style>


