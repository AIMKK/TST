<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style>
  body {
    background: #F9F9F9;
  }

  .container {
    z-index: 1;
    background: #ffffff;
    padding: 20px 0px;
    text-align: center;
    border: 1px solid #D0D0D0;
    /* box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24); */
  }

  .container .content {
    padding: 15px;
  }
</style>