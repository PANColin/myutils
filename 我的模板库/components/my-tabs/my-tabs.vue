<template>
	<view>
		<view class="tabs">
			<view class="tabs_title">
				<view v-for="(item, index) in tabs" :key="index" class="title_item" :class="item.isActive ? 'active' : ''" @tap="handleItemTap(index)">{{ item.value }}</view>
			</view>
			<view class="tabs_content"><slot name="content"></slot></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-tabs',
	props: {
		tabs: {
			type: Array,
			value: []
		}
	},
	data() {
		return {};
	},
	methods: {
		handleItemTap(e) {
			// console.log(e);

			// 触发 父组件中的事件 自定义(子向父传值)
			this.$emit('tabsItemChange', e);
		}
	}
};
</script>

<style lang="scss" scoped>
.tabs {
	.tabs_title {
		position: sticky;
		top: 0;
		//uni-page-head高度
		/* #ifdef H5 */
		top: 88rpx;
		/* #endif */
		z-index: 999;
		display: flex;
		justify-content: space-around;
		align-items: center;
		background-color: $navigateBackgroundColor;
		font-size: 30rpx;
		.title_item {
			display: flex;
			justify-content: center;
			align-items: center;
			flex: 1;
			padding: 15rpx 0;
			color: #fff;
			&.active {
				color: #f00;
				border-bottom: 5rpx solid currentColor;
			}
		}
	}
}

.tabs_content {
}
</style>
