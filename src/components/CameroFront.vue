<template>
  <div>
    <header>
      <div class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
          <div class="collapse navbar-collapse"
            id="bs-example-navbar-collapse-1">
          </div>
        </div>
      </div>
    </header>
    <div class="container">
      <div class="row">
        <div class="col-md-5">
          <video id="videoOutput" ref="videoOutput" autoplay playsinline muted loop
            poster="../assets/logo.png">
          </video>
          <br/><br/>
        </div>
        <div class="buts">
          <a id="start" v-on:click="start()" href="#" class="button_start">
            <span class="glyphicon glyphicon-play"></span> Start</a><br /> <br /> 
          <a id="stop" v-on:click="stop()" href="#" class="button_stop">
            <span class="glyphicon glyphicon-stop"></span> Stop </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kurentoClient from 'kurento-client'
import kurentoUtils from 'kurento-utils'

export default {
  name: 'Map',
  data: () => ({
    show: false,
    modal: {
      id: '',
      title: '', 
      pipeline: '',
      webRtcPeer: '',
      args: '',
      description: '',
      url: ''
    }
  }),
  mounted: function () {
      let vm = this;
      this.args = this.getopts(location.search,
      {
        default:
        {
          ws_uri: 'ws://' + location.hostname + ':8888/kurento',
          ice_servers: undefined
        }
      });
      if (this.args.ice_servers) {
        console.log("Use ICE servers: " + this.args.ice_servers);
        kurentoUtils.WebRtcPeer.prototype.server.iceServers = JSON.parse(this.args.ice_servers);
      } 
      else {
        console.log("Use freeice")
      }
      window.addEventListener('load', function(){
        vm.url = 'rtsp://localhost:8554/feed1';
      });
  },

  methods: {
    getopts: function(args, opts)
    {
      var result = opts.default || {};
      args.replace(
          new RegExp("([^?=&]+)(=([^&]*))?", "g"),
          function($0, $1, $2, $3) { result[$1] = $3; });

      return result;
    },
    setIceCandidateCallbacks: function(webRtcEndpoint, webRtcPeer, onError){
      webRtcPeer.on('icecandidate', function(candidate){
        console.log("Local icecandidate " + JSON.stringify(candidate));

        candidate = kurentoClient.register.complexTypes.IceCandidate(candidate);

        webRtcEndpoint.addIceCandidate(candidate, onError);

      });
      webRtcEndpoint.on('OnIceCandidate', function(event){
        var candidate = event.candidate;

        console.log("Remote icecandidate " + JSON.stringify(candidate));

        webRtcPeer.addIceCandidate(candidate, onError);
      });
    },
    onError: function(error) {
      if(error)
      {
        console.error(error);
        stop();
      }
    },
    showSpinner:function() {
      for (var i = 0; i < arguments.length; i++) {
        arguments[i].poster = 'img/transparent-1px.png';
        arguments[i].style.background = "center transparent url('img/spinner.gif') no-repeat";
      }
    },
    hideSpinner: function() {
      for (var i = 0; i < arguments.length; i++) {
        arguments[i].src = '';
        arguments[i].poster = 'img/webrtc.png';
        arguments[i].style.background = '';
      }
    },
    start: function() {
      let vm = this;
      this.showSpinner(this.$refs["videoOutput"]);
      var options = {
        remoteVideo : this.$refs["videoOutput"]
      };
      this.webRtcPeer = kurentoUtils.WebRtcPeer.WebRtcPeerRecvonly(options,
        function(error){
          if(error){
            return console.error(error);
          }
          this.generateOffer(vm.onOffer);
          this.peerConnection.addEventListener('iceconnectionstatechange', function(){ //event in function here
            if(this.peerConnection){
              console.log("oniceconnectionstatechange -> " + this.peerConnection.iceConnectionState);
              console.log('icegatheringstate -> ' + this.peerConnection.iceGatheringState);
            }
          });
        });
    },
    onOffer: function(error, sdpOffer){
      let vm = this;
      if(error) return vm.onError(error);
      kurentoClient.KurentoClient(vm.args.ws_uri, function(error, kurentoClient) {
        if(error) return vm.onError(error);
        kurentoClient.create("MediaPipeline", function(error, p) {
          if(error) return vm.onError(error);
          vm.pipeline = p;
          console.log(vm.url)
          vm.pipeline.create("PlayerEndpoint", {uri: vm.url}, function(error, player){
            if(error) return vm.onError(error);
            vm.pipeline.create("WebRtcEndpoint", function(error, webRtcEndpoint){
              if(error) return vm.onError(error);
              vm.setIceCandidateCallbacks(webRtcEndpoint, vm.webRtcPeer, vm.onError);
              webRtcEndpoint.processOffer(sdpOffer, function(error, sdpAnswer){
                if(error) return vm.onError(error);
                webRtcEndpoint.gatherCandidates(vm.onError);
                vm.webRtcPeer.processAnswer(sdpAnswer);
              });
              player.connect(webRtcEndpoint, function(error){
                if(error) return vm.onError(error);
                console.log("PlayerEndpoint-->WebRtcEndpoint connection established");
                player.play(function(error){
                  if(error) return vm.onError(error);
                  console.log("Player playing ...");
                });
              });
            });
          });
        });
      });
    },
    stop: function() {
      if (this.webRtcPeer) {
        this.webRtcPeer.dispose();
        this.webRtcPeer = null;
      }
      if(this.pipeline){
        this.pipeline.release();
        this.pipeline = null;
      }
      this.hideSpinner(this.$refs["videoOutput"]);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button_start {
  right: 1%;
  top: 95%;
  position:absolute;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}
.button_stop {
  right: 1%;
  top: 100%;
  position:absolute;
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

#videoOutput{
  position: relative;
  right: 0px; 
  left: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999;
}
</style>

