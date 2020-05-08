<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabBar/MainTabBar";

  export default {
    name: 'App',
    components: {
      MainTabBar,
    }
  }
</script>

<style>
  @import "assets/css/base.css";

  #app {
    max-width: 640px;
    width: 100%;
    margin: auto;
  }
</style>
