<template>
	<view class="article-card-wrap" @click="handleArticleItemClick">
		<view class="card-title omit">{{ dataInfo?.title }}</view>
		<view class="origin-title omit">来源：{{ dataInfo?.hosName }}</view>
		<view class="article-content">
			<view class="left-content"><rich-text :nodes="dataInfo?.article" class="article-text"></rich-text></view>
			<view class="right-avatar">
				<image :src="dataInfo?.picture" mode="aspectFill" class="avatar"></image>
			</view>
		</view>
	</view>
</template>

<script setup>
const props = defineProps({
	dataInfo: {
		type: Object,
		default: () => { }
	}
});

// 跳转至文章详情
const handleArticleItemClick = () => {
	uni.navigateTo({
		url: `/pages/article/index?articleId=${props.dataInfo?.id}`
	});
};
</script>

<style lang="scss">
.article-card-wrap {
	width: 100%;
	padding: 20rpx;
	border-bottom: 2rpx solid rgb(219, 216, 216);

	box-sizing: border-box;

	.card-title,
	.origin-title {
		margin-bottom: 10rpx;

		font-size: 34rpx;
		font-weight: 700;
		letter-spacing: 2rpx;
	}

	.origin-title {
		color: #47bff7;
		font-size: 24rpx;
	}

	.article-content {
		display: flex;
		align-items: center;
		margin-top: 20rpx;

		.left-content {
			flex: 1;
			height: 120rpx;

			overflow: hidden;

			.article-text {
				line-height: 40rpx;

				color: #666;
				font-size: 28rpx;
				letter-spacing: 2rpx;
			}
		}

		.right-avatar {
			width: 220rpx;
			height: 160rpx;
			margin-left: 30rpx;

			.avatar {
				width: 100%;
				height: 100%;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
