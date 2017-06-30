<template>
<nav class="navbar fixed-bottom text-muted" :class="dangerLevel" v-if="cdActive">
  <span class="text-center">Critical failure in {{ digits }}</span>
</nav>
</template>

<script>
export default {
  name: 'count-down',
  props: ['timeleft', 'cdActive'],
  computed: {
    digits () {
      let secondsLeft = Math.floor(this.timeleft / 1000)
      let minutes = Math.floor(secondsLeft / 60)
      let seconds = secondsLeft % 60
      let left = prefix(minutes)
      let right = prefix(seconds)
      return left + ':' + right
    },
    dangerLevel () {
      let seconds = Math.round(this.timeleft / 1000)
      if (seconds < (60 * 10)) return 'bg-danger'
      return 'bg-warning'
    }
  }
}
function prefix (value) {
  if (value.toFixed().length === 1) return '0' + value.toFixed()
  return value
}
</script>

<style>

</style>
