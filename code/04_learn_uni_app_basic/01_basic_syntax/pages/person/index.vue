<template>
	<view class="person-wrap">
		<!-- 顶部登录区域 -->
		<view class="login-wrap">
			<view class="left-avatar"><image class="avatar" src="../../static/images/person-avatar.png" mode="widthFix"></image></view>
			<view class="right-info">
				<view class="login-title" v-if="!isLogin" @click="handleLoginClick">点击登录</view>
				<view class="phone-num" v-else>{{ userInfo?.phone }}</view>
				<view class="text">关注健康生活</view>
			</view>
		</view>
		<!-- 就诊人、收藏 -->
		<view class="card-wrap">
			<home-card-v1
				title="我的就诊人"
				url="/pages/patient/index"
				color="#333"
				backgroundColor="#fff"
				:isShowSubtitle="false"
				imgPath="../../static/images/patient.png"
			></home-card-v1>
			<home-card-v1 title="我的关注" color="#333" backgroundColor="#fff" :isShowSubtitle="false" imgPath="../../static/images/collect.png"></home-card-v1>
		</view>
		<!-- 底部功能区域 -->
		<view class="bottom-wrap">
			<!-- 用户功能 -->
			<view class="user-field-wrap">
				<view class="top-field">
					<view class="title">我的预约挂号</view>
					<view class="more" @click="handleMoreClick">全部挂号 &gt;</view>
				</view>
				<view class="bottom-list">
					<template v-for="(item, index) in userFieldList" :key="item.value">
						<view class="item" @click="handleMoreClick(item.value)">
							<image :src="item.imgPath" mode="widthFix" class="picture"></image>
							<view class="text">{{ item.title }}</view>
						</view>
					</template>
				</view>
			</view>
			<!-- 系统功能 -->
			<view class="system-field-wrap">
				<template v-for="(item, index) in systemFieldList" :key="item.value">
					<view class="item" @click="handleSystemItemClick(item.value)">
						<image :src="item.imgPath" mode="widthFix" class="picture"></image>
						<view class="text">{{ item.title }}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import useMainStore from '@/store/main.js';
import { systemFieldList, userFieldList } from '@/constants/menu.js';

//使用pinia
const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);

const isLogin = ref(false);

// 点击登录弹出登录页面
const handleLoginClick = () => {
	uni.navigateTo({
		url: '/pages/login/index'
	});
};

// 预约挂号
const handleMoreClick = () => {
	if (!isLogin.value) {
		return uni.navigateTo({
			url: '/pages/login/index'
		});
	} else {
		uni.navigateTo({
			url: '/pages/register/index'
		});
	}
};

// 系统功能点击
const handleSystemItemClick = type => {
	switch (type) {
		case 'about':
			uni.navigateTo({
				url: '/pages/about/index'
			});
			break;
		case 'feedback':
			if (!isLogin.value) {
				uni.navigateTo({
					url: '/pages/login/index'
				});
			} else {
				uni.navigateTo({
					url: '/pages/feedback/index'
				});
			}
			break;
		case 'account':
			if (!isLogin.value) {
				uni.navigateTo({
					url: '/pages/login/index'
				});
			} else {
				uni.navigateTo({
					url: '/pages/account/index'
				});
			}
			break;
		case 'private':
			uni.navigateTo({
				url: '/pages/private/index'
			});
			break;
		case 'service':
			uni.navigateTo({
				url: '/pages/service/index'
			});
			break;
		default:
			break;
	}
};
</script>

<style lang="scss">
page {
	background-color: #efeff4;

	.person-wrap {
		.login-wrap {
			display: flex;
			align-items: center;
			padding: 200rpx 30rpx 60rpx;

			background-color: #e0f2ff;
			box-sizing: border-box;

			.left-avatar {
				width: 160rpx;
				height: 130rpx;
				.avatar {
					width: 100%;
					height: 100%;

					border-radius: 50%;
				}
			}

			.right-info {
				margin-left: 30rpx;

				letter-spacing: 2rpx;
				.login-title {
					font-size: 40rpx;
					font-weight: 700;
				}

				.phone-num {
					font-size: 40rpx;
					font-weight: 700;
					letter-spacing: 1rpx;
				}

				.text {
					margin-top: 10rpx;

					color: #666;
					font-size: 30rpx;
				}
			}
		}

		.card-wrap {
			display: flex;
			justify-content: space-between;
			align-items: center;

			padding: 0 20rpx;
			margin-top: -20rpx;

			box-sizing: border-box;
		}

		.bottom-wrap {
			padding: 20rpx;

			background-color: #efeff4;
			box-sizing: border-box;

			.user-field-wrap {
				padding: 20rpx;
				border-radius: 15rpx;
				margin-bottom: 25rpx;

				background-color: #fff;
				box-sizing: border-box;

				.top-field {
					display: flex;
					justify-content: space-between;
					align-items: center;

					margin-bottom: 25rpx;

					font-size: 32rpx;
				}

				.more {
					color: #666;
					font-size: 26rpx;
				}
			}

			.system-field-wrap {
				padding: 20rpx;
				border-radius: 15rpx;

				background-color: #fff;
				box-sizing: border-box;

				.item .text {
					margin-top: 10rpx;

					font-size: 32rpx;
					font-weight: normal;
					letter-spacing: 1rpx;
				}
			}
		}
	}
}

.person-wrap .bottom-wrap .user-field-wrap .bottom-list,
.person-wrap .bottom-wrap .system-field-wrap {
	display: flex;
	flex-wrap: wrap;
	justify-content: flex-start;
	align-items: center;
}

.person-wrap .bottom-wrap .system-field-wrap .item,
.person-wrap .bottom-wrap .user-field-wrap .item {
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 25%;
	margin-bottom: 30rpx;
}

.person-wrap .bottom-wrap .system-field-wrap .item .picture,
.person-wrap .bottom-wrap .user-field-wrap .item .picture {
	width: 70rpx;
	background-color: #fff;
}
</style>
