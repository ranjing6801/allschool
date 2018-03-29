<template>
   <div id="overCount">
<!--  请求验证码次数超时  -->
       <div class="head">
        <div class="left">
            <img :src="imgSrc">
        </div>
        <div class="right">
            <h5>{{ title }}</h5>
            <p id="helpMessage">{{ helpMessage}}</p>
        </div>
    </div> 
    <div id="contentList" style="{font-size:16px;margin:15px;list-style-type:circle;}">
        <ul class="list">
            <li class="userName">你的姓名
                 <p><input type="text" v-model="user" ></p>    
                
            </li>
            <li>您是否是班主任?
                <p>
                    <!-- <label for="yes">是</label>
                    <input type="radio" name='leader' id="yes">
                    <label for="no">否</label> 
                    <input type="radio"  name='leader' id="no">  -->
                    <mt-radio 
                    v-model="value"
                    :options="['是','否']">
                </mt-radio>
                </p>
            </li>
            <li>
                反馈详情
                <p>
                    <textarea rows="8" cols="40" class="rebackContent" v-model="reback">
                        
                    </textarea>
                </p>
            </li>
        </ul>
        <div class="btn" @click="getContent">提交</div>
    </div>

   </div>
</template>
<script>
import imgSrc from  '../../static/images/logo.jpg'
import AuthenticationOk from './AuthenticationOk'
export default {
    name:'overCount',
    components:{
        AuthenticationOk
    },
    data(){
        return {
            imgSrc:imgSrc,
            title:'',
            helpMessage:'',
            user:'',
            reback:'校园架构中教师姓名不存在',
            value:''
        }
    },
    methods:{
        getContent(){
            this.$router.push({path:'/AuthenticationOk',query:{}})
        }
    },
    mounted(){
        document.title = "反馈信息"
        console.log(this.$route)
        this.title = this.$route.query.title
        this.helpMessage = this.$route.query.helpMessage
        this.user = this.$route.query.username  
    }




}
</script>
<style lang="scss" scoped>
@import  '../assets/css/variables.scss';      
@import  '../assets/css/overCount.css';

</style>
