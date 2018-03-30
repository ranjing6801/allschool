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
    /*font-family:'Microsoft YaHei','Arial';*/
    overflow-x: hidden;
}
*{
    /*font-family: 'Microsoft YaHei';*/
}
/* css reset end */

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

}
.mint-cell-wrapper{
    padding: 0;
    background-size: 100% 0px;
}
.mint-field-core{
    font-size: 18px;
    margin-bottom: -15px;
}
.mintui-field-error{
    position: relative;
    top: 10px;
}


</style>
