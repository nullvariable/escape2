import Vue from 'vue'
import axios from 'axios'

import App from './App'
import router from './router'
import store from './store'

import RC from './rc'
import CountDown from './countdown'
// import Hardware from './rpi/hardware'

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
let vueApp = new Vue({
  data: {
    timeleft: (20 * 60 * 1000),
    cdActive: false
  },
  components: { App },
  router,
  store,
  template: '<App  v-bind:timeleft="timeleft" v-bind:cd-active="cdActive"/>'
}).$mount('#app')

let rc = RC()
let countdown = CountDown()
// let hardware = Hardware()
rc.on('resetApp', () => {
  vueApp.$emit('resetApp')
  vueApp.$router.push('/')
  countdown.reset()
  // hardware.resetTimer()
})

rc.on('startCD', () => {
  countdown.start()
})

rc.on('stopCD', () => {
  countdown.stop()
})

countdown.on('downtick', (timeleft) => {
  vueApp.timeleft = timeleft
  rc.socketMessage(JSON.stringify({timeleft: timeleft}))
  // hardware.update(timeleft)
})
countdown.on('started', () => {
  vueApp.cdActive = true
})
countdown.on('reset', () => {
  vueApp.cdActive = false
  rc.socketMessage(JSON.stringify({timeleft: (20 * 60 * 1000)}))
})

rc.start()
