<template>
	<view>
		<view class="top" v-if="showTabs">
			<text :class="current == 'xinpin' ? 'red' : ''" @click="xinpinClick">新品</text>
			<view :class="current == 'sale' ? 'red' : ''" class="xiaoliang" @click="saleClick">
				<text>销量</text>
				<view class="icon-wrapper">
					<uni-icons type="arrowup" size="12" :color="isDec == 1 && sortBy == 'sale' && current == 'sale' ? '#f00' : '#fff'"></uni-icons>
					<uni-icons type="arrowdown" size="12" :color="isDec == 0 && sortBy == 'sale' && current == 'sale' ? '#f00' : '#fff'"></uni-icons>
				</view>
			</view>
			<view :class="current == 'price' ? 'red' : ''" class="price" @click="priceClick">
				<text>价格</text>
				<view class="icon-wrapper">
					<uni-icons type="arrowup" size="12" :color="isDec == 1 && sortBy == 'price' && current == 'price' ? '#f00' : '#fff'"></uni-icons>
					<uni-icons type="arrowdown" size="12" :color="isDec == 0 && sortBy == 'price' && current == 'price' ? '#f00' : '#fff'"></uni-icons>
				</view>
			</view>
			<text :class="current == 'shaixuan' ? 'red' : ''" @click="shaixuanClick">筛选</text>
		</view>
		<view class="wrapper">
			<view class="item" v-for="item in list" :key="item.id">
				<navigator open-type="navigate" :url="'/subpkg/goodsDetail/goodsDetail?productId=' + item.productId">
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
			isDec: 0,
			sortBy: 'price',
			current: 'xinpin'
		};
	},
	methods: {
		xinpinClick() {
			console.log('xinpin');
			this.current = 'xinpin';
			this.$emit('tabsClick');
		},
		saleClick() {
			console.log('sale');
			this.current = 'sale';
			this.isDec = Number(!this.isDec);
			this.sortBy = 'sale';
			const params = {
				isDesc: this.isDec,
				sortBy: this.sortBy
			};
			this.$emit('tabsClick', params);
		},
		priceClick() {
			console.log('price');
			this.current = 'price';
			this.isDec = Number(!this.isDec);
			this.sortBy = 'price';
			const params = {
				isDesc: this.isDec,
				sortBy: this.sortBy
			};
			this.$emit('tabsClick', params);
		},
		shaixuanClick() {
			console.log('shaixuan');
			this.current = 'shaixuan';
			this.$emit('tabsClick');
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
	.price,
	.xiaoliang {
		display: flex;
		align-items: center;
		justify-content: center;
		.icon-wrapper {
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
