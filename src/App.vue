<template>
  <div id="app">
    <div id="video">
      <img id="logo_Devo" alt="DEVO logo" src="./assets/Devo_4.png">
      <Slam :class="{ slam: this.$store.state.slam, littleSlam: !this.$store.state.slam}"/>
      <Stream
        :class="{ stream: !this.$store.state.slam, littleStream: this.$store.state.slam}"
        :url=url
      />
      <Test/>
      <img id="stream" v-show="!mapbuilder" :src=url>
      <div ref="stream" v-show="mapbuilder" class="iframe"></div>
    </div>
    <div id="sidebar">
      <button class="button" v-show="!manualMode" v-on:click="navigation('home')">GO HOME</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('manual')">MANUAL</button>
      <button class="button" v-show="!manualMode" v-on:click="navigation('reset')">RESET</button>
      <button class="button" v-show="!manualMode" v-on:click="test()">TEST</button>

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
      <button id="back" class="button" v-show="manualMode" v-on:click="changeMode">BACK</button>
      <img id="logo_D" alt="DEVO logo" src="./assets/Devo.png">
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import firebase from 'firebase'
import Slam from './components/Slam.vue'
import Stream from './components/Streamm.vue'
import Test from './components/test.vue'
import Vue from 'vue'

Vue.prototype.$http = axios

export default {
  name: 'App',
  components: {
    Stream,
    Slam,
    Test,
  },
  data () {
    return {
      manualMode: false,
      mapbuilder: false,
      running: false,
      idFixed: false,
      url: 'https://homepages.cae.wisc.edu/~ece533/images/airplane.png',
      // url: 'http://172.21.72.133:4444/video_feed',
      id: '',
      ws: 'ws://localhost:8081/',
      passwd: 'Rane2019',
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
    async getData () {
      const messageRef = firebase.database().ref('Human_pose')
      return await axios.get(messageRef.toString() + '.json').then((response) => {
        const result = 'ID : ' + ' ' + response.data.length
        console.log(result)
        return result
      })      
    },
    async test2 () {
      const express = require('express');
      const app = express();
      console.log('ok')
      const server = require('http').createServer(app);
      const io = require('socket.io')(server);
      const port = process.env.PORT || 5000;

      // app.use(express.static(__dirname + '/latency_public'));

      io.on('connection', socket => {
        console.log(`connect ${socket.id}`);

        socket.on('data', function(msg) {
          // socket.emit('pong_from_server');
          console.log(msg);
        });

        socket.on('disconnect', () => {
          console.log(`disconnect ${socket.id}`);
        });
      });

      server.listen(port, () => console.log(`server listening on port ${port}`)); 
    },
    async test() {
      await this.$store.dispatch('CHANGE_SCENE')
    }
  }
}
</script>

<style lang="scss">
  @import './assets/styles.scss';
</style>
