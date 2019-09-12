<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  }
}
</script>

<style lang='scss'>
*{
  margin:0;
  padding:0;
}
html,body{
  width:100%;
  height:100%;
}
.link{
  text-decoration: none;
  color:white;
}
.headerFocus{
  background:rgba(255,255,255,0.6)
}
</style>
