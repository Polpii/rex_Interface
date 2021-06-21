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
    ...mapMutations(['RESIZE']),
    ...mapActions(['INIT', 'ANIMATE'])
  },
  mounted () {
    this.INIT({
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight,
      el: this.$el
    }).then(() => {
      this.ANIMATE()
      window.addEventListener('resize', () => {
        this.RESIZE({
          width: this.$el.offsetWidth,
          height: this.$el.offsetHeight
        })
      })
    })
  }
};

</script>

<style scoped lang='scss'>
</style>


