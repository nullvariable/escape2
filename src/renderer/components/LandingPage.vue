<template>
  <div id="wrapper" class="container-fluid">
    <div class="row justify-content-center align-items-center">
      <div class="col-4 alert bg-faded">
        <form class="form-inline">
        <div class="form-group" :class="{'has-danger': usernameError}">
          <label for="username"><span class="sr-only">Username</span>
          <input
            class="form-control"
            type="text"
            id="username"
            v-model="username"
            v-focus
            placeholder="Username"
          />
          </label>
        </div>
        <div class="form-group" :class="{'has-danger': passwordError}">
          <label for="password"><span class="sr-only">Password</span>
          <input
            class="form-control"
            type="password"
            id="password"
            v-model="password"
            placeholder="Password"
          />
          </label>
        </div>
        <!-- <p class="text-center"> -->
          <button type="submit" class="btn btn-primary" v-on:click="login">Login</button>
          <small class="text-muted" v-if="attempts > 5">Hint: <em>under keyboard</em></small>
        <!-- </p> -->
        </form>
      </div>
    </div>
  </div>
</template>

<script>
  // import SystemInformation from './LandingPage/SystemInformation'

  export default {
    name: 'landing-page',
    data: function () {
      return {
        username: '',
        password: '',
        usernameError: false,
        passwordError: false,
        attempts: 0
      }
    },
    directives: {
      focus: {
        inserted: function (el) {
          el.focus()
        }
      }
    },
    // components: { SystemInformation },
    methods: {
      login () {
        var u = 'Boss'
        var p = 'I<3submarines'
        if ((this.username === u && this.password === p) || process.env.NODE_ENV === 'development') {
          this.$router.push('emails')
        } else {
          this.usernameError = (this.username !== u)
          this.passwordError = (this.password !== p)
          this.attempts++
        }
      }
    },
    created: function () {
      let lp = this
      this.$root.$on('resetApp', function () {
        lp.username = ''
        lp.password = ''
        lp.attempts = 0
        lp.usernameError = false
        lp.passwordError = false
        console.log('reset completed')
      })
    }
  }
</script>

<style>
  @import "~bootstrap/dist/css/bootstrap.css";
</style>
