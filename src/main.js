import Vue from 'vue'
import App from './App.vue'
import './assets/less/style.less';
import store from './store'

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
