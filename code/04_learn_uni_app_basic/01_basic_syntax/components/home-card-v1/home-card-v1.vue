<template>
	<view class="home-card-v1-wrap" @click="handleCardClick" :style="{ color: color, backgroundColor: backgroundColor }">
		<view class="left">
			<text class="title">{{ title }}</text>
			<text class="subtitle omit" v-if="isShowSubTitle">{{ subtitle }}</text>
		</view>
		<view class="right">
			<image :src="imgPath" mode="widthFix" class="img"></image>
		</view>
	</view>
</template>

<script setup>
import { storeToRefs } from 'pinia';

import useMainStore from '@/store/main.js';

const mainStore = useMainStore();
const { token } = storeToRefs(mainStore);

const props = defineProps({
	title: String,
	subtitle: String,
	imgPath: String,
	url: String,
	backgroundColor: String,
	isShowSubTitle: {
		type: Boolean,
		default: true
	},
	color: {
		type: String,
		default: '#fff'
	}
});

// 卡片点击
const handleCardClick = () => {
	if (props.url === '/pages/patient/index' && !token.value) {
		return uni.navigateTo({
			url: '/pages/login/index'
		});
	}

	if (props.url === '/pages/register/index' && !token.value) {
		return uni.navigateTo({
			url: '/pages/login/index'
		});
	}

	uni.navigateTo({
		url: props.url
	});
};
</script>

<style lang="scss">
.home-card-v1-wrap {
	display: flex;
	justify-content: space-between;
	align-items: center;

	width: 345rpx;
	height: 180rpx;
	padding: 2rpx 20rpx;
	border-radius: 10px;

	color: #fff;
	font-weight: 700;

	background-color: #ff7759;
	box-sizing: border-box;

	.left {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: flex-start;

		.subtitle {
			margin-top: 10rpx;

			font-size: 14px;
			font-weight: normal;
		}
	}

	.right {
		.img {
			width: 50px;
		}
	}
}
</style>
