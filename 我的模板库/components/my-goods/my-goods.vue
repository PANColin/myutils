<template>
	<view>
		<view class="top" v-if="showTabs">
			<view class="tabs" v-for="(item, index) in tabsList" :key="index" @click="tabsClick(item, index)">
				<view class="title" :class="index == currentIndex ? 'red' : ''">{{ item.name }}</view>
				<view class="icons" v-if="item.name == '价格' || item.name == '销量'">
					<uni-icons type="arrowup" :color="item.currentDec == 'up' ? '#f00' : '#fff'"></uni-icons>
					<uni-icons type="arrowdown" :color="item.currentDec == 'down' ? '#f00' : '#fff'"></uni-icons>
				</view>
			</view>
		</view>
		<view class="wrapper">
			<view class="item" v-for="(item, index) in list" :key="index">
				<navigator open-type="navigate" :url="'/goodsubpkg/goodsDetail/goodsDetail?productId=' + item.id">
					<view class="img"><image :src="item.pic" mode="widthFix"></image></view>
					<view class="txt">
						<text class="name">{{ item.name }}</text>
						<text class="price">价格:{{ item.price }}</text>
					</view>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-goods',
	props: {
		list: {
			type: Array,
			default: []
		},
		showTabs: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			currentIndex: 0,
			tabsList: [
				{ name: '新品', sortBy: '', currentDec: 'default', isDec: 0 },
				{ name: '销量', sortBy: 'sale', currentDec: 'default', isDec: 0 },
				{ name: '价格', sortBy: 'price', currentDec: 'default', isDec: 0 },
				{ name: '筛选', sortBy: '', currentDec: 'default', isDec: 0 }
			]
		};
	},
	methods: {
		tabsClick(val, index) {
			// console.log(val, index);
			this.currentIndex = index;
			this.tabsList.forEach((ele, ind) => {
				if (index != ind) {
					ele.currentDec = 'default';
				}
			});
			if (val.currentDec == 'default') {
				val.currentDec = 'up';
				val.isDesc = 1;
				this.$emit('tabsClick', { isDesc: val.isDesc, sortBy: val.sortBy });
			} else if (val.currentDec == 'up') {
				val.currentDec = 'down';
				val.isDesc = 0;
				this.$emit('tabsClick', { isDesc: val.isDesc, sortBy: val.sortBy });
			} else {
				val.currentDec = 'up';
				val.isDesc = 1;
				this.$emit('tabsClick', { isDesc: val.isDesc, sortBy: val.sortBy });
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.red {
	color: #f00;
}
.top {
	position: sticky;
	top: 0;
	z-index: 999;
	color: #fff;
	background-color: #354e44;
	display: flex;
	justify-content: space-around;
	align-items: center;
	height: 100rpx;
	.tabs {
		display: flex;
		align-items: center;
		justify-content: center;
		.icons {
			/* #ifdef H5 */
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			/* #endif */
			uni-icons {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				width: 24rpx;
				height: 24rpx;
			}
		}
	}
}
.wrapper {
	display: flex;
	flex-wrap: wrap;
	margin-top: 40rpx;
	// background-color: #fff;
	.item {
		width: 47%;
		display: flex;
		flex-direction: column;
		background-color: #fff;
		// margin: 20px;
		margin: 6rpx auto;
		// margin-right: 10rpx;
		// border-radius: 16px;
		.img {
			flex: 1;
			padding: 20rpx;

			image {
				width: 286rpx !important;
				height: 260rpx !important;
			}
		}
		.txt {
			font-size: 14px;
			// font-weight: bold;
			padding: 0 40rpx;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			justify-content: center;
			flex: 3;
			.name {
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
			.price {
				padding-top: 40rpx;
			}
		}
	}
	.item:last-child {
		margin: 6rpx 10rpx;
	}
}
</style>
