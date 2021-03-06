import Vue from 'vue'
import VueRouter from 'vue-router'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.config.productionTip = false
Vue.prototype.$axios = axios

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(VueCookie);

new Vue({
  render: h => h(App),
  router:router
}).$mount('#app')
