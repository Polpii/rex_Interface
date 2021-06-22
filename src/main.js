import AspectRatio from "v-aspect-ratio";
import App from './App.vue'
import axios from 'axios'
import firebase from 'firebase'
import store from './store'
import Vue from 'vue'

Vue.prototype.$http = axios

Vue.use(AspectRatio);
Vue.config.productionTip = false
Vue.prototype.$axios = axios

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBSDkMneUN-PGoxI4dgaG2hqjLdmX1HXF8",
  authDomain: "rexinterface.firebaseapp.com",
  databaseURL: "https://rexinterface-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "rexinterface",
  storageBucket: "rexinterface.appspot.com",
  messagingSenderId: "880168949383",
  appId: "1:880168949383:web:104af316bea7b9cdda8a22",
  measurementId: "G-TR62DKVN8Y"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
