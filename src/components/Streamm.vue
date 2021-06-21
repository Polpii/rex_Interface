<template>
  <div>
  <img id="img" :src=url v-on:click="unSelect(), unSlam()">
  <Square ID="1" :xa="10" :ya="10" :xc="35" :yc="77"/>
  <Square ID="2" :xa="40" :ya="27" :xc="60" :yc="67"/>
  <Square ID="3" :xa="65" :ya="47" :xc="70" :yc="57"/>
  </div>
</template>

<script>
import Square from './Square.vue'

export default {
  name: 'Stream',
  components: {
    Square,
  },
  data() {
    return {
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
