<template>
  <div>
  <img id="img" :src=url v-on:click="unSelect(), unSlam()">
  <!-- <Square ID="1" :xa="10" :ya="10" :xc="35" :yc="77"/>
  <Square ID="2" :xa="40" :ya="27" :xc="60" :yc="67"/>
  <Square ID="3" :xa="65" :ya="47" :xc="70" :yc="57"/> -->
  <Square
    v-for='(human, index) in humans' :key="index"
    :ID=index
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
// import { Server } from 'socket.io'

export default {
  name: 'Stream',
  components: {
    Square,
  },
  data() {
    return {
        humans: [],
        io: undefined,
    };
  },
  props: {
    url: String,
  },
  methods: {
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
    getHuman () {
      const express = require('express');
      const app = express();
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
    }
    // getData () {
    //   const messageRef = firebase.database().ref('Human_pose')
    //   fetch(messageRef.toString() + '.json')
    //     .then(res => res.json())
    //     .then(res => this.humans = res.data)
    // }
  },
  // created: function() {
  //   const express = require('express');
  //   const app = express();
  //   console.log('ok')
  //   const server = require('http').createServer(app);
  //   const io = require('socket.io')(server);
  //   const port = process.env.PORT || 5000;

  //   // app.use(express.static(__dirname + '/latency_public'));

  //   io.on('connection', socket => {
  //     console.log(`connect ${socket.id}`);

  //     socket.on('data', function(msg) {
  //       // socket.emit('pong_from_server');
  //       console.log(msg);
  //     });

  //     socket.on('disconnect', () => {
  //       console.log(`disconnect ${socket.id}`);
  //     });
  //   });

  //   server.listen(port, () => console.log(`server listening on port ${port}`)); 
  // },
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
