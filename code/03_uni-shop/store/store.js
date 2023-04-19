// 1.引入vue和vuex
import Vue from 'vue'
import Vuex from 'vuex'

// 导入购物车模块
import cart from './cart.js'

// 2.安装vuex插件
Vue.use(Vuex)

// 3.创建store实例
const store=new Vuex.Store({
	modules:{
		cart
	}
})

// 4.向外共享store实例对象
export default store
