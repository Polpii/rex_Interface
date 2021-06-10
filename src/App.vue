<template>
  <div id="app">
    <div id="video">
      <img id="logo_Devo" alt="DEVO logo" src="./assets/Devo_4.png">
      <!-- <img id="stream" :src=url> -->
      <div ref="stream"></div>
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
      <button class="button" v-show="!manualMode" v-on:click="connect()">MAP BUILDER</button>

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
import RFB from '@novnc/novnc/core/rfb';
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
      id: '',
      ws: 'ws://localhost:8081/',
      passwd: 'Rane2019',
    };
  },
  methods: {
    changeMode: function () {
      this.manualMode = false;
    },
    connect() {
      this.rfb.sendCredentials({ password: this.passwd });
    },
    disconnect() {
      this.rfb.disconnect();
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
  },
  mounted() {
    this.$nextTick(() => {
      this.rfb = new RFB(this.$refs.stream, this.ws);
    });
  }
}
</script>

<style lang="scss">
  @import './assets/styles.scss';
</style>
