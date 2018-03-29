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
            picked: ''

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
        document.title = "认证成功"
        // console.log(this.$route)
        // console.log(this.$route.params[0].num)
        // this.AttestationCompleNum = this.$route.params[0].num + 1
        // this.AtteCompleteClass = this.$route.params
        
        
    }
}
</script>
<style scoped lang="scss">
@import  '../assets/css/variables.scss';
@import  '../assets/css/AttestationComple.css';
</style>


