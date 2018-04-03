<template>
  <div id="app">
    <!-- <Menu></Menu> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Menu from './components/Menu'
import VolidateCode from './components/VolidateCode'

export default {
  name: 'App',
  components: {
    Menu,VolidateCode
  }
}
</script>

<style>
/* css reset */

body, dl, dd, h1, h2, h3, p, form{
    margin:0;
    font-weight: normal;
}
ol,ul{
    margin:0; padding:0;
}
li{
    list-style: none;
}
img{
    border: none;
}
a{
    text-decoration: none;
}
i,b,em,strong { 
    font-style:normal; 
    font-weight: normal;
}
select,input,button{
    outline: none;
}
textarea{
    resize:none;
}
table{
    border-collapse: collapse;
}
body,html{
    width: 100%;
    height: 100%;
    background: #2b2b2b;
    overflow-x: hidden;
}

/* css reset end */


</style>
