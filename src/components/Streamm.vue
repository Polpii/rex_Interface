<template>
  <div>
  <img id="img" :src=url v-on:click="unSelect(), unSlam()">
  <!-- <Square :ID='1' :xa="10" :ya="15" :xc="70" :yc="80"/>
  <Square :ID='2' :xa="40" :ya="27" :xc="60" :yc="67"/>
  <Square :ID='3' :xa="65" :ya="47" :xc="70" :yc="57"/> -->
  <Square
    v-for='(human, index) in JSON.parse(humans)["Human"]' :key="index"
    :ID='0'
    :xa=parseInt(human[0])
    :ya=parseInt(human[1])
    :xc=parseInt(human[2])
    :yc=parseInt(human[3])
  />
  </div>
</template>

<script>
// import axios from 'axios'
// import firebase from 'firebase'
import Square from './Square.vue'
// import Express from 'express'
// import { Server } from 'socket.io'

export default {
  name: 'Stream',
  components: {
    Square,
  },
  data() {
    return {
        humans: null,
    };
  },
  props: {
    url: String,
  },
  methods: {
    test() {
      // console.log(this.humans)
      console.log(JSON.parse(this.humans)["Human"][0])
    },
    unSlam() {
      this.$store.commit('unSlam');
    },
    unSelect() {
      this.$store.commit('changeId', -1);
      this.navigation('waiting')
    },
    navigation: function (coordinates) {
      if (coordinates == 'manual')
        this.manualMode = true

      this.$axios
        .get('http://127.0.0.1:5000/' + coordinates, {headers: {'Access-Control-Allow-Origin': '*'}})
        .then(resp => console.log(resp.data)).catch(error => console.log(error))
      this.show = false
    },
  },
  created: function() {
    var self = this;
    const io = require('socket.io-client')
    const port = process.env.PORT || 5000;

    const socket = io('http://172.21.72.151:' + port);

    function send () {
      socket.emit('ping_from_client');
    }

    socket.on('connect', () => {
      console.log(`connect ${socket.id}`);
      send();
    });

    socket.on('disconnect', () => {
      console.log(`disconnect ${socket.id}`);
    });

    socket.on('pong_from_server', function(msg) {
      // const latency = new Date() - last;
      // console.log('latency is ' + latency + ' ms');
      self.humans = JSON.parse(JSON.stringify(msg));
      console.log(self.humans)
      setTimeout(send, 10000);
    });
  },
};
</script>

<style scoped lang='scss'>
#img {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
}
</style>
