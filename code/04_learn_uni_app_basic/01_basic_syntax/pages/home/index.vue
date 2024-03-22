<template>
	<!-- 需要注意的是：在uni-app中我们遵循vue sfc组件的开发规范，为了提高编译，性能等在标签上遵循小程序的标签的编写风格 -->
	<!-- 即如果使用div标签，那么还要通过编译才能跨平台，如果使用view标签可以达到跨平台效果 -->
	<!-- <div>我是一个div</div> -->
	<!-- 还要注意的点：由于我们使用的是小程序的标签，之后会转化为H5中的div,span等标签,而且还会有uni-view/uni-image/uni-page等标签 -->
	<!-- 这些标签浏览器是支持的，因为浏览器支持自定义标签custom element -->
	<view class="home-wrap">
		<!-- 卡片区域 -->
		<view class="card-list-wrap">
			<template v-for="item in homeCardList" :key="item.title">
				<home-card-v1 :title="item.title" :subtitle="item.subtitle" :imgPath="item.imgPath" :url="item.url"
					:backgroundColor="item.backgroundColor"></home-card-v1>
			</template>
		</view>
		<!-- 轮播图 swiper -->
		<!-- 标签中的属性遵循的是vue中的规范v-bind v-model v-on v-slot等 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<template v-for="item in bannerList" :key="item.id">
				<swiper-item style="border-radius: 10rpx;">
					<image :src="item.picture" mode="widthFix" class="banner-picture"></image>
				</swiper-item>
			</template>
		</swiper>
		<!-- 常见科室 -->
		<view class="common-dep-wrap">
			<home-header-v1 title="常见科室" @moreClick="handleMoreClick('dep')"></home-header-v1>
			<view class="common-dep-list">
				<template v-for="item in commonDepList" :key="item.id">
					<view class="dep-list-item" @click="handleDepItemClick(item)">
						<image :src="item.imgPath" mode="heightFix" class="dep-picture"></image>
						<view class="title omit">{{ item.name }}</view>
					</view>
				</template>
			</view>
		</view>
		<!-- 精选文章 -->
		<view class="article-list-wrap">
			<home-header-v1 title="精选内容" @moreClick="handleMoreClick('article')"></home-header-v1>
			<view class="article-list">
				<template v-for="(item, index) in articleList" :key="item.id">
					<article-card :dataInfo="item"></article-card>
				</template>
			</view>
		</view>
	</view>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { storeToRefs } from 'pinia';

import useHomeStore from '@/store/home.js';

import { homeCardList, commonDepList } from '@/constants/menu.js';

const homeStore = useHomeStore();
const { bannerList, articleList } = storeToRefs(homeStore);

// 更多点击
const handleMoreClick = type => {
	if (type === 'dep') {
		uni.navigateTo({
			url: '/pages/department/index'
		});
	} else if (type === 'article') {
		uni.switchTab({
			url: '/pages/find/index'
		});
	}
};

// 常用科室点击
const handleDepItemClick = v => {
	uni.navigateTo({
		url: `/pages/search/index?depName=${v.name}`
	});
};

onMounted(() => {
	homeStore.changeHomeBannerListAction();
	homeStore.changeArticleListAction();
});
</script>

<style lang="scss">
page {
	padding: 20rpx;

	box-sizing: border-box;
	background-color: #f6f7fb;
}

.home-wrap {
	.card-list-wrap {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;

		margin-bottom: 20rpx;
	}

	.banner-picture {
		width: 100%;
		border-radius: 10rpx;
		box-sizing: border-box;
	}

	.common-dep-wrap {
		margin-top: 20rpx;

		.common-dep-list {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: space-around;

			margin-top: 20rpx;

			.dep-list-item {
				width: 22.5%;
				height: 200rpx;
				padding: 15rpx 10rpx;
				margin-bottom: 20rpx;
				border-radius: 10rpx;

				font-weight: 700;
				text-align: center;

				box-sizing: border-box;
				background-color: #ffffff;

				.dep-picture {
					height: 100rpx;
				}
			}
		}
	}

	.article-list-wrap {
		.article-list {
			margin-top: 20rpx;
			border-radius: 20rpx;
			background-color: #fff;
		}
	}
}
</style>
