// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueMoment from 'vue-moment'
import store from './store'

Vue.use(VueMoment)

Vue.config.productionTip = false

/* eslint-disable no-new */
const root = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

document.addEventListener('DOMContentLoaded', function () {
  // your code
  root.$mount('#app')
})