<template>
	<view class="feedback-wrap">
		<view class="feedback-title">京号通挂号系统意见反馈</view>
		<textarea
			:value="suggestText"
			@input="handleTextAreaInput"
			style="width:100%;height:300rpx;padding:20rpx;border:1px solid #d9d9d9;margin-top:20rpx;border-radius: 10rpx;box-sizing: border-box;"
			:maxlength="300"
			placeholder="请输入您的意见，我们会根据您的反馈认真改进"
			placeholder-style="font-size:28rpx;"
		/>
		<view class="sent-btn" @click="handleSendFeedback">递交意见</view>
	</view>
</template>

<script setup>
import { ref } from 'vue';

import { addSystemSuggestFetch } from '@/api/person.js';

const suggestText = ref('');

const handleTextAreaInput = e => {
	suggestText.value = e.detail.value;
};

const handleSendFeedback = async () => {
	if (!suggestText.value) {
		return uni.showToast({
			title: '反馈内容为空',
			icon: 'none',
			duration: 1500
		});
	}

	try {
		const res = await addSystemSuggestFetch({
			article: suggestText.value
		});

		if (res.data.code === 1) {
			suggestText.value = '';
			return uni.showToast({
				title: '提交成功，感谢您的反馈',
				icon: 'success',
				duration: 1500
			});
		} else {
			throw new Error(res.data);
		}
	} catch (error) {
		return uni.showToast({
			title: '提交失败,请稍后重试',
			icon: 'error',
			duration: 1500
		});
	}
};
</script>

<style lang="scss">
.feedback-wrap {
	padding: 30rpx 20rpx;

	box-sizing: border-box;

	.feedback-title {
		margin-bottom: 30rpx;

		font-size: 36rpx;
		font-weight: 700;
		letter-spacing: 1px;
	}

	.sent-btn {
		width: 140px;
		height: 40px;
		line-height: 40px;
		margin: 20px auto 0;
		border-radius: 5px;

		color: rgb(255, 255, 255);
		font-size: 16px;
		text-align: center;

		background-color: rgb(68, 144, 241);
		box-shadow: rgba(0, 0, 0, 0.1) 2px 2px 2px;
	}
}
</style>
