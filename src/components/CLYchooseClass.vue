<template>
    <!-- 班主任 有班级 并选择班级认证 -->
  <div id="clychooseClass">
        <p class="leadTitle">您是{{ num }}个班级班主任, 请选择:</p>
        
        <!--   展示已经认证好了的班级  -->
        <!-- <ul>
            <li v-if="isCompleteClass" v-for="item in AtteCompleteClass" :key="item.index" 
                          class="classList"   @click="getDetail">
                <span class="className"> {{ item.name }}</span>  
                <span> ========></span>
                <span class="className"> {{ item.teamName }} </span>
                <span class="more"></span>
            </li>
        </ul> -->
        
         <!--  展示还没有认证的班级  -->
        <ul>
            <li v-for="item in classList" :key="item.index" class="classList" @click="getMore">
             <span class="className"> {{ item.name }}</span> 
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
        },
        classRefer(){  // 班级确认
            // 这里判断是否所有的班级都认证了,如果都认证了,按钮的状态为可点击,否则是不可点击状态
           

        }
    },
    mounted(){
        document.title = "认证班级";

        console.log(this.$route)
        this.num = this.$route.query.num;
        this.classList = this.$route.query.classList;
        // console.log ("this.classList=",this.classList) 
        // console.log ("this.num=",this.num) 


        // 认证成功 跳转回来 
        console.log("跳转回来=",this.$route)
        console.log("跳转回来this.$route.params=",this.$route.params)
        // this.AtteCompleteClass = this.$route.params
        this.isCompleteClass = true
        console.log("跳转回来之后的classList=",this.classList)
    }
}
</script>
<style scoped>

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

/*#clychooseClass #AttestationComple {
  background: rgba(0, 0, 0, 0.1);
}

#clychooseClass #AttestationComple #leadTitle {
  font-size: 16px;
  font-weight: 500;
  background: rgba(0, 0, 0, 0.2);
  padding-top: 20px;
  padding-bottom: 20px;
  padding-left: 20px;
}
*/
/*#clychooseClass #AttestationComple .classList {
  position: relative;
  font-size: 16px;
  height: 80px;
  line-height: 80px;
  padding-left: 40px;
  padding-right: 60px;
  margin-bottom: 10px;
  background: rgba(0, 0, 0, 0.1);
}

#clychooseClass #AttestationComple .classList .className {
  font-weight: bold;
}

#clychooseClass #AttestationComple .classList .more {
  font-size: 20px;
  position: absolute;
  right: 50px;
}

#clychooseClass #AttestationComple #AttestationComple {
  width: 80%;
  margin-left: 10%;
  position: fixed;
  bottom: 80px;
  border-radius: 25px;
  background: rgba(0, 0, 0, 0.5);
  color: orangered;
}
*/


</style>


