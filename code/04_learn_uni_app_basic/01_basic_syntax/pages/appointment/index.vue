<template>
	<view class="hos-list-wrap">
		<template v-for="item in hosList" :key="item.id">
			<hos-card-v1 :dataInfo="item"></hos-card-v1>
		</template>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { onPullDownRefresh, onReachBottom } from '@dcloudio/uni-app';

import useHosStore from '@/store/hos.js';

const hosStore = useHosStore();
const { hosTotal, hosList } = storeToRefs(hosStore);

const currentPage = ref(1);

// 上拉刷新
onPullDownRefresh(async () => {
	currentPage.value = 1;
	await hosStore.changeHosListAction();
	uni.stopPullDownRefresh();
});

// 下拉加载更多
onReachBottom(() => {
	const totalPage = Math.ceil(hosTotal.value / 10);
	const page = currentPage.value + 1;

	if (totalPage < page) return;
	hosStore.changeHosListAction({ limit: page * 10 });
	currentPage.value = page;
});

onMounted(() => {
	currentPage.value = 1;
	hosStore.changeHosListAction({});
});
</script>

<style lang="scss">
page {
	padding: 20rpx;

	background-color: #fefefe;
	box-sizing: border-box;
}
</style>
