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
        document.title = '请重新扫描二维码'
    }
}
</script>

<style scoped>
#error{
  font-size: 16px;
  color: #333;
}

</style>


