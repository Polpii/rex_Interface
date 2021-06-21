import App from './App.vue'
import AspectRatio from "v-aspect-ratio";
import axios from 'axios'
import Vue from 'vue'
import store from './store'


Vue.prototype.$http = axios

Vue.use(AspectRatio);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
