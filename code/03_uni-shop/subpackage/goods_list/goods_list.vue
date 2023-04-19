<template>
	<view class="goods-list">
		<!-- 引入list-item组件 -->
		<list-item :goodsList="goodsList"></list-item>
	</view>
</template>

<script>
export default {
	data() {
		return {
			// 查询参数
			queryObj: {
				// 查询关键词
				query: '',
				// 商品分类id
				cid: '',
				// 页码值
				pagenum: 1,
				// 每页显示多少条数据
				pagesize: 10
			},
			goodsList: [], //请求的商品列表
			total: 0,
			isLoading: false //节流处理
		};
	},
	onLoad(options) {
		// 拿到页面跳转的请求参数
		this.queryObj.query = options.query || '';
		this.queryObj.cid = options.cid || '';
		// 获取商品列表数据
		this.getGoodsList();
	},
	onReachBottom() {
		// 判断数据是否全部加载完毕
		if (this.queryObj.pagenum * this.queryObj.pagesize >= this.total) {
			return this.$showToast('数据请求全部完成~');
		}
		// 判断是否加载中
		if (this.isLoading) {
			return uni.$showToast('请求加载中~');
		}
		// 页面num+1,请求下一页数据
		this.queryObj.pagenum += 1;
		this.getGoodsList();
	},
	onPullDownRefresh() {
		// 重新置为1
		this.queryObj.pagenum = 1;
		this.total = 0;
		this.goodsList = [];
		this.isLoading = false;

		this.getGoodsList(() => uni.stopPullDownRefresh());
	},
	methods: {
		async getGoodsList(cb) {
			// 节流处理开启
			this.isLoading = true;
			// 发起网络请求
			const { data: res } = await uni.$http.get('/api/public/v1/goods/search', this.queryObj);
			if (res.meta.status !== 200) {
				return uni.$showToast();
			}
			// 节流处理关闭
			this.isLoading = false;
			// 关闭下拉刷新
			cb && cb();
			// 合并请求数据
			this.goodsList = [...this.goodsList, ...res.message.goods];
			this.total = res.message.total;
		}
	}
};
</script>

<style lang="scss"></style>
