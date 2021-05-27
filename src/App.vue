<template>
  <div id="app">
    <div id="video">
      <img id="logo_Devo" alt="DEVO logo" src="./assets/Devo_4.png">
      <video
        id="stream"
        class="video-js vjs-default-skin"
        controls
        autoplay
        preload="auto"
        width="100%"
        height="100%"
        data-setup="{}"
      >
        <source src="rtsp://172.21.72.151:8554/">
      <!-- <source src="rtsp://admin:admin@10.136.26.200:554/live/0" /> -->
    </video>
    </div>
    <div id="sidebar">
      <button class="button" color="deeppink" v-on:click="navigation('stop')">FOLLOW ME</button>
      <button class="button" v-on:click="stop">GO HOME</button>
      <img id="logo_D" alt="DEVO logo" src="./assets/Devo.png">
    </div>
  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$http = axios

export default {
  name: 'App',
  components: {
  },
  methods: {
    start: function () {
      this.$router.push('/start')
      this.$route.params.pathMatch
    },
    navigation: function (coordinates) {
        this.$axios.get('http://127.0.0.1:5000/' + coordinates, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(resp => {
            console.log(resp.data);
        }).catch(function (error) {
          console.log(error)
        })
        this.show = false
      },
    stop: function () {
      this.$router.push('/stop')
      this.$route.params.pathMatch
    },
  }
}
</script>

<style lang="scss">
body, html {
  margin: 0px;
  padding: 0px;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  display: flex;
}
#video {
  height: 99.3vh;
  width: 80%;
  margin: 0px;
  background-color: #202e3b;
  border: solid black 3px;
}
#sidebar {
  height: 99.3vh;
  width: 20%;
  margin: 0px;
  background-color: #202342; // #f07d4bbb;  
  display: block;
  border: solid black 3px;
  .button {
    margin: 7rem 0rem 0rem 0rem;
    width: 80%;
    height: 10%;
  }
}
#logo_D {
  margin: 5rem 0rem 0rem 0rem;
  width: 100%;
}
#logo_Devo {
  position: absolute;
  z-index: 1;
  left: 2%;
  top: 0px;
  width: 7%;
}
#stream {
  width: 100%;
  height: 100%;
}
</style>
