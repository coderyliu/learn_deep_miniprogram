<template>
	<view class="list-item">
		<block v-for='(item,index) in goodsList' :key='item.cat_id'>
			<view class="list" @click="navigateToDetailHandler(item.goods_id)">
				<view class="logo">
					<image :src="item.goods_small_logo || defaultPic" mode="widthFix" class="pic"></image>
				</view>
				<view class="desc">
					<view class="name">{{item.goods_name}}</view>
					<view class="price">￥{{item.goods_price.toFixed(2)}}</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
export default {
	name:"list-item",
	props:{
		goodsList:{
			type:Array,
			default:()=>[]
		}
	},
	data() {
		return {
			// 防止图片不存在时,使用默认图片
		 defaultPic: 'https://img3.doubanio.com/f/movie/8dd0c794499fe925ae2ae89ee30cd225750457b4/pics/movie/celebrity-default-medium.png'
		};
	},
	methods:{
		navigateToDetailHandler(id){
			uni.navigateTo({
				url:'/subpackage/goods_detail/goods_detail?goods_id='+id
			})
		}
	}
}
</script>

<style lang="scss">
	.list-item{
		background-color: #fff;
	}
	.list{
		width: 100%;
		height: 230rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		border:1px solid #eee;
		.logo{
			width:350rpx;
			flex:1;
			.pic{
				width: 100%;
				height: 100%;
			}
		}
		.desc{
			flex:3;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			margin-left:10rpx;
			height: 100%;
			.name{
				flex:2;
				font-size: 28rpx;
				margin-top:20rpx;
			}
			.price{
				flex:1;
				height: 50rpx;
				color:red;
			}
		}
	}
</style>
