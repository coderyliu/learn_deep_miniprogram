<template>
	<view class="search-wrap">
		<template v-for="item in depList" :key="item.hosId">
			<view class="card-item">
				<view class="top-info-wrap">
					<view class="item-left"><image class="picture" :src="item.picture" mode="widthFix" /></view>
					<view class="item-right">
						<view class="top-title omit">{{ item.hosName }}</view>
						<view class="bottom-desc">
							<view class="levelText">
								<text class="text">{{ levelIdToText(item.levelText) }}</text>
							</view>
							<view class="openTimeText">
								<text class="text">每天{{ item.openTimeText }}放号</text>
							</view>
						</view>
					</view>
				</view>
				<view class="bottom-dep-list">
					<template v-for="subItem in item.children" :key="subItem">
						<view class="dep-item" @click="handleDepItemClick(item, subItem)">{{ subItem.depName }}</view>
					</template>
				</view>
			</view>
		</template>
		<view v-if="!depList.length" class="tip-text">暂无相关门诊数据</view>
	</view>
</template>

<script setup>
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useDepStore from '@/store/dep.js';
import { levelIdToText } from '@/utils/mapIdToText.js';

const depStore = useDepStore();
const { searchDepList: depList } = storeToRefs(depStore);

// 门诊点击
const handleDepItemClick = (item, subItem) => {
	uni.navigateTo({
		url: `/pages/doctor-list/index?hosId=${item.hosId}&depTwoId=${subItem.id}`
	});
};

onLoad(option => {
	depStore.changeSearchDepListAction({ depName: option.depName });
});
</script>

<style lang="scss">
page {
	height: 100%;
	background-color: #f5f3f3;

	.search-wrap {
		padding: 20rpx;

		box-sizing: border-box;

		.card-item {
			padding: 20rpx;
			border-radius: 10rpx;
			margin-bottom: 40rpx;

			background-color: #fff;
			box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);

			.top-info-wrap {
				display: flex;
				align-items: center;

				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #eee;
				.item-right {
					flex: 1;

					.top-title {
						width: 500rpx;
						padding-bottom: 15rpx;

						font-size: 30rpx;
						font-weight: 700;
						letter-spacing: 1rpx;
					}

					.bottom-desc {
						display: flex;
						align-items: center;
						margin-top: 10rpx;

						color: #999;
						font-size: 28rpx;
					}
					.openTimeText {
						margin-left: 60rpx;
					}
				}
				.item-left .picture {
					width: 160rpx;
				}
			}

			.bottom-dep-list {
				display: flex;
				flex-wrap: wrap;
				align-items: center;
				justify-content: flex-start;
				padding-top: 20rpx;

				.dep-item {
					padding: 14rpx 20rpx;
					border-radius: 10rpx;
					margin-right: 20rpx;
					margin-bottom: 20rpx;

					color: rgb(73, 144, 241);
					font-size: 28rpx;

					background-color: rgb(247, 251, 255);
					box-sizing: border-box;
				}
			}
		}
		.tip-text {
			line-height: 300rpx;

			color: #333;
			font-size: 32rpx;
			font-weight: 700;
			letter-spacing: 2rpx;
			text-align: center;
		}
	}
}
</style>
