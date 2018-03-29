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
*{
    margin: 0;
    padding: 0;
}
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
