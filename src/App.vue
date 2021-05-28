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
      <button class="button" v-show="!manualMode" color="deeppink" v-on:click="navigation('follow')">FOLLOW ME</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('waiting')">WAIT</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('home')">GO HOME</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('manual')">MANUAL MODE</button>

      <div v-show="manualMode" class="controls">
          <div id="T" v-on:click="navigation('thomas')" class="control"></div>
          <div id="L" v-on:click="navigation('est')" class="control"></div>
          <div id="R" v-on:click="navigation('en')" class="control"></div>
          <div id="D" v-on:click="navigation('train')" class="control"></div>
          <div id="TR" v-on:click="navigation('de')" class="control"></div>
          <div id="TL" v-on:click="navigation('vomir')" class="control"></div>
          <div id="DL" v-on:click="navigation('sa')" class="control"></div>
          <div id="DR" v-on:click="navigation('race')" class="control"></div>
          <svg id="C" v-on:click="navigation('!')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="80" fill="orange" />
          </svg>
          <!-- <div id="C" v-on:click="navigation('!')"></div> -->
        </div>
      <button class="button" v-show="manualMode" v-on:click="changeMode">BACK</button>

      <img v-show="manualMode" id="logo_D" alt="DEVO logo" src="./assets/Devo.png">
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
  data () {
    return {
      manualMode: false,
    };
  },
  methods: {
    changeMode: function () {
      this.manualMode = false;
    },
    navigation: function (coordinates) {
      if (coordinates == 'manual') {
        this.manualMode = true;
      }
      this.$axios.get('http://127.0.0.1:5000/' + coordinates, {headers: {'Access-Control-Allow-Origin': '*'}})
      .then(resp => {
          console.log(resp.data);
      }).catch(function (error) {
        console.log(error)
      })
      this.show = false
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
  width: 80%;
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
#L{
  top: 40%;
  left: 10%;
  transform: rotate(180deg);
}
#R {
  top: 40%;
  right: 10%;
}
#T {
  display: block;
  top: 10%;
  left: 40%;
  transform: rotate(-90deg);
}
#TL {
  display: block;
  top: 20%;
  left: 20%;
  transform: rotate(-135deg);
}
#TR {
  display: block;
  top: 20%;
  right: 20%;
  transform: rotate(-45deg);
}
#D {
  transform: rotate(90deg);
  left: 40%;
  bottom: 10%;
}
#DL {
  transform: rotate(135deg);
  left: 20%;
  bottom: 20%;
}
#DR {
  transform: rotate(45deg);
  right: 20%;
  bottom: 20%;
}
#C{
  position: absolute;
  z-index: 10;
  width: 40%;
  height: 40%;
  right: 32%;
  bottom: 30%;
  cursor: pointer; 
}
.controls {
  display: block;
  top: 50px;
  width: 100%;
  height: 320px;
  position: relative;
}
.control {
  position: absolute;
  display: block;
  width: 50px;
  height: 50px;
  background-image: url('./assets/arrow.svg');
  cursor: pointer;  
}
</style>
