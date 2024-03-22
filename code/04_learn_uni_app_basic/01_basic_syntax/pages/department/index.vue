<template>
	<view class="dep-wrap">
		<view class="left-aside">
			<template v-for="(item, index) in depList" :key="item.id">
				<view :class="[index === currentAsideIndex ? 'aside-item active omit' : 'aside-item omit']"
					@click="handleAsideItemClick(index)">{{ item.name }}</view>
			</template>
		</view>
		<view class="right-content">
			<template v-for="(menu, index) in depList" :key="menu.id + '-' + Date.now()">
				<template v-if="index === currentAsideIndex" v-for="submenu in menu.subList" :key="submenu.name + submenu.id">
					<view class="sub-item omit" @click="handleDepItemClick(submenu)">{{ submenu.name }}</view>
				</template>
			</template>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import useDepStore from '@/store/dep.js';

const depStore = useDepStore();
const { depList } = storeToRefs(depStore);

const currentAsideIndex = ref(0);

// 侧边栏点击
const handleAsideItemClick = index => {
	currentAsideIndex.value = index;
};

// 门诊点击
const handleDepItemClick = depData => {
	console.log(depData);
};

onMounted(() => {
	depStore.changeDepartmentListAction();
});
</script>

<style lang="scss">
.dep-wrap {
	display: flex;
	height: 100vh;

	overflow: hidden;

	.left-aside {
		width: 40%;
		border-right: 2rpx solid #eee;

		overflow-y: auto;
		box-sizing: border-box;

		&::-webkit-scrollbar {
			display: none;
		}

		.aside-item {
			height: 60rpx;
			line-height: 60rpx;
			padding: 20rpx;
			border-bottom: 2rpx solid #d5d5d5;

			background-color: #f5f5f5;

			&.active {
				background-color: #fff;
			}
		}
	}

	.right-content {
		width: 60%;
		overflow-y: auto;

		.sub-item {
			height: 60rpx;
			line-height: 60rpx;
			padding: 20rpx;
		}
	}
}
</style>
