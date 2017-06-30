<template>
  <div id="app">
    <router-view></router-view>
    <count-down v-bind:timeleft="timeleft" v-bind:cd-active="cdActive"></count-down>
  </div>
</template>

<script>
  import CountDown from './components/CountDown.vue'
  export default {
    name: 'escape2',
    props: ['timeleft', 'cdActive'],
    components: {
      CountDown
    }
  }
</script>

<style>
  /* CSS */
</style>
