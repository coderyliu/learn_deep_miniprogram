<template>
	<view class="cart">
		<!-- 收货地址区域 -->
		<view class="receive"><button type="primary" class="btn" size="mini">请选择收货地址+</button></view>
		<!-- 购物车列表区域 -->
		<view class="title">
			<uni-icons type="shop-filled" size="20"></uni-icons>
			<text class="name">购物车</text>
		</view>
		<view class="cart-list">
			<block v-for="(item,index) in carts" :key='item.goods_id'>
				<view class="cart-item">
					<view class="pit">
						<uni-icons :type="goodsStatus?'checkbox':'circle'" size='29' class='icon'></uni-icons>
						<image :src="item.goods_small_logo" mode="widthFix" class="pic"></image>
					</view>
					<view class="info">
						<view class="top">{{item.goods_name}}</view>
						<view class="bottom">
							<view class="price">￥{{item.goods_price}}</view>
							<view class="control">
								<button size="mini" class="btn" plain="true">-</button>
								<text>{{item.goods_count}}</text>
								<button size='mini' class="btn" plain="true">+</button>
							</view>
						</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import tabbarBadge from '../../mixins/tabbar-badge.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			goodsStatus:true
		};
	},
	mixins: [tabbarBadge],
	computed: {
		...mapState('cart', ['carts'])
	},
	methods: {}
};
</script>

<style lang="scss">
.cart {
	background-color: #fff;
}
.receive {
	width: 100%;
	height: 200rpx;
	line-height: 200rpx;
	text-align: center;
	.btn {
		// display: block;
		width: 330rpx;
		height: 70rpx;
		text-align: center;
		line-height: 70rpx;
	}
}
.title {
	width: 100%;
	height: 80rpx;
	line-height: 80rpx;
	border-bottom: 1px solid #eee;
	padding: 0 20rpx;
	s .name {
		margin-left: 20rpx;
	}
}
.cart-list{
	width: 100%;
	.cart-item{
		display: flex;
		justify-content: space-around;
		width: 100%;
		height: 280rpx;
		border:1px solid #eee;
		padding:0 20rpx;
		box-sizing: border-box;
		.pit{
			width: 300rpx;
			height: 100%;
			display:flex;
			justify-content: space-around;
			align-items: center;
			.pic{
				width: 170rpx;
			}
		}
		.info{
			flex:1;
			height: 100%;
			display: flex;
			flex-direction: column;
			justify-content: space-around;
			.bottom{
				display: flex;
				justify-content: space-around;
				.price{
					color:crimson;
					position: relative;
					left:-10px;
				}
				.control{
					display: flex;
					justify-content: space-around;
					align-items: center;
					width: 200rpx;
					height: 60rpx;
					border:1px solid #eee;
					.btn{
						outline:none;
						border:none;
						color:#dbdcdc;
						font-size: 20px;
					}
				}
			}
		}
	}
}
</style>
