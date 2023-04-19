// #ifndef VUE3
import Vue from 'vue'
import App from './App'
import './utils/network.js'
import store from './store/store.js'

// 封装请求失败弹框方法
uni.$showToast = function(title = '数据请求失败!', duration = 1500) {
	uni.showToast({
		title,
		duration,
		icon: "none"
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
	...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import App from './App.vue'
export function createApp() {
	const app = createSSRApp(App)
	return {
		app
	}
}
// #endif
