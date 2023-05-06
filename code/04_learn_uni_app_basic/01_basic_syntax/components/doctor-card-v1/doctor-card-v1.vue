<template>
	<view class="doctor-card-wrap" @click="handleRegBtnClick">
		<view class="top-info-wrap">
			<view class="left-avatar"><image :src="dataInfo?.avatar" mode="heightFix" class="avatar"></image></view>
			<view class="right-desc">
				<view class="person-info">
					<text class="doctor-name omit">{{ dataInfo?.doctorName }}</text>
					<text class="level-text">{{ roleIdToText(dataInfo?.roleId) }}</text>
				</view>
				<view class="hos-info omit">{{ dataInfo?.hosName }}</view>
			</view>
		</view>
		<view class="brief-text">{{ dataInfo?.brief }}</view>
		<view class="bottom-info-wrap">
			<view class="reg-money">
				挂号费用
				<text class="money-text">￥{{ dataInfo?.regMoney }}</text>
			</view>
			<view class="reg-btn">预约挂号</view>
		</view>
	</view>
</template>

<script setup>
import { roleIdToText } from '@/utils/mapIdToText.js';

const props = defineProps({
	dataInfo: {
		type: Object,
		default: () => {}
	}
});

// 点击预约
const handleRegBtnClick = () => {
	uni.navigateTo({
		url: `/pages/detail/index?doctorId=${props.dataInfo?.id}`
	});
};
</script>

<style lang="scss">
.doctor-card-wrap {
	width: 100%;
	padding: 30rpx;
	border-radius: 10rpx;
	margin-bottom: 20rpx;

	background-color: #fff;
	box-sizing: border-box;

	.top-info-wrap {
		display: flex;
		align-items: center;

		.left-avatar {
			width: 160rpx;
			height: 120rpx;

			margin-right: 30rpx;
			.avatar {
				height: 100%;
				border-radius: 10rpx;
			}
		}

		.right-desc {
			flex: 1;

			.person-info .doctor-name {
				margin-right: 20rpx;

				font-size: 40rpx;
				font-weight: 700;
				letter-spacing: 2rpx;
			}

			.hos-info {
				width: 480rpx;
				margin-top: 10rpx;

				font-weight: normal;
			}
		}
	}

	.brief-text {
		margin-top: 20rpx;

		display: -webkit-box;
		overflow: hidden;
		text-overflow: ellipsis;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;

		color: #666;
		font-size: 28rpx;
		letter-spacing: 2rpx;
	}

	.bottom-info-wrap {
		display: flex;
		align-items: center;
		justify-content: space-between;

		margin-top: 20rpx;

		.reg-money .money-text {
			color: red;
			font-size: 36rpx;
		}

		.reg-btn {
			padding: 10rpx 20rpx;
			border-radius: 10rpx;

			color: #fff;
			font-size: 28rpx;
			text-align: center;
			letter-spacing: 4rpx;

			background-color: #1ec0d8;
		}
	}
}

.doctor-card-wrap .top-info-wrap .right-desc .person-info .level-text,
.doctor-card-wrap .top-info-wrap .right-desc .hos-info {
	font-size: 28rpx;
	font-weight: 600;
	letter-spacing: 2rpx;
}
</style>
