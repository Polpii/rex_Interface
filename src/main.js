import App from './App.vue'
import AspectRatio from "v-aspect-ratio";
import Axios from 'axios'
import Vue from 'vue'

Vue.use(AspectRatio);
Vue.config.productionTip = false
Vue.prototype.$axios = Axios

new Vue({
  render: h => h(App),
}).$mount('#app')
