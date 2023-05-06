<template>
	<view class="history-wrap">
		<!-- 导航栏 -->
		<nav-bar :barList="rechargeNavBarList" :currentTab="currentTab" @barItemClick="handleBarItemClick"></nav-bar>
		<!-- 列表 -->
		<view class="list-wrap" v-if="currentTab === '充值订单'">
			<template v-for="(item, index) in payList" :key="index">
				<view class="list-item">
					<view class="top-desc">
						<view class="left-state">订单号：{{ item.order }}</view>
					</view>
					<view class="bottom-info">
						<view class="time">充值时间：{{ item.createTime }}</view>
						<view class="money">
							<text class="title">充值金额：</text>
							<text class="num">￥{{ item.money }}</text>
						</view>
						<view class="state">充值状态：充值成功</view>
					</view>
				</view>
			</template>
		</view>
		<view class="list-wrap" v-if="currentTab === '挂号订单'">
			<template v-for="(item, index) in rechargeList" :key="index">
				<view class="list-item">
					<view class="top-desc">
						<view class="left-state">订单号：{{ item.order }}</view>
					</view>
					<view class="bottom-info">
						<view class="time">交易时间：{{ item.createTime }}</view>
						<view class="money">
							<text class="title">交易金额：</text>
							<text class="num">￥{{ item.money }}</text>
						</view>
						<view class="state">交易状态：已付款</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

import usePersonStore from '@/store/person.js';
import { rechargeNavBarList } from '@/constants/menu.js';

const personStore = usePersonStore();
const { payList, rechargeList, payTotal, rechargeTotal } = storeToRefs(personStore);

const currentTab = ref('充值订单');
const currentPage = ref(1);

// 导航栏点击
const handleBarItemClick = data => {
	currentPage.value = 1;
	currentTab.value = data.name;

	if (currentTab.value === '充值订单') {
		personStore.changePayListAction();
	} else {
		personStore.changeRechargeListAction();
	}
};

// 上拉刷新
onPullDownRefresh(() => {
	currentPage.value = 1;
	currentTab.value = '充值订单';
	uni.stopPullDownRefresh();

	personStore.changePayListAction();
});

// 下拉加载更多
onReachBottom(() => {
	if (currentTab.value === '充值订单') {
		const totalPage = Math.ceil(payTotal.value / 10);
		const page = currentPage.value + 1;
		if (totalPage < page) return;

		personStore.changePayListAction({ limit: page * 10 });
		currentPage.value = page;
	} else {
		const totalPage = Math.ceil(rechargeTotal.value / 10);
		const page = currentPage.value + 1;
		if (totalPage < page) return;

		personStore.changeRechargeListAction({ limit: page * 10 });
		currentPage.value = page;
	}
});

onMounted(() => {
	personStore.changePayListAction();
});
</script>

<style lang="scss">
page {
	background-color: #f2f4f8;
}

.history-wrap {
	.list-wrap {
		padding: 30rpx 20rpx;

		.list-item {
			padding: 20rpx 30rpx;
			border-radius: 10rpx;
			margin-bottom: 20rpx;

			background-color: #fff;
			box-sizing: border-box;

			.top-desc {
				display: flex;
				justify-content: space-between;
				align-items: center;

				padding-bottom: 20rpx;
				border-bottom: 2rpx solid #eee;

				font-weight: 500;
				font-size: 28rpx;
				color: #666;
			}

			.bottom-info {
				padding-top: 20rpx;

				color: #666;

				.money {
					padding: 20rpx 0;
					.num {
						color: red;
					}
				}
			}
		}
	}
}
</style>
