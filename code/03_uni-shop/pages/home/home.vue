<template>
	<view class="home">
		<!-- 搜索框 -->
		<cate-search class="search"></cate-search>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="swiper-banner">
			<swiper-item v-for="(item, index) in swiperList" :key="item.goods_id" class="swiper-list">
				<navigator :url="'/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id" class="swiper-item">
					<image :src="item.image_src" mode="widthFix" class="avatar"></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航区域 -->
		<view class="nav">
			<view class="nav-list" v-for="(item, index) in navList" :key="item.name" @click="toggleToCate(item.name)">
				<image :src="item.image_src" mode="widthFix" class="picture"></image>
			</view>
		</view>
		<!-- 楼层区域 -->
		<view class="floor-list" v-for="(item, index) in floorList" :key="item.floor_title.name">
			<!-- 楼层图片 -->
			<view class="floor-title"><image :src="item.floor_title.image_src" mode="widthFix" class="pic"></image></view>
			<!-- 楼层内容 -->
			<view class="floor-content">
				<navigator class="floor-left" :url="item.product_list[0].url">
					<image :src="item.product_list[0].image_src" mode="widthFix" :style="{ width: item.product_list[0].image_width + 'rpx' }" class="floor-pic"></image>
				</navigator>
				<view class="floor-right">
					<navigator v-for="(item2, index2) in item.product_list" :key="item2.name" class="right" v-if="index2 !== 0" :url="item2.url">
						<image :src="item2.image_src" mode="widthFix" class="pict" :style="{ width: item2.image_width + 'rpx' }"></image>
					</navigator>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			swiperList: [], //轮播图数据
			navList: [], //分类导航数据
			floorList: [] //楼层数据
		};
	},
	onLoad() {
		this.getSwiperList(); //请求轮播图数据
		this.getCateNavList(); //请求分类导航数据
		this.getFloorList(); //请求楼层数据
	},
	methods: {
		// 获取轮播图方法
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) {
				uni.$showToast();
			}
			this.swiperList = res.message;
		},
		// 获取分类导航方法
		async getCateNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			if (res.meta.status !== 200) {
				uni.$showToast();
			}
			this.navList = res.message;
		},
		// 点击第一项跳转到分类页
		toggleToCate(name) {
			if (name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		// 获取楼层数据
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			if (res.meta.status !== 200) {
				uni.$showToast();
			}
			// 对数据进行处理
			res.message.forEach(floor => {
				floor.product_list.forEach(prod => {
					prod.url = '/subpackage/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
				});
			});
			this.floorList = res.message;
		}
	}
};
</script>

<style lang="scss">
.home {
	padding-top: 120rpx;
}
.search {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 120rpx;
	z-index:999;
}
.swiper-banner {
	width: 100%;
	height: 330rpx;
	.swiper-list {
		width: 100%;
		.swiper-item {
			width: 100%;
			.avatar {
				width: 100%;
			}
		}
	}
}
.nav {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;
	margin-top: 20rpx;

	.picture {
		width: 120rpx;
	}
}
.floor-list {
	margin-top: 20rpx;
	width: 100%;
	.floor-title {
		width: 100%;
		height: 50rpx;
		.pic {
			width: 100%;
		}
	}
	.floor-content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-top: 20rpx;
		.floor-left {
			margin-left: 10rpx;
			.floor-pic {
				border-radius: 20rpx;
			}
		}
		.floor-right {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;
			.pict {
				width: 100%;
				border-radius: 10rpx;
			}
		}
	}
}
</style>
