<template>
  <div id="app">
    <!--界面内容会放在这个router-view里 -->
    <router-view></router-view>
  </div>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
}
</script>

<!-- 去掉白边&100vh是一屏 -->
<style>
html,body{
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
}
</style>
