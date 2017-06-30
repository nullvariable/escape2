<template>
<div>
  <div id="wrapper" class="container-fluid">
    <div class="navbar bg-inverse navbar-inverse">
      <span class="navbar-brand">Evil Scientist Mail</span>
    </div>
    <div class="row justify-content-start">
      <div class="col col-2">
        <ul class="nav nav-pills flex-column">
          <li v-for="(folder, key, index) in folders" :class="{'alt': alt(index)}">
            <a class="nav-link" href="#" v-on:click.prevent="openFolder(key)" :class="{active: folder.active}">
              {{ folder.name }} <span v-if="folder.name == 'Inbox'">({{folder.emails.length}})</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="col col-4">
        <ul class="nav nav-pills flex-column">
          <li class="nav-item" v-for="(email, index) in subjects" :class="{'alt': alt(index)}">
            <a class="nav-link" :class="{active: email.active}" href="#" v-on:click.prevent="openMessage(index)">{{ email.subject }}</a>
          </li>
        </ul>
      </div>
      <div class="col col-6 col-md-auto alert" :class="{'alert-info': activeMessage}" v-if="activeMessage">
        <div class="row">
          <div class="col">
            <h3>{{ activeMessage.subject }}</h3>
          </div>
          <div class="col align-self-end">
            <p class="text-right">
              <strong>From:</strong> <em>{{ activeMessage.message.from }}</em><br>
              <strong>To:</strong> <em>{{ activeMessage.message.to}}</em>
            </p>
          </div>
        </div>
        <div class="row"><div class="col col-12"><hr></div></div>
        <div class="row">
          <div class="col">
            <pre class="email" v-if="!activeMessage.message.html">{{ activeMessage.message.contents }}</pre>
            <div class="email" v-if="activeMessage.message.html" v-html="activeMessage.message.contents"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import _ from 'lodash'
import emails from './emails'

export default {
  name: 'email-screen',
  components: {
  },
  data: function () {
    return {
      folders: emails.folders
    }
  },
  computed: {
    subjects: function () {
      return this.activeFolder()['emails']
    },
    activeMessage: function () {
      let folder = this.activeFolder()
      return _.find(folder.emails, ['active', true]) || false
    }
  },
  methods: {
    alt (i) {
      return (i % 2) === 1
    },
    activeFolder () {
      let self = this
      return _.first(_.filter(self.folders, function (folder) {
        return folder.active
      }))
    },
    openFolder (index) {
      let self = this
      _.forOwn(self.folders, function (value, key, object) {
        object[key].active = (index === key)
      })
    },
    openMessage (index) {
      var folderKey = this.activeFolder()['name'].toLowerCase()
      _.each(this.folders[folderKey].emails, function (email, key, object) {
        object[key].active = (index === key)
      })
    }
  }/* ,
  created: () => {
  } */
}
</script>

<style>
  pre.email {
    white-space: pre-wrap;
    word-wrap: break-word;
    font-family: inherit;
  }
  .navbar a {
    cursor: crosshair;
  }
</style>
