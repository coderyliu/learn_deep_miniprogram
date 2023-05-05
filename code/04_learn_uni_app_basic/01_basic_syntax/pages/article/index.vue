<template>
	<view class="article-wrap">
		<view class="article-title">{{ articleInfo?.title }}</view>
		<view class="origin-title omit">来源：{{ articleInfo?.hosName }}</view>
		<view class="article-content"><rich-text :nodes="articleInfo?.article"></rich-text></view>
	</view>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useFindStore from '@/store/find.js';

const findStore = useFindStore();
const { articleInfo } = storeToRefs(findStore);

onLoad(option => {
	findStore.changeArticleInfoAction(option.articleId);
});
</script>

<style lang="scss">
.article-wrap {
	width: 100%;
	padding: 20rpx 30rpx 40rpx;

	background-color: #fff;
	box-sizing: border-box;
	.article-title {
		margin-bottom: 10rpx;

		font-size: 34rpx;
		font-weight: 700;
		letter-spacing: 2rpx;
	}
	
	.origin-title {
		color: #47bff7;
		font-size: 24rpx;
		letter-spacing: 1rpx;
	}
	
	.article-content {
		line-height: 52rpx;
		margin-top: 20rpx;

		color: #333;
		font-weight: 500;
		font-size: 28rpx;
		letter-spacing: 4rpx;
	}
}
</style>
