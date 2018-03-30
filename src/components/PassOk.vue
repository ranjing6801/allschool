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

<style scoped>
/*@import  '../assets/css/variables.scss';
@import  '../assets/css/PassOk.css';*/


#passOk {
  width: 100%;
  height: 100%;
  line-height: 100%;
  box-sizing: border-box;
}

#passOk .content {
  width: 100%;
  height: 100%;
  padding-top: 50%;
  font-size: 20px;
  text-align: center;
  letter-spacing: 2px;
  font-family: "微软雅黑";
}

#passOk .content .share {
  font-size: 14px;
  letter-spacing: normal;
  color: #ccc;
}

#passOk .footer {
  margin-top: 50%;
}

#passOk .footer .footerTip {
  font-size: 14px;
  letter-spacing: 1.5px;
  margin-bottom: -5px;
  text-align: center;
  color: #666;
}

#passOk .footer .btn {
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


