<template>
	<view class="account-wrap">
		<view class="top-logo"><image src="../../static/images/logo-app.png" mode="widthFix" class="logo"></image></view>
		<view class="bottom-list" @click="handleAccountItemClick">
			<view class="list-item" id="real">实名认证</view>
			<view class="list-item" id="account">修改账户信息</view>
			<view class="list-item" id="balance">账户余额</view>
			<view class="list-item" id="pay">账户充值</view>
			<view class="list-item" id="history">交易记录</view>
			<view class="list-item" id="logout">退出登录</view>
		</view>
	</view>
</template>

<script setup>
const handleAccountItemClick = e => {
	const id = e.target.id;

	switch (id) {
		case 'real':
			uni.navigateTo({
				url: '/pages/real/index'
			});
			break;
		case 'account':
			break;
		case 'balance':
			uni.navigateTo({
				url: '/pages/balance/index'
			});
			break;
		case 'pay':
			uni.navigateTo({
				url: '/pages/balance/index'
			});
			break;
		case 'history':
			uni.navigateTo({
				url: '/pages/history/index'
			});
			break;
		case 'logout':
			uni.clearStorage();
			uni.switchTab({
				url: '/pages/home/index'
			});
			return uni.showToast({
				title: '退出登录成功',
				icon: 'success',
				duration: 1500
			});
			break;
		default:
			break;
	}
};
</script>

<style lang="scss">
page {
	background-color: #f2f4f8;

	.account-wrap {
		.top-logo {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			height: 400rpx;

			background-color: #fff;
			.logo {
				width: 350rpx;
			}
		}

		.bottom-list {
			margin-top: 30rpx;

			background-color: #fff;

			.list-item {
				padding: 30rpx 0;
				border-bottom: 2rpx solid #eee;

				font-size: 32rpx;
				font-weight: 600;
				text-align: center;

				box-sizing: border-box;
			}
		}
	}
}
</style>
