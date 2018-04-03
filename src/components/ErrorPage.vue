<template>
    <div id="error">
        {{err}}
    </div>
</template>
<script>
export default {
    name:'error',
    data(){
        return {
          err:'{"error_response":{"code":201,"msg":"请重新扫描二维码"}}'
        }
    },
    methods:{
        
    },
    mounted(){
        document.title = '错误1'
    }
}
</script>

<style scoped>
#error{
  font-size: 0.2133rem;
  color: #333;
  padding: 0.1667rem 0 0 0.1667rem;
}

</style>


