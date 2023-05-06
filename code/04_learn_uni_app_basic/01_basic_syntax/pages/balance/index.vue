<template>
	<view class="balance-wrap">
		<view class="balance-info">
			<text class="title">账户余额</text>
			<text class="money">{{ userInfo.money }}元</text>
		</view>
		<view class="pay-title">账户充值</view>
		<view class="pay-wrap" @click="handleMoneyItemClick">
			<view :class="[payMoney == 10 ? 'list-item active' : 'list-item']" id="10">￥10.00</view>
			<view :class="[payMoney == 30 ? 'list-item active' : 'list-item']" id="30">￥30.00</view>
			<view :class="[payMoney == 50 ? 'list-item active' : 'list-item']" id="50">￥50.00</view>
			<view :class="[payMoney == 100 ? 'list-item active' : 'list-item']" id="100">￥100.00</view>
			<view :class="[payMoney == 200 ? 'list-item active' : 'list-item']" id="200">￥200.00</view>
			<view :class="[payMoney == 300 ? 'list-item active' : 'list-item']" id="300">￥300.00</view>
			<view :class="[payMoney == 500 ? 'list-item active' : 'list-item']" id="500">￥500.00</view>
			<view :class="[payMoney == 1000 ? 'list-item active' : 'list-item']" id="1000">￥1000.00</view>
		</view>
		<view class="pay-btn" @click="handleConfirmClick">确认充值</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

import useMainStore from '@/store/main.js';
import { payAccountMoneyFetch, getUserInfoFetch } from '@/api/person.js';

const mainStore = useMainStore();
const { userInfo } = storeToRefs(mainStore);

const payMoney = ref();

// 点击充值item
const handleMoneyItemClick = e => {
	const id = e.target.id;

	payMoney.value = Number(id);
};

// 确认充值
const handleConfirmClick = async () => {
	if (!payMoney.value) {
		return uni.showToast({
			title: '请选择充值金额',
			icon: 'none',
			duration: 1500
		});
	}

	try {
		const res = await payAccountMoneyFetch({ money: payMoney.value });

		if (res.data?.code === 1) {
			const ret = await getUserInfoFetch();

			if (ret.data?.code === 1) {
				uni.setStorageSync('userInfo', JSON.stringify(ret.data?.data[0]));
				mainStore.changeUserInfoAction(ret.data?.data[0]);

				payMoney.value = '';
				return uni.showToast({
					title: '充值成功',
					icon: 'success',
					duration: 1500
				});
			} else {
				throw new Error('error');
			}
		} else {
			throw new Error('error');
		}
	} catch (error) {
		return uni.showToast({
			title: '充值失败',
			icon: 'error',
			duration: 1500
		});
	}
};
</script>

<style lang="scss">
.balance-wrap {
	padding: 30rpx 20rpx;

	box-sizing: border-box;

	.balance-info {
		display: flex;
		align-items: center;
		justify-content: space-between;

		padding: 30rpx 20rpx;
		border-radius: 10rpx;

		color: #4490f1;

		background-color: #e0efff;
	}

	.pay-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;

		.list-item {
			width: 30%;
			padding: 20rpx 30rpx;
			border: 2rpx solid #eee;
			border-radius: 10rpx;
			margin-right: 20rpx;
			margin-top: 20rpx;

			text-align: center;

			box-sizing: border-box;
		}
	}

	.pay-title {
		padding: 0 20rpx;
		margin-top: 30rpx;
	}

	.pay-btn {
		width: 300rpx;
		padding: 20rpx 0;
		margin: 40rpx auto 0;
		border-radius: 10rpx;

		color: #fff;
		text-align: center;

		background-color: #4096ff;
	}
}

.balance-wrap .pay-wrap .hover,
.balance-wrap .pay-wrap .active {
	border-color: #4490f1;

	color: #4490f1;
}
</style>
