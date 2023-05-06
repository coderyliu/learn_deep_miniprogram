<script>
// App.vue是全局入口组件、App.vue不能包含template模板，是一个入口组件、所有的组件都会在App.vue上切换
// 另外，不建议在App.vue中使用setup语法糖，可以在页面上或者组件上使用setup语法糖、因为还要额外引入生命周期函数和globalData
import useMainStore from '@/store/main.js';

export default {
	// 应用生命周期
	onLaunch: function() {
		try {
			const mainStore = useMainStore();
			const userInfo = uni.getStorageSync('userInfo');
			if (userInfo) {
				mainStore.changeUserInfoAction(JSON.parse(userInfo));
			}
			const tokenAuth = uni.getStorageSync('token');
			if (tokenAuth) {
				mainStore.changeTokenAction(JSON.parse(tokenAuth));
			}
		} catch (error) {}
	},
	onShow: function() {},
	onHide: function() {},
	// 除此之外我们也可以使用vue语法中的生命周期
	created() {},
	// 和小程序中的globalData一样，可以存放一些全局公共data
	globalData: {}
};
</script>

<style lang="scss">
/* 在uni-app中不支持scoped作用域，而是本事就有作用域，App.vue中的样式是全局作用域、其他页面或者组件上是局部作用域 */
/* 我们也可以使用css预处理器：比如scss ,但是要安装dart-sass编译scss*/
/* 在App.vue可以引入外部样式，也会作用于全局 */
@import '@/static/scss/index.scss';
</style>
