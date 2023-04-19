<template>
	<view>
		<!-- 搜索框 -->
		<view class="search-bar">
			<uni-search-bar placeholder="请输入搜索内容" class="search" :radius="20" clearButton="auto" v-model="searchValue" @input="searchHandler"></uni-search-bar>
		</view>

		<!-- 搜索历史 -->
		<view class="search-history" v-if="searchValue.length === 0">
			<view class="search-nav">
				<text class="name">搜索历史</text>
				<uni-icons type="trash" size="22" @click="clearSearchHandler"></uni-icons>
			</view>
			<view class="search-cont">
				<block v-for="(item, index) in searchHistory" :key="index">
					<view class="search-data" @click='navigateToGoodsList(item)'>{{ item }}</view>
				</block>
			</view>
		</view>

		<!-- 搜索结果 -->
		<block v-for="(item, index) in searchList" :key="item.goods_id" v-if="searchList.length > 0">
			<view class="search-item" @click="navigateToDetail(item)">
				<text class="content">{{ item.goods_name }}</text>
				<text class="icon">></text>
			</view>
		</block>
	</view>
</template>

<script>
import { debounce } from '../../utils/debounce.js';
import { searchGoodsHandler } from '../../utils/network.js';
const searchDebounceHanler = debounce(searchGoodsHandler, 300);

export default {
	data() {
		return {
			searchValue: '',
			searchList: [],
			searchHistory: []
		};
	},
	onLoad(){
		// 将搜索历史数据持久化
		this.searchHistory=JSON.parse(uni.getStorageSync('keywords')||'[]')
	},
	methods: {
		// 搜索关键字
		searchHandler() {
			if (this.searchValue === '') {
				return (this.searchList = []);
			}
			searchDebounceHanler(this.searchValue).then(res => {
				if (!this.searchHistory.includes(this.searchValue)) {
					this.searchHistory.push(this.searchValue);
				}
				uni.setStorageSync('keywords',JSON.stringify(this.searchHistory))
				this.searchList = res;
			});
		},
		// 点击跳转到商品详情
		navigateToDetail(item) {
			uni.navigateTo({
				url: '/subpackage/goods_detail/goods_detail?goods_id=' + item.goods_id
			});
		},
		// 清空搜索历史
		clearSearchHandler() {
			this.searchHistory = [];
		},
		// 点击搜索历史跳转到商品列表
		navigateToGoodsList(item){
			uni.navigateTo({
				url:'/subpackage/goods_list/goods_list?query='+item
			})
		}
	}
};
</script>

<style lang="scss">
.search-bar {
	width: 100%;
	height: 120rpx;
	background-color: #dc143c;
	.search {
		width: 90%;
		height: 100rpx;
		background-color: #fff;
	}
}
.search-nav {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 80rpx;
	border: 1px solid #eee;
	padding: 0 10rpx;
	box-sizing: border-box;
}
.search-cont {
	display: flex;
	// justify-content: space-around;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	padding: 20rpx;
	box-sizing: border-box;
	.search-data {
		margin-left:15rpx;
		margin-top:10rpx;
	}
}

.search-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 100%;
	height: 100rpx;
	border: 1px solid #eee;
	.content {
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		font-size: 30rpx;
		padding-left: 15rpx;
	}
	.icon {
		padding-right: 15rpx;
		font-size: 30rpx;
	}
}
</style>
