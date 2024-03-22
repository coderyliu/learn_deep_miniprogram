<template>
	<view class="reg-wrap">
		<!-- 医生简介 -->
		<view class="doctor-desc">
			<view class="doctor-info">
				<image :src="doctorInfo?.avatar" mode="widthFix" class="avatar"></image>
				<view class="doctor-name">{{ doctorInfo?.doctorName }}</view>
				<view class="level-text">{{ roleIdToText(doctorInfo?.roleId) }}</view>
			</view>
			<view class="dep-name">就诊科室：{{ doctorInfo?.DepTwoName }}</view>
			<view class="hos-name">出诊医院：{{ doctorInfo?.hosName }}</view>
			<view class="reg-money">
				<text class="title">医事服务费：</text>
				<text class="money">￥{{ doctorInfo?.regMoney }}</text>
			</view>
			<view class="tip-text">医事服务费均在就诊时由医院直接收取，本平台不收取任何费用。</view>
			<view class="brief">擅长：{{ doctorInfo?.brief }}</view>
			<!-- 号源 -->
			<view class="reg-info">
				<view class="time">日期：{{ currentTime }}</view>
				<view class="list-item">
					<view class="title">上午号源</view>
					<view class="num">{{ dutyInfo?.mSurplus ? dutyInfo?.mSurplus : '无' }}</view>
				</view>
				<view class="list-item">
					<view class="title">下午号源</view>
					<view class="num">{{ dutyInfo?.aSurplus ? dutyInfo?.aSurplus : '无' }}</view>
				</view>
			</view>
		</view>
		<!-- 挂号表单 -->
		<view class="patient-info">
			<view class="title">信息填写</view>
			<view class="select-wrap">
				<view class="section-title">就诊人</view>
				<picker mode="selector" @change="handlePickerChange($event, 'patient')" :value="selectIndex"
					:range="columnList">
					<view class="picker">当前选择：{{ columnList[selectIndex] }}</view>
				</picker>
			</view>
			<view class="select-wrap">
				<view class="section-title">就诊时间</view>
				<picker mode="selector" @change="handlePickerChange($event, 'time')" :value="timeIndex" :range="timeList">
					<view class="picker">当前选择：{{ timeList[timeIndex] }}</view>
				</picker>
			</view>
		</view>
		<view class="confirm-btn" @click="handleConfirmClick">确定挂号</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';
import usePersonStore from '@/store/person.js';
import { addRegisterFetch } from '@/api/hos.js';
import { handleTimeFn, formatTime } from '@/utils/formatTime.js';
import { roleIdToText } from '@/utils/mapIdToText.js';

const hosStore = useHosStore();
const personStore = usePersonStore();
const { doctorInfo, dutyInfo, timeList } = storeToRefs(hosStore);
const { patientList, columnList } = storeToRefs(personStore);

const currentTime = ref();
const selectIndex = ref(0);
const timeIndex = ref(0);

//选择器
const handlePickerChange = (e, type) => {
	if (type === 'patient') {
		selectIndex.value = Number(e.detail.value);
	} else if (type === 'time') {
		timeIndex.value = Number(e.detail.value);
	}
};

//确认挂号
const handleConfirmClick = async () => {
	if (!timeList.value.length) {
		return uni.showToast({
			title: '没有号源，请选择其他时间',
			icon: 'none',
			duration: 1500
		});
	}

	if (!patientList.value.length) {
		return uni.showToast({
			title: '请添加就诊人信息',
			icon: 'none',
			duration: 1500
		});
	}

	try {
		const patientId = patientList.value[selectIndex.value]?.id;

		// 挂号
		const res = await addRegisterFetch({
			hosId: doctorInfo.value.hosId,
			depTwoId: doctorInfo.value.depTwoId,
			patientId: patientId,
			doctorId: doctorInfo.value.id,
			dutyTime: currentTime.value,
			segment: timeIndex.value ? dutyInfo.value.aTimeSegment : dutyInfo.value.mTimeSegment,
			state: 1,
			regMoney: doctorInfo.value.regMoney,
			tState: timeIndex.value ? '下午' : '上午',
			surplus: timeIndex.value ? dutyInfo.value.aSurplus : dutyInfo.value.mSurplus,
			dutyId: dutyInfo.value.id
		});

		if (res.data.code === 1) {
			timeIndex.value = 0;
			selectIndex.value = 0;

			return uni.showToast({
				title: '挂号成功',
				icon: 'success',
				duration: 1500
			});
		} else if (res.data.data === 'USER_HAS_REGISTER') {
			return uni.showToast({
				title: '不能重复挂号',
				icon: 'none',
				duration: 1500
			});
		}
	} catch (error) {
		return uni.showToast({
			title: '挂号失败，请稍后重试',
			icon: 'none',
			duration: 1500
		});
	}
};

onLoad(option => {
	currentTime.value = option.time;

	hosStore.changDoctorInfoAction(option.doctorId);
	hosStore.changDoctorDutyInfoAction(option.doctorId, option.time);
	personStore.changePatientListAction();
});
</script>

<style lang="scss">
page {
	background-color: #f6f7f9;
}

.reg-wrap {
	.doctor-desc {
		padding: 20rpx;

		background-color: #fff;
		box-sizing: border-box;

		.doctor-info {
			display: flex;
			align-items: center;

			margin-bottom: 20rpx;

			.avatar {
				width: 100rpx;

				border-radius: 50%;
			}

			.doctor-name {
				padding: 0 20rpx;

				font-size: 36rpx;
				font-weight: 700;
			}

			.reg-money .money {
				color: red;
			}
		}

		.tip-text {
			padding: 10rpx 0;

			color: #1eccea;
			font-size: 24rpx;
		}

		.reg-info {
			padding: 30rpx 0 10rpx;
			border-top: 2rpx solid #eee;
			margin-top: 30rpx;

			.time {
				font-weight: 700;
			}

			.list-item {
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding: 20rpx 0;

				.num {
					padding: 10rpx 40rpx;
					border-radius: 20rpx;
					margin-left: 30rpx;

					color: #fff;

					background-color: #1ec0d8;
				}
			}
		}
	}

	.patient-info {
		padding: 20rpx;
		margin-top: 20rpx;

		background-color: #fff;
		box-sizing: border-box;

		.select-wrap {
			display: flex;
			align-items: center;

			padding: 20rpx 0;
			border-radius: 10rpx;
			margin-top: 20rpx;

			background-color: #f6f7f9;

			.section-title {
				width: 200rpx;
				padding: 0 30rpx;
				border-right: 2rpx solid #d5d5d5;
				margin-right: 20rpx;

				font-weight: 700;
				text-align: center;

				box-sizing: border-box;
			}
		}

		.patient-wrap .picker {
			color: #666;
		}

		.title {
			font-size: 36rpx;
			font-weight: 700;
		}
	}

	.confirm-btn {
		width: 350rpx;
		height: 80rpx;
		line-height: 80rpx;
		border-radius: 40rpx;
		margin: 50rpx auto;

		color: #fff;
		text-align: center;

		background-color: #1ec0d8;
	}
}

.reg-wrap .doctor-desc .dep-name,
.reg-wrap .doctor-desc .hos-name,
.reg-wrap .doctor-desc .brief {
	margin-bottom: 15rpx;
}
</style>
