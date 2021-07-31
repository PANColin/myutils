<template>
	<view class="up_img_wrap">
		<image :src="src"></image>
		<uni-icons class="icon" type="minus" size="23" color="#b00"></uni-icons>
	</view>
</template>

<script>
export default {
	name: 'my-img',
	props: {
		src: {
			type: String,
			default: ''
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="scss" scoped>
.up_img_wrap {
	width: 90rpx;
	height: 90rpx;
	position: relative;
}
.up_img_wrap image {
	width: 100%;
	height: 100%;
	border-radius: 15rpx;
}
.up_img_wrap .icon {
	position: absolute;
	top: -22rpx;
	right: -22rpx;
}
</style>
