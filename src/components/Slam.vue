<template>
  <div class="slam" v-on:click="putSlam()">
  </div>
</template>

<script>
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Slam',
  data() {
    return {
      height: 0
    };
  },
  methods: {
    putSlam() {
      this.slam = true;
      this.$store.commit('putSlam');
    },
    ...mapMutations(['RESIZE', 'GET_DATA', 'CHANGE_SCENE']),
    ...mapActions(['INIT', 'ANIMATE', 'CHANGE_SCENE'])
  },
  mounted () {
    this.INIT({
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
      el: this.$el
    }).then(() => {
      this.GET_DATA()
      this.ANIMATE()
      window.addEventListener('resize', () => {
        this.RESIZE({
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        })
      })
    })
    // update the time every second
    this.interval = setInterval(() => {
      console.log('polpi')
      this.GET_DATA()
      this.CHANGE_SCENE()
    }, 1000);
  }
};

</script>

<style scoped lang='scss'>
</style>


