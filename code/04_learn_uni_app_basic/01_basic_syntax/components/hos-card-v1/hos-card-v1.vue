<template>
	<view class="hos-card-wrap" @click="handleHosItemClick">
		<view class="item-left">
			<view class="top-title omit">{{ dataInfo?.name }}</view>
			<view class="bottom-desc">
				<view class="levelText">
					<text class="text">{{ levelIdToText(dataInfo?.levelText) }}</text>
				</view>
				<view class="openTimeText">
					<text class="text">每天{{ dataInfo?.openTimeText }}放号</text>
				</view>
			</view>
		</view>
		<view class="item-right">
			<image class="picture" :src="dataInfo?.picture" mode="widthFix" />
		</view>
	</view>
</template>

<script setup>
import { levelIdToText } from '@/utils/mapIdToText.js';

const props = defineProps({
	dataInfo: {
		type: Object,
		default: () => { }
	}
});

const handleHosItemClick = () => {
	uni.navigateTo({
		url: `/pages/hospital/index?hosId=${props.dataInfo?.id}`
	});
};
</script>

<style lang="scss">
.hos-card-wrap {
	display: flex;
	align-items: center;

	padding: 0 20rpx;
	border-radius: 10rpx;
	margin-bottom: 40rpx;

	background-color: #fff;
	box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
	box-sizing: border-box;

	.item-left {
		flex: 1;
		display: flex;
		flex-direction: column;

		.top-title {
			width: 500rpx;
			padding-bottom: 15rpx;
		}

		.bottom-desc {
			display: flex;
			align-items: center;
			margin-top: 10rpx;

			color: #999;
			font-size: 28rpx;

			.openTimeText {
				margin-left: 60rpx;
			}
		}
	}

	.item-right .picture {
		width: 160rpx;
	}
}
</style>
