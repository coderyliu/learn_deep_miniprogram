<template>
	<view class="register-wrap">
		<nav-bar :barList="registerNavBarList" :currentTab="currentTab" @barItemClick="handleItemClick"></nav-bar>
		<view class="register-list">
			<template v-for="(item, index) in registerList" :key="index">
				<view class="list-item">
					<view class="top-desc">
						<view class="left-state">{{ regStateToText(item.regState) }}</view>
						<view class="right-text" @click="cancelRegisterClick(item)" v-if="item.regState === 1">取消挂号</view>
					</view>
					<view class="bottom-info">
						<view class="hosname omit">{{ item.hosName }}</view>
						<view class="doctor-desc">
							<view class="doctor-name omit">{{ item.doctorName }}</view>
							<view class="doctor-level">{{ roleIdToText(item.roleId) }}</view>
							<view class="doctor-reg-money">医事服务费：￥{{ item.regMoney }}</view>
						</view>
						<view class="duty">就诊时间：{{ item.dutyTime }}</view>
						<view class="patient" style="margin-top:15rpx;">就诊人：{{ item.patientName }}</view>
					</view>
				</view>
			</template>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { onReachBottom, onPullDownRefresh } from '@dcloudio/uni-app';

import usePersonStore from '@/store/person.js';
import { cancelRegisterFetch } from '@/api/hos.js';
import { regStateToText, roleIdToText, regTextToId } from '@/utils/mapIdToText.js';
import { registerNavBarList } from '@/constants/menu.js';

const personStore = usePersonStore();
const { registerList, registerTotal } = storeToRefs(personStore);

const currentTab = ref('全部');
const currentPage = ref(1);

// 导航栏点击
const handleItemClick = data => {
	currentTab.value = data.name;

	currentPage.value = 1;
	personStore.changeRegisterListAction({ regState: regTextToId[data.name] });
};

// 取消挂号
const cancelRegisterClick = async data => {
	try {
		const res = await cancelRegisterFetch(
			{
				regMoney: data.regMoney,
				regState: 0
			},
			data.id
		);

		if (res.data.code === 1) {
			personStore.changeRegisterListAction();

			return uni.showToast({
				title: '取消成功',
				icon: 'success',
				duration: 1500
			});
		}
	} catch (error) {
		return uni.showToast({
			title: '取消失败',
			icon: 'error',
			duration: 1500
		});
	}
};

//上拉刷新
onPullDownRefresh(() => {
	currentPage.value = 1;

	uni.stopPullDownRefresh();
	personStore.changeRegisterListAction();
});

// 下拉加载更多
onReachBottom(() => {
	const totalPage = Math.ceil(registerTotal.value / 10);
	const page = currentPage.value + 1;

	if (totalPage < page) return;
	personStore.changeRegisterListAction({ limit: page * 10 });
	currentPage.value = page;
});

onMounted(() => {
	currentPage.value = 1;
	personStore.changeRegisterListAction();
});
</script>

<style lang="scss">
page {
	background-color: #f2f4f8;
}

.register-wrap {
	.register-list {
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

				font-weight: 700;
				color: #666;

				.left-state {
					color: #41a0ff;
					font-size: 34rpx;
				}

				.right-text {
					font-size: 28rpx;
					font-weight: normal;
				}
			}

			.bottom-info {
				padding-top: 20rpx;

				color: #666;

				.doctor-desc {
					display: flex;
					align-items: center;

					padding: 20rpx 0;

					.doctor-level {
						padding: 0 20rpx;
					}
				}
			}
		}
	}
}
</style>
