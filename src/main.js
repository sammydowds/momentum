import Vue from 'vue'
import App from './App.vue'
import Router from 'vue-router'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Display from './components/Display.vue'
import SetUp from './components/SetUp.vue'
import Landing from './components/Landing.vue'


Vue.config.productionTip = false

// Install BootstrapVue
Vue.use(BootstrapVue); 
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin); 
// Install Router
Vue.use(Router); 
// 1. Define route components.
const SetUpComp = SetUp; 
const DisplayComp = Display;
const LandingComp = Landing;  
// 2. Define some routes
const routes = [
  { path: '', component: LandingComp},
  { path: '/setup', component: SetUpComp },
  { path: '/display', component: DisplayComp }
]
// 3. Create the router instance and pass the `routes` option
const router = new Router({
  mode: 'history', 
  routes // short for `routes: routes`
})

new Vue({
  router, 
  render: h => h(App),
}).$mount('#app')
