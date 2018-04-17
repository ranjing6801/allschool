<template>
  <div id="clychooseClass">
        <p class="leadTitle">您是{{ num }}个班级班主任, 请选择:</p>
        <ul>
         <!--  展示还没有认证的班级  -->
            <li v-if="item.symbol" v-for="item in classList" :key="item.index" 
                    class="classList" @click="getDetail(item.classId)">
                <span class="className"> {{ item.name }}</span> 
                <p v-if="item.symbol" class="vBg"></p>
                <span class="classTeam"> {{ item.className}}</span>   
                <div class="over" v-if="item.symbol">
                    <img src='/static/images/over.png'>
                </div> 
                <span  class="more"></span>
            </li>

            <li v-if="!item.symbol" v-for="item in classList" :key="item.index" 
                    class="classList" @click="getMore(item.classId)">
                <span class="className"> {{ item.name }}</span> 
                <p v-if="item.symbol" class="vBg"></p>
                <span class="classTeam"> {{ item.className}}</span>   
                <div class="over" v-if="item.symbol">
                    <img src='/static/images/over.png'>
                </div> 
                <span  class="more"></span>
            </li>
        </ul>

      <button :class="!dis?'referBtn':''"  class="referName" :disabled="dis"  @click="classRefer">认证班级</button>
  </div>
</template>
<script>
export default {
    name:'clychooseClass',
    data(){
        return {
            num:3,       // 数量
           // classList:[],        // 所有班级列表
            // HavenClass:[],       // 保存从getClass跳转过来的已经认证好的班级
            dis:true,            // 按钮样式
            teamName:'',         // 认证班级的名称
            havenListShow:false, // 展示已经认证好的班级,
            id:1,                // 接收从userName 组件传过来的userId
            CLYTogetClassId:'',  // 接收从getClass 传过来的认证好了的班级id
            classListShow:true,
        }
    },
    computed:{
      classList(){
        // return  this.$store.state.res1;
      }
    },
    methods:{
        getClassList(){
            this.axios.post('/h5/index/getXhbClass',{
                    user_token:'58aac1fc0cf2e2b008585f7b'
                })
                .then(res => {
                    console.log('res=',res);
                    if(res.data.response){
                        // this.xhbClass = res.data.response.xhbClass
                    }
                    if(res.data.error_response){
                        if(res.data.error_response.code=201){
                            console.log('msg=',res.data.error_response.code);
                        }
                    }
                })
                .catch(err => {
                    console.log('err=',err);
                })

        },
        getMore(id){             // 跳转到getClass组件
            console.log("userID=",id);
            this.$router.push({ path:'/getClass',query:{userId:id}});
        },
        getDetail(passId){             //  认证完成之后点击展示 绑定的班级详细信息 
            console.log("passId=",passId);
            
            this.$router.push({path:'/getClass',query:{userId:passId}});
            
        },
        classRefer(){  // 班级确认
             // 这里判断是否所有的班级都认证了,如果都认证了,按钮的状态为可点击,否则是不可点击状态
             // 如果都认证完成了,跳转到认证成功
          

          if(1){  // 老用户 跳转到认证组件
              this.$router.push({path:'/PassOk'});
          }
          else{ // 新用户跳转到有弹窗的组件
             this.$router.push({path:'/NewAuthenticationOk'});
          }
        }
    },
    mounted(){
        document.title = "认证班级";
        this.getClassList();
        // 认证班级按钮的显示隐藏
        var result = this.$store.state.res1.every(function(el){
            if(el.symbol){
               return true;
            }  
        });
        if(result){
          this.dis = false;
        }
        
        
    }
}
</script>


<style scoped>
/* 已经认证完成的班级样式*/
#clychooseClass .havenList {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  line-height: 1.8667rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  position: relative;
}



#clychooseClass .vBg {
  display: inline-block;
  width:0.64rem;
  height: 0.64rem;
  background-size: 0.64rem 0.64rem;
  background: url('../../static/images/vip.png') no-repeat center;

}

#clychooseClass  .over {
  position: absolute;
  right: 0.8107rem;
  width:1.6587rem;
  height: 1.8667rem ;
  display: flex;
  justify-content: center;
  align-items: center;
}
#clychooseClass .over img{
  display: inline-block;
  margin-top: 0.1333rem;
  margin-left: 84.1.1307rem;
}


#clychooseClass .leadTitle {
  font-family: PingFangSC-Light;
  font-size: 0.3733rem;
  color: #888888;
  line-height: 0.3733rem;
  margin-top: 0.5333rem;
  margin-left: 0.5333rem;
}

#clychooseClass .classList {
  width: 9.2rem;
  height: 1.8667rem;
  background: #363636;
  border-radius: 0.0533rem;
  line-height: 1.8667rem;
  margin-top: 0.5333rem;
  margin-left: 0.4rem;
  position: relative;
  display:flex;
  /*justify-content:center;*/
  align-items: center;
}

#clychooseClass .classList .className {
  margin-left: 0.4rem;
  margin-right: 0.2667rem;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
}
.classTeam{
  font-family: PingFangSC-Light;
  font-size: 0.4533rem;
  color: #AAAAAA;
  line-height: 0.4533rem;
  margin-left: 0.2133rem;
}
#clychooseClass .classList .more {
  position: absolute;
  top: 0.7467rem;
  left: 8.5867rem;
  display: inline-block;
  width: 0.2133rem;
  height: 0.3733rem;
  line-height: 0.4533rem;
  background-size:0.2133rem  0.3733rem;
  background:url('../../static/images/more.png') no-repeat center;
}

#clychooseClass .referName {
  width: 9.2rem;
  height: 1.28rem;
  margin-left: 0.4rem;
  position: fixed;
  bottom: 60px;
  border-radius: 0.0533rem;
  background: #AAAAAA;
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #000000;
  line-height: 0.4533rem;
}

#clychooseClass .referBtn{
  background: #F8E71C;
}

</style>


