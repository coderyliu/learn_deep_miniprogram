<template>
	<view>
		<!-- 轮播图区域 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true" class="banner">
			<block v-for="(item, index) in goodsInfo.pics" :key="item.pics_id">
				<swiper-item class="ban-list">
					<view class="swiper-item"><image :src="item.pics_big" mode="widthFix" class="point" @click="preview(index)"></image></view>
				</swiper-item>
			</block>
		</swiper>
		<!-- 商品信息区域 -->
		<view class="goods-info">
			<view class="info">
				<view class="price">￥{{ goodsInfo.goods_price }}</view>
				<view class="name">{{ goodsInfo.goods_name }}</view>
				<view class="kuaidi">快递：免运费</view>
			</view>
			<view class="icon">
				<uni-icons type="star" size="20"></uni-icons>
				<text>收藏</text>
			</view>
		</view>
		<!-- 商品详情区域 -->
		<!-- 页面结构中使用rich-text富文本，将带有html标签的内容渲染为页面结构 -->
		<rich-text :nodes="goodsInfo.goods_introduce" class="detail-info"></rich-text>
		<view class="grap"></view>
		<!-- 底部购物栏区域 -->
		<!-- options 左侧按钮的配置项 -->
		<!-- buttonGroup 右侧按钮的配置项 -->
		<!-- click 左侧按钮的点击事件处理函数 -->
		<!-- buttonClick 右侧按钮的点击事件处理函数 -->
		<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" class="cart" @click="leftClickHandler" @buttonClick="rightClickHandler" />
	</view>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex';
export default {
	data() {
		return {
			// 商品详情
			goodsInfo: {},
			goodsId: 0,
			// 底部购物栏信息
			options: [
				{
					icon: 'shop',
					text: '店铺'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: 0,
					infoBackgroundColor: '#ff0000'
				}
			],
			buttonGroup: [
				{
					text: '加入购物车',
					backgroundColor: '#ff0000',
					color: '#fff'
				},
				{
					text: '立即购买',
					backgroundColor: '#ffa200',
					color: '#fff'
				}
			]
		};
	},
	onLoad(options) {
		this.goodsId = options.goods_id;
		this.getGoodsDetailInfo();
	},
	computed: {
		// ...mapState('模块的名称', ['要映射的数据名称1', '要映射的数据名称2'])
		...mapState('cart', ['carts']),
		...mapGetters('cart', ['total'])
	},
	methods: {
		// 请求商品数据
		async getGoodsDetailInfo() {
			const { data: res } = await uni.$http.get('/api/public/v1/goods/detail?goods_id=' + this.goodsId);
			if (res.meta.status !== 200) {
				return uni.$showToast();
			}
			// 使用字符串的 replace() 方法，为 img 标签添加行内的 style 样式，从而解决图片底部空白间隙的问题
			res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g, '<img style="display:block;" ').replace(/webp/g, 'jpg');
			this.goodsInfo = res.message;
		},
		// 图片预览处理
		preview(index) {
			// 使用uni.previewImage()方法预览图片
			uni.previewImage({
				// 是否循环展示
				loop: true,
				// 要预览的图片的索引
				current: index,
				// 所有图片的url地址的数组
				urls: this.goodsInfo.pics.map(x => x.pics_big)
			});
		},
		// 购物栏,左侧按钮点击事件
		leftClickHandler(e) {
			console.log(e);
		},
		// 购物栏，右侧按钮点击事件
		rightClickHandler(e) {
			// e这个事件对象，有两个值，content和index,可以根据content.text判断要进行那个业务逻辑
			if (e.content.text === '加入购物车') {
				const goods = {
					goods_id: this.goodsInfo.goods_id,
					goods_name: this.goodsInfo.goods_name,
					goods_price: this.goodsInfo.goods_price,
					goods_small_logo: this.goodsInfo.goods_small_logo,
					goods_count: 1,
					goods_state: true //商品 的勾选状态
				};
				// 调用addTocart，存储它
				this.addToCart(goods);
			} else if (e.content.text === '立即购买') {
			}
		},
		...mapMutations('cart', ['addToCart'])
	},
	watch: {
		// 动态监听total的值的变化,为购物车按钮赋值
		// 页面首次加载完毕后，不会调用这个侦听器,因此使用对象格式
		total: {
			handler(newValue) {
				const findResult = this.options.find(x => x.text === '购物车');

				if (findResult) {
					// 动态为购物车的右上角的角标赋值
					findResult.info = newValue;
				}
			},
			immediate: true
		}
	}
};
</script>

<style lang="scss">
.banner {
	width: 100%;
	height: 700rpx;
	.ban-list {
		width: 100%;
		height: 100%;
		.point {
			width: 100%;
			height: 100%;
		}
	}
}
.goods-info {
	width: 100%;
	height: 260rpx;
	display: flex;
	justify-content: space-around;
	align-items: center;
	background-color: #fff;
	padding: 0 20rpx;
	box-sizing: border-box;
	.info {
		height: 100%;
		flex: 4;
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		align-items: left;
		.price {
			color: darkred;
			font-size: 38rpx;
		}
		.name {
			border-right: 1px solid #eee;
			font-size: 28rpx;
		}
		.kuaidi {
			font-size: 20rpx;
			color: #d3d3d3;
		}
	}
	.icon {
		flex: 1;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
}
.detail-info {
	width: 100%;
	box-sizing: border-box;
	padding-bottom: 100rpx;
}
.grap {
	width: 100%;
	height: 80rpx;
}
.cart {
	display: block;
	width: 100%;
	position: fixed;
	left: 0;
	roght: 0;
	bottom: 0;
	z-index: 999;
}
</style>
