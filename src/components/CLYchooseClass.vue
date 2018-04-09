<template>
    <!-- 班主任 有班级 并选择班级认证 -->
  <div id="clychooseClass">
        <p class="leadTitle">您是{{ num }}个班级班主任, 请选择:</p>
        
        <!--   展示已经认证好了的班级  -->
        <ul>
            <!-- <li v-for="item in havenClass" :key="item.index" class="classList"   @click="getDetail"> -->
            <li class="havenList"   @click="getDetail"> 
              <div  class="wrap">
                  <p class="classTitle"> 一年级1班</p>  
                  <p class="vBg"></p>
                  <p class="classContent">阳光中队</p>
              </div> 
              <div class="over" style="display:inline-block">
                <img src='../../static/images/over.png'>
              </div>  
              <div class="moreInfo">
                
              </div>
            </li>
        </ul>
        
         <!--  展示还没有认证的班级  -->
        <ul>
            <li v-for="(item,index) in classList" :key="item.index" class="classList" @click="getMore">
             <span class="className"> {{ item.name }}--{{index}}</span> 
             <span class="classTeam" > 的对应班级</span>   
             <span class="more" ></span>
            </li>
        </ul>

      <button id="referName" :disabled="dis"  @click="classRefer">认证班级</button>
  </div>
</template>
<script>
export default {
    name:'clychooseClass',
    data(){
        return {
            num:'',     // 数量
            classList:[], // 所有班级列表
            havenClass:[], // 已经认证完成的班级列表
            dis:true,   // 按钮样式
            isCompleteClass: true, //  是否完成了班级认证 
            // AtteCompleteClass:[], // 完成认证
            teamName:'',  // 认证班级的名称
        }
    },
    computed:{
        AtteCompleteClass(){ 
             
             return this.$store.state.getItems;   

        }
    },
    methods:{
        getMore(){
             // console.log("获取更多")  // 跳转到 选择班级组件
             console.log(this.classList)
            this.$router.push({ path:'/getClass',query:{list:this.classList,num:this.num}});
        },

        getDetail(){ //  认证完成之后点击展示 绑定的班级详细信息 
            alert("获取详细信息!")
            this.$router.push({path:'/getClass'})
        },
        classRefer(){  // 班级确认
            // 这里判断是否所有的班级都认证了,如果都认证了,按钮的状态为可点击,否则是不可点击状态
           // 如果都认证完成了,跳转到认证成功
          //  这里可以判断 classList  数组的长度是否为0 来显示按钮的是否可点击状态

        }
    },
    mounted(){
        document.title = "认证班级";

        // console.log(this.$route)
        this.num = this.$route.query.num;
        this.classList = this.$route.query.classList;
        // console.log ("this.classList=",this.classList) 
        // console.log ("this.num=",this.num) 


        // 认证成功 跳转回来 
        console.log("跳转回来=",this.$route)
        // console.log("跳转回来this.$route.params=",this.$route.params)
        // this.AtteCompleteClass = this.$route.params
        this.isCompleteClass = true
        // console.log("跳转回来之后的classList=",this.classList)
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
#clychooseClass .wrap {
  position: absolute;
  height: 1.8667rem;
  width: 6.7307rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
#clychooseClass .wrap p {
  /*display: inline-block;*/
}
#clychooseClass .classTitle {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
  margin-left: 0.4rem;
  margin-right: 0.2133rem;
}

#clychooseClass .vBg {
  display: inline-block;
  width:0.64rem;
  height: 0.64rem;
  background-size: 0.64rem 0.64rem;
  background: url('../../static/images/vip.png') no-repeat center;

}

#clychooseClass .classContent {
  font-family: PingFangSC-Regular;
  font-size: 0.4533rem;
  color: #FFFFFF;
  line-height: 0.4533rem;
  margin-left: 0.2133rem;
  margin-right: 1.1333rem;
}

#clychooseClass  .over {
  position: absolute;
  right: 0.8107rem;
  width:1.6587rem;
  height: 1.8667rem ;
}
#clychooseClass .over img{
  display: inline-block;
  width:1.6587rem;
  height: 1.6187rem;
  margin-top: 0.1333rem;
}


#clychooseClass .moreInfo{
  position: absolute;
  right: 0.4rem;
  bottom: 0.7467rem;
  width: 0.2133rem;
  height: 0.3733rem;
  margin-left:0.1973rem ;
  background-size: 0.2133rem 0.3733rem;
  background: url('../../static/images/more.png')no-repeat center;
}
/**/

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

#clychooseClass #referName {
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

</style>


