import {
	mapGetters
} from 'vuex'

export default {
	computed: {
		...mapGetters('cart', ['total'])
	},
	onShow() {
		// 在页面刚显示出来的时候调用
		this.setBadge();
	},
	methods: {
		setBadge() {
			// 为Tabbar的购物车设置会标
			uni.setTabBarBadge({
				index: 2, //索引
				text: this.total + '' //注意:text必须是字符串，不能是数字
			});
		}
	}
}
