// 配置网络请求wx.request()不支持promise，且没有拦截器，建议使用这个第三方库
import {
	$http
} from '@escook/request-miniprogram'
// 挂载到uni-app的全局对象uni上
uni.$http = $http
// 配置请求根路径
$http.baseUrl = 'https://api-hmugo-web.itheima.net'

// 注意：在uni-app中，所有的原声小程序api,可以通过wx调用，那么在uni-app上也可以用uni调用
// 配置拦截器效果
$http.beforeRequest = function() {
	uni.showLoading({
		title: '数据请求中~'
	})
}
$http.afterRequest = function() {
	uni.hideLoading()
}
// 商品搜索接口

export async function searchGoodsHandler(keywords) {
	const {
		data: res
	} = await uni.$http.get('/api/public/v1/goods/qsearch', {
		query: keywords
	})
	if (res.meta.status !== 200) {
		return uni.$showToast()
	}
	return res.message
}
