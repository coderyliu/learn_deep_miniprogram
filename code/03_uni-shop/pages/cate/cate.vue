<template>
	<view class="cate">
		<!-- 自定义的组件 -->
		<cate-search class="search"></cate-search>
		<!-- 左侧侧边栏 -->
		<scroll-view scroll-y="true" class="aside-list" :style="{ height: asideHeight + 'rpx' }">
			<view v-for="(item, index) in cateList" :key="item.cat_id" class="aside-item" @click="navigateToContent(index)"
				:class="{ active: currentIndex === index ? true : false }">
				<text class="font">{{ item.cat_name }}</text>
			</view>
		</scroll-view>
		<!-- 右侧内容区 -->
		<scroll-view scroll-y="true" class="content">
			<!-- 渲染第一层级 -->
			<view v-for="(item, index) in cateList[currentIndex].children" :key="item.cat_id">
				<view class="title">
					<text class="text">{{ item.cat_name }}</text>
				</view>
				<!-- 渲染第二层级 -->
				<view class="content-item" v-if="currentIndex !== 29">
					<view class="content-list" v-for="(item2, index2) in item.children" :key="item2.cat_id"
						@click="gotoCartList(item2.cat_id)">
						<image :src="item2.cat_icon" mode="widthFix" class="pic"></image>
						<text>{{ item2.cat_name }}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			cateList: [], //分类数据
			currentIndex: 0, //当前侧边栏索引
			asideHeight: 0
		};
	},
	onLoad() {
		this.getCateList(); //获取分类数据
	},
	methods: {
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) {
				uni.$showToast();
			}
			this.cateList = res.message;
			this.asideHeight = res.message.length * 120;
		},
		navigateToContent(index) {
			this.currentIndex = index;
		},
		// 跳转到商品列表
		gotoCartList(id) {
			// console.log(1);
			uni.navigateTo({
				url: '/subpackage/goods_list/goods_list?cid=' + id
			});
		}
	}
};
</script>

<style lang="scss">
.cate {
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: top;

	.search {
		position: absolute;
		width: 100%;
		height: 120rpx;
		top: -2rpx;
		left: 0;
	}

	.aside-list {
		flex-basic: 200rpx;
		flex: 1;
		background-color: #eee;
		margin-top: 120rpx;

		.aside-item {
			width: 100%;
			height: 120rpx;
			line-height: 120rpx;
			text-align: center;
		}
	}

	.content {
		flex: 3;
		background-color: #fff;
		margin-top: 120rpx;

		.title {
			width: 100%;
			height: 110rpx;
			display: flex;
			justify-content: center;
			align-items: center;

			.text {
				font-size: 38rpx;
				font-weight: bolf;
				color: #333;
			}
		}

		.content-item {
			display: flex;
			flex-direction: row;
			flex-wrap: wrap;
			justify-content: space-around;
			align-items: center;

			.content-list {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
			}

			.pic {
				width: 150rpx;
			}
		}
	}
}

.active {
	background-color: white;
}
</style>
