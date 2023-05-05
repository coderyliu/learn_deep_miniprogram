<template>
	<view class="home-card-v1-wrap">
		<view class="title">{{ title }}</view>
		<view class="more" @click="handleMoreClick">全部 &gt;</view>
	</view>
</template>

<script setup>
const props = defineProps({
	title: String
});
const emits = defineEmits(['moreClick']);

// 全部点击
const handleMoreClick = () => {
	emits('moreClick');
};
</script>

<style lang="scss">
.home-card-v1-wrap {
	display: flex;
	align-items: center;
	justify-content: space-between;

	.title {
		font-size: 36rpx;
		font-weight: 700;
	}

	.more {
		color: #666;
		font-size: 28rpx;
	}
}
</style>
