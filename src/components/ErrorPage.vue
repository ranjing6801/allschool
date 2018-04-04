<template>
    <div id="error">
        {{err}}
        <p>{{msg}}</p>
    </div>
</template>
<script>
export default {
    name:'error',
    data(){
        return {
          err:'{"error_response":{"code":201,"msg":"请重新扫描二维码"}}',
          msg:''
        }
    },
    methods:{
        
    },
    mounted(){
        document.title = '错误1';
        this.msg = this.$route.query.msg;
    }
}
</script>

<style scoped>
#error{
  font-size: 0.4533rem;
  color: #fff;
  padding: 0.1667rem 0 0 0.1667rem;
}

</style>


