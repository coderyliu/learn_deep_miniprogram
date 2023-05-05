<template>
	<view class="doctor-list-wrap">
		<!-- 医生列表 -->
		<view class="list-wrap">
			<template v-for="item in doctorList" :key="item.id">
				<doctor-card-v1 :dataInfo="item"></doctor-card-v1>
			</template>
			<view class="tip-text" v-if="!doctorList.length">该科室暂无相关医生人员，请选择其它科室，谢谢配合</view>
		</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onLoad, onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';

const hosStore = useHosStore();
const { doctorList, doctorTotal } = storeToRefs(hosStore);

const hosId = ref();
const depTwoId = ref();
const currentPage = ref(1);

// 页面加载
onLoad(option => {
	currentPage.value = 1;
	hosId.value = option.hosId;
	depTwoId.value = option.depTwoId;

	hosStore.changeDoctorListAction({ hosId: option.hosId, depTwoId: option.depTwoId, depId: '' });
});

// 上拉刷新
onPullDownRefresh(() => {
	currentPage.value = 1;

	uni.stopPullDownRefresh();
	hosStore.changeDoctorListAction({ hosId: hosId.value, depTwoId: depTwoId.value, depId: '' });
});

// 下拉加载更多
onReachBottom(() => {
	const totalPage = Math.ceil(doctorTotal.value / 10);
	const page = currentPage.value + 1;

	if (totalPage < page) return;
	hosStore.changeDoctorListAction({ hosId: hosId.value, depTwoId: depTwoId.value, depId: '', limit: page * 10 });
	currentPage.value = page;
});
</script>

<style lang="scss">
page {
	background-color: #f6f7f9;
	.doctor-list-wrap {
		width: 100%;

		box-sizing: border-box;
		.list-wrap {
			width: 100%;
			padding: 30rpx 40rpx;

			box-sizing: border-box;
		}
		.tip-text {
			height: 100vh;
			margin-top: 80rpx;

			font-size: 40rpx;
			text-align: center;
			letter-spacing: 2rpx;
		}
	}
}
</style>
