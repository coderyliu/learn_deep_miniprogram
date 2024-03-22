<template>
	<scroll-view class="nav-bar-wrap" :scroll-x="true">
		<view :class="[currentTab === 'all' ? 'bar-item active' : 'bar-item']" v-if="isShowTotal"
			@click="handleBarItemClick('all')">全部</view>
		<template v-for="item in barList" :key="item.id">
			<view :class="[currentTab === item.name ? 'bar-item active omit' : 'bar-item omit']"
				@click="handleBarItemClick(item)">{{ item.name }}</view>
		</template>
	</scroll-view>
</template>

<script setup>
const props = defineProps({
	barList: {
		type: Array,
		default: () => []
	},
	isShowTotal: {
		type: Boolean,
		default: false
	},
	currentTab: String,
	itemWidth: {
		type: Number,
		default: 100
	}
});
const emits = defineEmits(['barItemClick']);

// 导航栏item点击
const handleBarItemClick = v => {
	if (v === 'all') {
		emits('barItemClick', { name: 'all' });
	} else {
		emits('barItemClick', v);
	}
};
</script>

<style lang="scss">
.nav-bar-wrap {
	width: 100vw;

	white-space: nowrap;
	overflow-x: auto;

	&::-webkit-scrollbar {
		display: none;
	}

	.bar-item {
		display: inline-block;
		// width: v-bind(props.itemWidth);
		height: 80rpx;
		line-height: 40rpx;
		padding: 20rpx 5rpx;
		margin-right: 5rpx;

		text-align: center;

		overflow-y: hidden;
		box-sizing: border-box;

		&.active {
			border-bottom: 4rpx solid #1ec0d8;
		}
	}
}
</style>
