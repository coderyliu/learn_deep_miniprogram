<template>
	<view>
		<!-- 模拟input输入框 -->
		<view class="search-nav">
			<view class="search-wrapper" @click="navigateToSearch">
				<uni-icons type="search" size="17"></uni-icons>
				<text class="placeholder">搜索</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'cate-search',
	data() {
		return {};
	},
	methods:{
		navigateToSearch(){
			uni.navigateTo({
				url:'/subpackage/search/search'
			})
		}
	}
};
</script>

<style lang="scss">
.search-nav {
	height: 120rpx;
	background-color: crimson;
	display: flex;
	justify-content: center;
	align-items: center;
	.search-wrapper {
		width: 90%;
		height: 80rpx;
		line-height: 80rpx;
		margin: 0 auto;
		border: 1rpx solid #fff;
		border-radius: 50rpx;
		text-align: center;
		background-color: #fff;
		.placeholder {
			font-size: 30rpx;
			margin-left: 10rpx;
		}
	}
}
</style>
