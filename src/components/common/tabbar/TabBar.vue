<template>
  <div id="tab-bar">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: "TabBar"
  }
</script>

<style scoped>
  #tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 49px;
    max-width: 640px;
    box-sizing: border-box;
    box-shadow: 0 -5px 15px rgba(0, 0, 0,.1);
    display: flex;
    align-items: center;
    flex-direction: row;
    background-color: rgb(250,250,250);
    z-index: 10;
  }
</style>
