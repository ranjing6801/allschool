<template>
    <!-- 班主任 有班级 并选择班级认证 -->
  <div id="clychooseClass">
        <p class="leadTitle">您是{{ num }}个班级班主任, 请选择:</p>
        
        <!--   展示已经认证好了的班级  -->
        <ul>
            <li v-if="isCompleteClass" v-for="item in AtteCompleteClass" :key="item.index" class="classList"  
                                                                            @click="getDetail">
                <span class="className"> {{ item.name }}</span>  
                <span> ========></span>
                <span class="className"> {{ item.teamName }} </span>
                <span class="more"> > </span>
            </li>
        </ul>
        
         <!--  展示还没有认证的班级  -->
        <ul>
            <li v-for="item in classList" :key="item.index" class="classList" @click="getMore">
             <span class="className"> {{ item.name }}</span>  的对应班级   <span class="more" > > </span>
            </li>
        </ul>

      <mt-button id="referName" :disabled="dis" size="large" @click="classRefer" >认证班级
      </mt-button>
  </div>
</template>
<script>
export default {
    name:'clychooseClass',
    data(){
        return {
            num:'',
            classList:[],
            dis:true,
            isCompleteClass: false, //  是否完成了班级认证 
            AtteCompleteClass:[], // 完成认证
            teamName:'',  // 认证班级的名称
        }
    },
    methods:{
        getMore(){
             // console.log("获取更多")  // 跳转到 选择班级组件
             // console.log(this.classList)
            this.$router.push({ path:'/getClass',query:{list:this.classList,num:this.num}})
        },
        getDetail(){ //  认证完成之后点击展示 绑定的班级详细信息 
            
        },
        classRefer(){  // 班级确认
            // 这里判断是否所有的班级都认证了,如果都认证了,按钮的状态为可点击,否则是不可点击状态
        }
    },
    mounted(){
        document.title = "认证班级"
        // console.log(this.$route)
        this.num = this.$route.query.num
        this.classList = this.$route.query.classList
        console.log ("this.classList=",this.classList) 
        console.log ("this.num=",this.num) 


        // 认证成功 跳转回来 
        console.log(this.$route)
        this.AtteCompleteClass = this.$route.params
        this.isCompleteClass = true
    }
}
</script>
<style lang="scss" scoped>
@import  '../assets/css/variables.scss';
@import  '../assets/css/CLYchooseClass.css';
</style>


