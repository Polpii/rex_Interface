<template>
  <div 
    class="square"
    v-on:click="select()"
    :style="{ 
      'left': getFirstPointAbscissa(),
      'top': getFirstPointOrdinate(),
      'width': getSecondPointAbscissa(),
      'height': getSecondPointOrdinate(),
    }"
    :class="{ isSelected: getSelected(), square: !getSelected()}"
  >
  ID: {{ID}} 
  </div>
</template>

<script>
export default {
  name: 'Stream',
  data() {
    return {
      unity: '%',
      isSelected: false,
    };
  },
  props: {
    ID: Number,
    xa: Number,
    ya: Number,
    xc: Number,
    yc: Number,
  },
  methods: {
    select() {
      this.$store.commit('changeId', this.ID);
      this.navigation('1_' + this.ID + '_')
      this.navigation('follow')
    },
    getSelected() {
      if(this.$store.state.idSelected == `${this.ID}`){
        return true;
      }
      else {
        return false;
      }
    },
    getFirstPointAbscissa() {
      return `${this.xa}${this.unity}`;
    },
    getFirstPointOrdinate() {
      return `${this.ya}${this.unity}`;
    },
    getSecondPointAbscissa() {
      return `${this.xc - this.xa}${this.unity}`;
    },
    getSecondPointOrdinate() {
      return `${this.yc - this.ya}${this.unity}`;
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
};
</script>

<style scoped lang='scss'>
.square {
  position: absolute;
  border: solid rgb(255, 0, 0) 3px;
  background-color: rgba($color: #000000, $alpha: 0);
}
.isSelected {
  position: absolute;
  border: solid rgb(0, 255, 0) 3px;
  background-color: rgba($color: #000000, $alpha: 0);
}
</style>
