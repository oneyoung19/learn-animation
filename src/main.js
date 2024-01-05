import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/styles/reset.less'
import '@/assets/styles/global.less'

import '@/components'
import VueMarkdown from 'vue-markdown'
Vue.component('Markdown', VueMarkdown)

Vue.config.productionTip = false

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
