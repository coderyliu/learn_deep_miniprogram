// main.js是全局的入口文件，主要作用是生成一个全局的vue实例
// 包括：声明全局组件、引入pinia或者vuex、声明全局属性等
// 使用HbuilderX内置了pinia，不要要安装，使用cli方式需要安装
import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
import * as Pinia from 'pinia'
export function createApp() {
	const app = createSSRApp(App)

	app.use(Pinia.createPinia())
	return {
		app,
		Pinia //此处必须将Pinia返回
	}
}
// #endif