import Vue from 'vue'
import App from './App'
import {safeTop,safeBottom,safeAreaH} from '@/utils/safe.js'

Vue.config.productionTip = false

Vue.prototype.$safeTop = safeTop()
Vue.prototype.$safeBottom = safeBottom()
Vue.prototype.$safeAreaH = safeAreaH()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
