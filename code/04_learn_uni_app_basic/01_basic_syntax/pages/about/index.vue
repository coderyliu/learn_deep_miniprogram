<template>
	<view class="system-about-wrap">
		<image src="../../static/images/logo-app.png" mode="widthFix" class="logo"></image>
		<view class="about-text">
			京号通是北京免费预约挂号平台，汇聚耳鼻喉科、皮肤科、骨科、口腔科等千余位著名专家医生，提供号源查询、预约挂号、专家医生简介评分等服务。为到北京地区医院就诊的患者提供了更便捷更经济的就医通道，充分体现互联网+医疗的创新优势。
		</view>
	</view>
</template>

<script setup></script>

<style lang="scss">
.system-about-wrap {
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	line-height: 56rpx;
	padding: 30rpx;

	color: #333;
	font-size: 32rpx;
	letter-spacing: 2rpx;
	text-indent: 40rpx;

	background-color: #fff;
	box-sizing: border-box;

	.logo {
		width: 300rpx;

		margin-bottom: 30rpx;
	}
}
</style>
