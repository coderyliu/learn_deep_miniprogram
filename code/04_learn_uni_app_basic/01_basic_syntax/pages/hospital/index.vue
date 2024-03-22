<template>
	<view class="hospital-wrap">
		<nav-bar :bar-list="hosNavBarList" :current-tab="currentTab" @barItemClick="handleBarItemClick"></nav-bar>
		<!-- 科室列表区域 -->
		<view class="hos-info-wrap" v-if="currentTab === '科室列表'">
			<view class="top-info-wrap">
				<view class="item-left">
					<image class="picture" :src="detailInfo.picture" mode="widthFix" />
				</view>
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
					<view :class="[index === currentAsideIndex ? 'aside-item active omit' : 'aside-item omit']"
						@click="handleAsideItemClick(index)">{{ item.name }}</view>
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
		<view class="content-info-wrap" v-if="currentTab === '预约须知'"><rich-text class="content"
				:nodes="knowInfo?.article"></rich-text></view>
		<!-- 停诊通知 -->
		<view class="notice-wrap" v-if="currentTab === '停诊信息'">
			<template v-for="(item, index) in scheduleList" :key="index">
				<view class="list-item">
					<view class="top-desc">
						<view class="left-state">停诊时间：{{ item.time }}</view>
					</view>
					<view class="bottom-info">
						<view class="dep-name">科室：{{ item.depTwoName }}</view>
						<view class="doctor-name">医生：{{ item.doctorName }}</view>
						<view class="doctor-level">职称：{{ roleIdToText(item.roleId) }}</view>
						<view class="doctor-brief omit" style="margin-top:20rpx;">特长：{{ item.brief }}</view>
					</view>
				</view>
			</template>
		</view>
		<!-- 医院反馈 -->
		<view class="feedback-wrap" v-if="currentTab === '意见反馈'">
			<view class="feedback-title">医院挂号服务意见反馈</view>
			<textarea :value="feedbackContent" @input="handleTextAreaInput"
				style="width:100%;height:300rpx;padding:20rpx;border:1px solid #d9d9d9;margin-top:20rpx;border-radius: 10rpx;box-sizing: border-box;"
				:maxlength="300" placeholder="请输入您的意见，我们会根据您的反馈认真改进" placeholder-style="font-size:28rpx;" />
			<view class="sent-btn" @click="handleSendFeedback">递交意见</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';
import { addHosFeedbackFetch } from '@/api/hos.js';
import { levelIdToText, roleIdToText } from '@/utils/mapIdToText.js';
import { hosNavBarList } from '@/constants/menu.js';

const hosStore = useHosStore();
const { ruleInfo, knowInfo, detailInfo, depList, scheduleList } = storeToRefs(hosStore);

const currentTab = ref('科室列表');
const hosId = ref();
const isShowTotal = ref(false);
const currentAsideIndex = ref(0);
const feedbackContent = ref('');

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
		case '停诊信息':
			hosStore.changeScheduleListAction({ hosId: hosId.value });
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

// 反馈表单内容改变
const handleTextAreaInput = e => {
	feedbackContent.value = e.detail.value;
};

// 医院反馈
const handleSendFeedback = async () => {
	try {
		const token = uni.getStorageSync('token');
		if (!token) {
			uni.navigateTo({
				url: '/pages/login/index'
			});
		}
		if (!feedbackContent.value) {
			return uni.showToast({
				title: '反馈内容为空',
				icon: 'none',
				duration: 1500
			});
		}

		const res = await addHosFeedbackFetch({
			article: feedbackContent.value,
			hosId: hosId.value
		});

		if (res.data.code === 1) {
			feedbackContent.value = '';

			return uni.showToast({
				title: '反馈成功',
				icon: 'success',
				duration: 1500
			});
		} else {
			throw new Error(res.data);
		}
	} catch (error) {
		return uni.showToast({
			title: '反馈失败',
			icon: 'error',
			duration: 1500
		});
	}
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

	.feedback-wrap {
		margin-top: 30rpx;

		.feedback-title {
			margin-bottom: 30rpx;

			font-size: 36rpx;
			font-weight: 700;
			letter-spacing: 1px;
		}

		.sent-btn {
			width: 140px;
			height: 40px;
			line-height: 40px;
			margin: 20px auto 0;
			border-radius: 5px;

			color: rgb(255, 255, 255);
			font-size: 16px;
			text-align: center;

			background-color: rgb(68, 144, 241);
			box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 2px;
		}
	}

	.notice-wrap {
		margin-top: 20rpx;

		.list-item {
			padding: 20rpx 30rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			box-sizing: border-box;
			background-color: #eeeded;

			.top-desc {
				display: flex;
				justify-content: space-between;
				align-items: center;

				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #d5d5d5;

				font-weight: 600;
				font-size: 28rpx;
				color: #666;
			}

			.bottom-info {
				padding-top: 20rpx;

				color: #666;

				.doctor-name {
					padding: 20rpx 0;
				}
			}
		}
	}
}
</style>
