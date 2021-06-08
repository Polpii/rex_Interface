<template>
  <div id="app">
    <div id="video">
      <img id="logo_Devo" alt="DEVO logo" src="./assets/Devo_4.png">
      <img id="stream" :src=url>
    </div>
    <div id="sidebar">
      <button class="button" v-show="!manualMode" color="deeppink" v-on:click="navigation('follow')">FOLLOW ME</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('waiting')">WAIT</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('home')">GO HOME</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('manual')">MANUAL MODE</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('reset')">RESET</button>
      <button class="send" v-show="!manualMode" v-on:click="navigation('1_' + id + '_')">FIX ON :</button>
      <input class="input" v-show="!manualMode" v-model="id" placeholder="ENTER AN ID">
      <button class="button" v-show="!manualMode" v-on:click="navigation('0_0_')">UNFIX</button>

      <div v-show="manualMode" class="controls" v-aspect-ratio="'1:1'">
        <div id="Forward" v-on:click="navigation('1')" class="control"></div>
        <div id="Left" v-on:click="navigation('3')" class="control"></div>
        <div id="Right" v-on:click="navigation('4')" class="control"></div>
        <div id="L" v-on:click="navigation('5')" class="control"></div>
        <div id="R" v-on:click="navigation('6')" class="control"></div>
        <div id="Backward" v-on:click="navigation('2')" class="control"></div>
        <div id="Upper_Diagonal_Right" v-on:click="navigation('8')" class="control"></div>
        <div id="Upper_Diagonal_Left" v-on:click="navigation('7')" class="control"></div>
        <div id="Down_Diagonal_Left" v-on:click="navigation('9')" class="control"></div>
        <div id="Down_Diagonal_Right" v-on:click="navigation('10')" class="control"></div>
        <svg id="Center" v-on:click="navigation('0')" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="80" fill="orange"/>
        </svg>
      </div>
      <button class="button" v-show="manualMode" v-on:click="changeMode">BACK</button>
      <img v-show="manualMode" id="logo_D" alt="DEVO logo" src="./assets/Devo.png">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import {WebRTC} from 'vue-webrtc'
Vue.component(WebRTC.name, WebRTC)

Vue.prototype.$http = axios

export default {
  name: 'App',
  components: {
  },
  data () {
    return {
      manualMode: false,
      url: 'http://172.21.72.133:4444/video_feed',
      id: ''
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
    }
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
  font-size: 2vh;
  .button {
    font-size: 2vh;
    margin: 6vh 0vh 0vh 0vh;
    width: 80%;
    height: 7%;
    text-align: center;
  }
  .input {
    font-size: 2vh;
    margin: 6vh 0vh 0vh 0vh;
    width: 40%;
    height: 6.55%;
    text-align: center;
  }
  .send {
    font-size: 2vh;
    margin: 6vh 0vh 0vh 0vh;
    width: 40%;
    height: 7%;
    text-align: center;
  }
}
#logo_D {
  margin: 5vh 0vh 0vh 0vh;
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
  top: 42.5%;
  left: 17%;
  transform: rotate(180deg);
}
#L {
  top: 42.5%;
  left: 0%;
  transform: rotate(180deg);
}
#Right {
  top: 42.5%;
  right: 17%;
}
#R {
  top: 42.5%;
  right: 0%;
}
#Forward {
  display: block;
  top: 17%;
  left: 42.5%;
  transform: rotate(-90deg);
}
#Upper_Diagonal_Left {
  display: block;
  top: 22%;
  left: 22%;
  transform: rotate(-135deg);
}
#Upper_Diagonal_Right {
  display: block;
  top: 22%;
  right: 22%;
  transform: rotate(-45deg);
}
#Backward {
  transform: rotate(90deg);
  left: 42.5%;
  bottom: 17%;
}
#Down_Diagonal_Left {
  transform: rotate(135deg);
  left: 22%;
  bottom: 22%;
}
#Down_Diagonal_Right {
  transform: rotate(45deg);
  right: 22%;
  bottom: 22%;
}
#Center{
  position: absolute;
  z-index: 10;
  width: 40%;
  height: 40%;
  right: 30%;
  bottom: 30%;
  cursor: pointer; 
}
.controls {
  position: relative;
  top: 50px;
  width: 100%;
}
.control {
  position: absolute;
  display: block;
  width: 15%;
  height: 15%;
  background-image: url('./assets/arrow.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  opacity: 1; 
}
</style>
