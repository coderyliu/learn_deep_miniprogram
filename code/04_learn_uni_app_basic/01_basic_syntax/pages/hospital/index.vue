<template>
	<view class="hospital-wrap">
		<nav-bar :bar-list="hosNavBarList" :current-tab="currentTab" @barItemClick="handleBarItemClick"></nav-bar>
		<!-- 科室列表区域 -->
		<view class="hos-info-wrap" v-if="currentTab === '科室列表'">
			<view class="top-info-wrap">
				<view class="item-left"><image class="picture" :src="detailInfo.picture" mode="widthFix" /></view>
				<view class="item-right">
					<view class="top-title omittwo">{{ detailInfo.name }}</view>
					<view class="bottom-desc">
						<view class="levelText">
							<text class="text">{{ levelIdToText(detailInfo.levelText) }}</text>
						</view>
						<view class="openTimeText">
							<text class="text">每天{{ detailInfo.openTimeText }}放号</text>
						</view>
					</view>
				</view>
			</view>
			<view class="bottom-info-wrap" :style="{ height: isShowTotal ? 'auto' : '235rpx', overflow: 'hidden' }">
				<view class="reg-title">预约规则</view>
				<rich-text class="content" :nodes="ruleInfo?.article"></rich-text>
			</view>
			<view class="show-btn"><text class="btn" @click="handleShowTotalClick">展开更多介绍</text></view>
		</view>
		<view class="dep-wrap" v-if="currentTab === '科室列表'">
			<view class="left-aside">
				<template v-for="(item, index) in depList" :key="item.id">
					<view :class="[index === currentAsideIndex ? 'aside-item active omit' : 'aside-item omit']" @click="handleAsideItemClick(index)">{{ item.name }}</view>
				</template>
			</view>
			<view class="right-content">
				<template v-for="(menu, index) in depList" :key="menu.id + '-' + Date.now()">
					<template v-if="index === currentAsideIndex" v-for="submenu in menu.subList" :key="submenu.name + submenu.id">
						<view class="sub-item omit" @click="handleDepItemClick(menu, submenu)">{{ submenu.name }}</view>
					</template>
				</template>
			</view>
		</view>
		<view class="dep-list-wrap"></view>
		<!-- 医院详情 -->
		<view class="content-info-wrap" v-if="currentTab === '医院详情'">
			<view class="content-title">医院介绍</view>
			<rich-text class="content" :nodes="detailInfo?.content"></rich-text>
		</view>
		<!-- 预约须知 -->
		<view class="content-info-wrap" v-if="currentTab === '预约须知'"><rich-text class="content" :nodes="knowInfo?.article"></rich-text></view>
		<!-- 停诊通知 -->
		<!-- 医院反馈 -->
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';
import { levelIdToText } from '@/utils/mapIdToText.js';

import { hosNavBarList } from '@/constants/menu.js';

const hosStore = useHosStore();
const { ruleInfo, knowInfo, detailInfo, depList } = storeToRefs(hosStore);

const currentTab = ref('科室列表');
const hosId = ref();
const isShowTotal = ref(false);
const currentAsideIndex = ref(0);

// 导航栏点击
const handleBarItemClick = data => {
	currentTab.value = data.name;

	switch (data.name) {
		case '科室列表':
			hosStore.changeDepListAction(hosId.value);
			hosStore.changeDetailInfoAction(hosId.value);
			break;
		case '医院详情':
			hosStore.changeDetailInfoAction(hosId.value);
			break;
		case '预约须知':
			hosStore.changeKnowInfoAction(hosId.value);
			break;
		default:
			break;
	}
};

// 是否展开预约规则
const handleShowTotalClick = () => {
	isShowTotal.value = !isShowTotal.value;
};

// 侧边栏点击
const handleAsideItemClick = index => {
	currentAsideIndex.value = index;
};

// 科室点击
const handleDepItemClick = (menu, submenu) => {
	uni.navigateTo({
		url: `/pages/doctor-list/index?hosId=${menu.hosId}&depTwoId=${submenu.id}`
	});
};

onLoad(option => {
	hosId.value = option.hosId;
	hosStore.changeDepListAction(hosId.value);
	hosStore.changeDetailInfoAction(hosId.value);
	hosStore.changeRuleInfoAction(hosId.value);
});
</script>

<style lang="scss">
.hospital-wrap {
	padding: 0 20rpx 50rpx;

	box-sizing: border-box;
	background-color: #fff;

	.hos-info-wrap {
		width: 100%;
		padding: 20rpx 0;
		border-radius: 10rpx;
		margin-top: 30rpx;
		margin-bottom: 20rpx;

		box-sizing: border-box;
		background-color: #e0efff;

		.top-info-wrap {
			display: flex;
			align-items: center;

			margin-bottom: 40rpx;
			.item-right {
				flex: 1;

				.top-title {
					width: 500rpx;
					padding-bottom: 15rpx;

					font-size: 30rpx;
					font-weight: 700;
					letter-spacing: 1px;
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

			.item-left {
				width: 160rpx;
				.picture {
					width: 100%;
				}
			}
		}
		.show-btn {
			display: flex;
			justify-content: center;
			align-items: center;

			margin-top: 30rpx;

			.btn {
				padding: 20rpx 40rpx;
				border-radius: 15rpx;

				color: #1ecaea;

				background-color: #eff5ff;
			}
		}
	}
	.bottom-info-wrap {
		.reg-title {
			padding-left: 30rpx;
			margin-bottom: 20rpx;

			font-size: 36rpx;
			font-weight: 700;
			letter-spacing: 1px;
		}

		.content {
			line-height: 40rpx;
			color: #666;
			font-size: 30rpx;
			font-weight: 500;
			letter-spacing: 1px;
		}
	}

	.dep-wrap {
		display: flex;

		.left-aside {
			width: 40%;
			border-right: 2rpx solid #eee;

			box-sizing: border-box;
			.aside-item {
				height: 60rpx;
				line-height: 60rpx;
				padding: 20rpx;
				border-bottom: 2rpx solid #d5d5d5;

				background-color: #f5f5f5;

				&.active {
					background-color: #fff;
				}
			}
		}

		.right-content {
			width: 60%;

			.sub-item {
				height: 60rpx;
				line-height: 60rpx;
				padding: 20rpx;
			}
		}
	}

	.content-info-wrap {
		margin-top: 30rpx;
		.content-title {
			margin-bottom: 20rpx;

			font-size: 36rpx;
			font-weight: 700;
			letter-spacing: 1px;
		}

		.content {
			line-height: 50rpx;
			color: #444;
			font-size: 30rpx;
			font-weight: 500;
			letter-spacing: 1px;
		}
	}
}
</style>
