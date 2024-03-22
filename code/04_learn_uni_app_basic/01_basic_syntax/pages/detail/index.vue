<template>
	<view class="doctor-detail-wrap">
		<view class="person-info">
			<view class="title">个人介绍</view>
			<view class="top-doctor-info">
				<view class="avatar-wrap">
					<image :src="doctorInfo?.avatar" mode="widthFix" class="picture"></image>
				</view>
				<view class="hos-info">
					<view class="hos-name" @click="handleHosClick">{{ doctorInfo?.hosName }}</view>
					<view class="doctor-info">
						<text class="doctor-name">{{ doctorInfo?.doctorName }}</text>
						<text class="level-text">{{ roleIdToText(doctorInfo?.roleId) }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="brief-desc">
			<view class="title">擅长疾病</view>
			<view class="content">{{ doctorInfo?.brief }}</view>
		</view>
		<view class="duty-wrap">
			<view class="title">出诊信息</view>
			<view class="hos-name omit" style="margin-bottom:10rpx; color:#666;font-size: 28rpx;">出诊医院：{{ doctorInfo?.hosName
				}}</view>
			<view class="dep-name omit" style="color:#666;font-size: 28rpx;">出诊科室：{{ doctorInfo?.DepTwoName }}</view>
			<view class="duty-list">
				<template v-for="(item, index) in appointmentList" :key="index">
					<view class="list-item" @click="handleTimeSelectClick(item.day)">
						<view class="time omit">{{ item.time }}</view>
						<view class="num-source omit">{{ item.day === appointmentCycle ? '即将放号' : '详情' }}</view>
					</view>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';
import { handleTimeFn, formatTime } from '@/utils/formatTime.js';
import { roleIdToText } from '@/utils/mapIdToText.js';

const hosStore = useHosStore();
const { doctorInfo } = storeToRefs(hosStore);

const appointmentCycle = ref(15);
const appointmentList = ref([]);

// 跳转至医院
const handleHosClick = () => {
	uni.navigateTo({
		url: `/pages/hospital/index?hosId=${doctorInfo.value.hosId}`
	});
};

// 跳转至挂号详情页面
const handleTimeSelectClick = day => {
	const date = new Date();
	date.setDate(date.getDate() + day);

	const time = formatTime(date).replace(/\//gi, '-');
	uni.navigateTo({
		url: `/pages/reg/index?doctorId=${doctorInfo.value?.id}&time=${time}`
	});
};

onLoad(option => {
	// 生成遍历时间
	let appointmentSet = Array.from({ length: appointmentCycle.value }, (v, i) => i + 1);

	appointmentSet = appointmentSet.map(v => {
		const time = handleTimeFn(v);
		return {
			time,
			day: v
		};
	});

	appointmentList.value = appointmentSet;
	hosStore.changDoctorInfoAction(option.doctorId);
});
</script>

<style lang="scss">
page {
	background-color: #f2f2f3;
}

.doctor-detail-wrap {
	padding: 30rpx 20rpx;

	box-sizing: border-box;

	.person-info {
		width: 100%;
		padding: 20rpx 20rpx;
		border-radius: 20rpx;

		background-color: #fff;
		box-sizing: border-box;
	}

	.top-doctor-info {
		display: flex;
		align-items: flex-start;
		margin-top: 30rpx;

		.picture {
			width: 150rpx;

			border-radius: 20rpx;
		}

		.hos-info {
			flex: 1;
			margin-left: 20rpx;

			font-size: 32rpx;

			.hos-name {
				width: 480rpx;
				margin-bottom: 10rpx;

				font-weight: 700;
			}

			.doctor-info {
				font-weight: 600;
				letter-spacing: 1rpx;

				.doctor-name {
					margin-right: 30rpx;
				}
			}
		}
	}
}

.doctor-detail-wrap .brief-desc,
.doctor-detail-wrap .duty-wrap {
	padding: 20rpx;
	border-radius: 20rpx;
	margin-top: 20rpx;

	background-color: #fff;
	box-sizing: border-box;
}

.doctor-detail-wrap .brief-desc .title,
.doctor-detail-wrap .person-info .title,
.doctor-detail-wrap .duty-wrap .title {
	margin-bottom: 10rpx;

	font-size: 36rpx;
	font-weight: 700;
}

.doctor-detail-wrap .brief-desc .content {
	color: #666;

	letter-spacing: 2rpx;
}

.doctor-detail-wrap .duty-wrap .duty-list {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
	align-items: center;

	padding: 20rpx 0;
}

.doctor-detail-wrap .duty-wrap .duty-list .list-item {
	width: 31%;
	height: 154rpx;
	border: 2rpx solid #eee;
	border-radius: 15rpx;
	margin-bottom: 20rpx;

	color: #fff;
	font-size: 28rpx;
	text-align: center;

	box-sizing: border-box;
}

.doctor-detail-wrap .duty-wrap .duty-list .list-item .time,
.doctor-detail-wrap .duty-wrap .duty-list .list-item .num-source {
	height: 75rpx;
	line-height: 75rpx;
	border-top-left-radius: 15rpx;
	border-top-right-radius: 15rpx;

	background-color: #1ec0d8;
}

.doctor-detail-wrap .duty-wrap .duty-list .list-item .num-source {
	border-bottom-left-radius: 15rpx;
	border-bottom-right-radius: 15rpx;

	color: #333;

	background-color: #fff;
}
</style>
