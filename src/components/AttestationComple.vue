<template>
  <div id="AttestationComple">
      <!-- <p id="leadTitle">您是 <span>{{ AttestationCompleNum }} </span>个班级班主任, 请选择:</p> -->
      <!-- <ul>
            <li v-for="item in AtteCompleteClass" :key="item.index" class="classList">
                <span class="className"> {{ item.name }}</span>  
                <span> ========> </span>
                <span class="className"> {{ item.teamName }} </span>
                <span class="more" @click="More"> > </span>
            </li>
      </ul> -->
       <!-- <mt-button id="AttestationComple" :disabled="dis" size="large" @click="AttestationComple" >认证班级</mt-button> -->

            <input type="radio" id="one" value="One" v-model="picked">
            <label for="one">One</label>
            <br>
            <input type="radio" id="two" value="Two" v-model="picked">
            <label for="two">Two</label>
            <br>
            <span>Picked: {{ picked }}</span>
  </div>

</template>
<script>
export default {
    name:'AttestationComple',
    data(){
        return {
            AtteCompleteClass:[],
            AttestationCompleNum:null,
            dis:true,
            teamComplete:'',
            picked: '',
            items:[],
            options:[
              {
                teamName:'阳光中队',  // 班级名称
                banjiNumber:'123654',   // 班级号
                banjichuangjianzhe:'王姐姐',   //  班级创建者 如果不知道真实姓名下展示小黑板账号
                Members:32,  // 班级中的人数
                pid:0
              },
              { teamName:'1年级2班数学组',
                banjiNumber:'666666',
                banjichuangjianzhe:'张老师',
                Members:50,
                pid:1
              },
              { teamName:'小花班',
                banjiNumber:'888888',
                banjichuangjianzhe:'刘老师',
                Members:60,
                pid:2
              }
            ]

        }
    },
    methods:{
        More(){

        },
        AttestationComple(){  // 认证班级按钮
            this.$router.push({name:'PassOk'})        
        },
        isRight(){  // 这里判断是否所有的班级都认证成功了,才调用 AttestationComple()
            if(true){  // 判断全部的班级都认证成功了,才可以点击
                this.dis = false
                this.AttestationComple()
            }
        }
    },
    mounted(){
        // document.title = "认证成功"
        
        
        
    }
}
</script>
<style scoped lang="scss">
@import  '../assets/css/variables.scss';
@import  '../assets/css/AttestationComple.css';
</style>


