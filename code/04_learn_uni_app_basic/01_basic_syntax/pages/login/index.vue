<template>
	<view class="login-wrap">
		<view class="login-title">
			<view class="text">登录</view>
			<view class="gap"></view>
			<view class="text">注册</view>
		</view>
		<template v-if="!isSendCaptcha">
			<view class="field-wrap">
				<view class="label">手机号码</view>
				<input type="text" @input="handleBindKeyInput($event, 'phone')" class="phone-field" :maxlength="20"
					placeholder="请输入您的手机号" placeholder-style="color:#777;font-size:28rpx;" />
			</view>
			<view class="agree-wrap">
				<checkbox-group @change="handleCheckBoxChange">
					<label class="checkbox">
						<checkbox class="check-btn" color="#1599f9" :checked="isAgreement" />
						我已阅读并同意用户
						<text class="link-text" @click="handleServiceClick('service')">服务协议</text>
						和
						<text class="link-text" @click="handleServiceClick('private')">隐私条款</text>
					</label>
				</checkbox-group>
			</view>
			<view class="send-captcha" @click="handleSendCaptcha">获取验证码</view>
		</template>
		<template v-if="isSendCaptcha">
			<view class="field-wrap">
				<view class="top-text">
					<view class="label">输入验证码</view>
					<!-- <captcha-cpn bind:captchaClick="handleSendCaptcha"></captcha-cpn> -->
				</view>
				<input type="text" @input="handleBindKeyInput($event, 'code')" class="phone-field" :maxlength="6"
					placeholder="请输入六位数验证码" placeholder-style="color:#777;font-size:28rpx;letter-spacing:2rpx;" />
			</view>
			<view class="login-btn" @click="handleLoginClick">登录</view>
		</template>
	</view>
</template>

<script setup>
import { ref } from 'vue';

import useMainStore from '@/store/main.js';
import { sendPhoneCaptchaFetch, loginWithCaptchaFetch } from '@/api/login.js';

const mainStore = useMainStore();

const phone = ref();
const captcha = ref();
const isAgreement = ref(false);
const isSendCaptcha = ref(false);

// 表单绑定
const handleBindKeyInput = (e, type) => {
	if (type === 'phone') {
		phone.value = e.detail.value;
	} else {
		captcha.value = e.detail.value;
	}
};

// 同意协议
const handleCheckBoxChange = e => {
	isAgreement.value = !isAgreement.value;
};

// 点击发送验证码
const handleSendCaptcha = async () => {
	if (!isAgreement.value) {
		return uni.showToast({
			title: '请阅读并同意用户服务协议和隐私条款',
			icon: 'none',
			duration: 1500
		});
	}

	if (!phone.value || phone.value.length !== 11) {
		return uni.showToast({
			title: '请输入您的手机号',
			icon: 'none',
			duration: 1500
		});
	}

	try {
		const res = await sendPhoneCaptchaFetch({ phone: phone.value });
		if (res.data.code === 1) {
			isSendCaptcha.value = true;
			return uni.showToast({
				title: '发送验证码成功，请注意查收',
				icon: 'success',
				duration: 1500
			});
		}
	} catch (error) {
		return uni.showToast({
			icon: 'error',
			duration: 1500,
			title: '发送验证码失败,请稍后重试'
		});
	}
};

// 点击登录
const handleLoginClick = async () => {
	if (!captcha.value || captcha.value.length !== 6) {
		return uni.showToast({
			title: '请输入六位数数字验证码',
			icon: 'none',
			duration: 1500
		});
	}

	try {
		const res = await loginWithCaptchaFetch({
			phone: phone.value,
			code: captcha.value
		});

		if (res.data.code === 1) {
			mainStore.changeTokenAction(res.data.data?.token);
			mainStore.changeUserInfoAction(res.data.data?.userInfo);
			uni.setStorageSync('token', JSON.stringify(res.data.data?.token));
			uni.setStorageSync('userInfo', JSON.stringify(res.data.data?.userInfo));
			uni.switchTab({
				url: '/pages/person/index'
			});

			return uni.showToast({
				title: '登录成功',
				icon: 'success',
				duration: 1500
			});
		}
	} catch (error) {
		return uni.showToast({
			title: '登录失败，请稍后重试',
			icon: 'error',
			duration: 1500
		});
	}
};

// 跳转查看协议
const handleServiceClick = type => {
	if (type === 'service') {
		uni.navigateTo({
			url: '/pages/service/index'
		});
	} else {
		uni.navigateTo({
			url: '/pages/private/index'
		});
	}
};
</script>

<style lang="scss">
.login-wrap {
	padding: 100rpx 60rpx 0;

	background-color: #fff;
	box-sizing: border-box;

	.login-title {
		display: flex;
		align-items: center;

		.text {
			color: #333;
			font-size: 50rpx;
			font-weight: 700;
			letter-spacing: 2rpx;
		}

		.gap {
			display: inline-block;
			width: 4rpx;
			height: 50rpx;
			margin: 0 20rpx;

			background-color: #333;
		}
	}

	.field-wrap {
		margin-top: 120rpx;

		.label {
			margin-bottom: 20rpx;
			margin-right: 30rpx;

			font-size: 32rpx;
			font-weight: 700;
		}

		.phone-field {
			padding: 20rpx 0;

			font-size: 28rpx;

			border-bottom: 2rpx solid #eee;
		}

		.top-text {
			display: flex;
			justify-content: flex-start;
			align-items: center;
		}
	}

	.agree-wrap {
		line-height: 50rpx;
		margin-top: 20rpx;

		font-size: 28rpx;
		letter-spacing: 1rpx;

		.link-text {
			color: #1599f9;
		}
	}

	.gap-wrap {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 420rpx;
		margin: 0 auto;

		color: #999;

		.gap {
			width: 50rpx;
			height: 2rpx;
			margin: 5rpx;

			background-color: #999;
		}
	}

	.phone-btn {
		margin: 40rpx auto;

		font-size: 32rpx;

		background-color: #07c160;
	}
}

.login-wrap .send-captcha,
.login-wrap .phone-btn,
.login-wrap .login-btn {
	width: 420rpx;
	height: 80rpx;
	line-height: 80rpx;
	border-radius: 35rpx;
	margin: 140rpx auto 40rpx;

	color: #fff;
	text-align: center;

	background-color: #1ec0d8;
}
</style>
