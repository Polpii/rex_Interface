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
          <div id="Forward" v-on:click="navigation('1')" class="control"></div>
          <div id="Left" v-on:click="navigation('3')" class="control"></div>
          <div id="Right" v-on:click="navigation('4')" class="control"></div>
          <div id="Backward" v-on:click="navigation('2')" class="control"></div>
          <div id="Upper_Diagonal_Right" v-on:click="navigation('8')" class="control"></div>
          <div id="Upper_Diagonal_Left" v-on:click="navigation('7')" class="control"></div>
          <div id="Down_Diagonal_Left" v-on:click="navigation('9')" class="control"></div>
          <div id="Down_Diagonal_Right" v-on:click="navigation('10')" class="control"></div>
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
#Left{
  top: 40%;
  left: 10%;
  transform: rotate(180deg);
}
#Right {
  top: 40%;
  right: 10%;
}
#Forward {
  display: block;
  top: 10%;
  left: 40%;
  transform: rotate(-90deg);
}
#Upper_Diagonal_Left {
  display: block;
  top: 20%;
  left: 20%;
  transform: rotate(-135deg);
}
#Upper_Diagonal_Right {
  display: block;
  top: 20%;
  right: 20%;
  transform: rotate(-45deg);
}
#Backward {
  transform: rotate(90deg);
  left: 40%;
  bottom: 10%;
}
#Down_Diagonal_Left {
  transform: rotate(135deg);
  left: 20%;
  bottom: 20%;
}
#Down_Diagonal_Right {
  transform: rotate(45deg);
  right: 20%;
  bottom: 20%;
}
.controls {
  display: block;
  top: 50px;
  width: 100%;
  height: 325px;
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
