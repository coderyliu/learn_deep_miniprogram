<template>
	<view class="find-wrap">
		<!-- 导航栏 -->
		<nav-bar :bar-list="depList" :is-show-total="true" :current-tab="currentTab" @barItemClick="handleBarItemClick"></nav-bar>
		<!-- 文章列表 -->
		<view class="article-list">
			<template v-for="item in articleList" :key="item.id">
				<article-card :dataInfo="item"></article-card>
			</template>
		</view>
	</view>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { onPullDownRefresh, onReachBottom, onLoad } from '@dcloudio/uni-app';

import useFindStore from '@/store/find.js';
import useDepStore from '@/store/dep.js';

const findStore = useFindStore();
const depStore = useDepStore();
const { articleList, total } = storeToRefs(findStore);
const { depList } = storeToRefs(depStore);

const currentTab = ref('all');
const currentPage = ref(1);

// 导航栏点击
const handleBarItemClick = data => {
	currentTab.value = data.name;
	let depName = data.name;
	if (data.name === 'all') {
		depName = '';
	}

	currentPage.value = 1;
	findStore.changeArticleListAction({
		depName
	});
};

// 上拉刷新页面
onPullDownRefresh(async () => {
	currentTab.value = 'all';
	currentPage.value = 1;

	uni.stopPullDownRefresh();
	await findStore.changeArticleListAction();
});

// 下拉加载更多
onReachBottom(() => {
	const totalPage = Math.ceil(total.value / 10);
	const page = currentPage.value + 1;

	if (totalPage < page) return;
	findStore.changeArticleListAction({ depName: currentTab.value === 'all' ? '' : currentTab.value, limit: page * 10 });
	currentPage.value = page;
});

onLoad(() => {
	depStore.changeDepartmentListAction();
	findStore.changeArticleListAction();
});
</script>

<style lang="scss">
.find-wrap {
	.article-list {
		padding-bottom: 30rpx;
	}
}
</style>
