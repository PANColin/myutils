<template>
	<view>
		<view class="goods-nav"><uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick" @buttonClick="buttonClick" /></view>
		<view class="mask" v-if="isMaskShow" @touchmove.stop.prevent>
			<view class="wrapper">
				<view class="row1">
					<view class="img"><image :src="skuList[currentIndex].pic" mode="widthFix"></image></view>
					<view class="dec">
						<text class="name">{{ good.name }}</text>
						<text class="num">库存数量:{{ skuList[currentIndex].stock }}</text>
					</view>
					<view class="close-icon"><uni-icons type="close" size="20" color="#999" @click="isMaskShow = false"></uni-icons></view>
				</view>
				<view class="row2">
					<view class="title">商品选择</view>
					<scroll-view class="wrapper-sku" scroll-y="true">
						<view class="list" :class="index == currentIndex ? 'active' : ''" v-for="(item, index) in skuList" :key="item.id" @click="listClick(item, index)">
							<view class="item">
								<view v-for="(item1, index) in item.spData" :key="index">
									<text>{{ item1.key }}:{{ item1.value }}</text>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<view class="row3">
					<view class="title">商品选择</view>
					<view class="list">
						<view class="item"><text>送货上门</text></view>
						<view class="item"><text>上门安装</text></view>
					</view>
				</view>
				<view class="row4">
					<view class="wrapper-num">
						<text class="title">购买数量</text>
						<uni-number-box :min="1" :value="quantity" @change="bindChange"></uni-number-box>
					</view>
				</view>
				<view class="btm"><button type="default" @click="confirmClick" size="mini">确定</button></view>
			</view>
		</view>
	</view>
</template>

<script>
// import { addPreOrder, getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
import isLogin from '@/mixins/isLogin.js';
export default {
	name: 'goods-nav',
	mixins: [isLogin],
	props: {
		good: {
			type: Object,
			default() {
				return {};
			}
		},
		skuList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			//添加购物车需要的参数
			addToCartParams: {},
			// 判断点击的是哪一个
			isWho: '',
			// 商品数量
			quantity: 1,
			// 商品选择默认的显示图片
			currentIndex: 0,
			// 是否显示隐藏的商品选择页
			isMaskShow: false,
			// currentSkulist: {},
			options: [
				{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: 'red'
				},
				{
					icon: 'cart',
					text: '购物车',
					info: this.$store.state.cart
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
	methods: {
		// skuList 点击事件
		listClick(val, index) {
			console.log(val);
			// this.currentSkulist = val;
			this.currentIndex = index;
		},
		// 隐藏的商品选择页的确定按钮
		confirmClick(val) {
			// console.log(this.isWho);
			// console.log(val);
			if (this.isWho === '加入购物车') {
				const addToCartParams = {
					productId: this.skuList[this.currentIndex].productId,
					productSkuId: this.skuList[this.currentIndex].id,
					quantity: this.quantity
				};
				this.$emit('addToCart', addToCartParams);
			} else {
				const buyNowParams = {
					orderItemList: [
						{
							productId: this.skuList[this.currentIndex].productId,
							productQuantity: this.quantity,
							productSkuId: this.skuList[this.currentIndex].id
						}
					]
				};
				this.$emit('buyNow', buyNowParams);
			}
			// console.log(this.quantity);

			this.isMaskShow = false;
		},
		// 数量改变的方法
		bindChange(e) {
			// console.log(e);
			this.quantity = e.value ? e.value : e;
		},
		// 左侧按钮的点击事件处理函数
		onClick(e) {
			if (e.content.text === '购物车') {
				// 切换到购物车页面
				uni.navigateTo({
					url: '../../minesubpkg/cart/cart'
				});
			}
		},
		// 右侧按钮的点击事件处理函数
		async buttonClick(e) {
			this.isWho = e.content.text;
			// 判断是否点击了 加入购物车 按钮
			if (e.content.text === '加入购物车') {
				this.isMaskShow = !this.isMaskShow;
				// console.log('购物车', '子组件');

				// 3. 通过 this 调用映射过来的 addToCart 方法，把商品信息对象存储到购物车中
				// this.addToCart(goods);
			} else if (e.content.text === '立即购买') {
				this.isMaskShow = !this.isMaskShow;
				// console.log('立即购买', '子组件');
				// this.$emit('buyNow', this.good);
			}
		}
	}
};
</script>

<style lang="scss" scoped>
// 商品导航组件
.goods-nav {
	position: fixed;
	bottom: 0;
	width: 100%;
}
.mask {
	display: flex;
	justify-content: center;
	align-items: center;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
	z-index: 999;
	background: rgba(0, 0, 0, 0.6);

	.wrapper {
		border-radius: 40rpx;
		display: flex;
		flex-direction: column;
		align-content: space-around;
		justify-content: space-around;
		width: 80%;
		height: 80%;
		margin: 0 auto;
		background-color: #fff;
		.row1,
		.row2,
		.row3,
		.row4 {
			width: 80%;
			// height: 180rpx;
			padding: 20rpx 0;
			margin: 0 auto;
			.title {
				height: 40rpx;
				margin-bottom: 30rpx;
			}
		}
		.row1 {
			height: 200rpx;
			position: relative;
			.img {
				position: absolute;
				top: -80rpx;
				left: -20rpx;
				// height: 100%;
				border-radius: 30rpx;
				// margin-top: -10rpx;
				overflow: hidden;
				image {
					width: 204rpx;
					height: 204rpx;
				}
			}
			.dec {
				position: absolute;
				top: 80rpx;
				left: 50%;
				transform: translateX(-10%);
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;
				.name {
					color: #3e3e3e;
					font-size: 26rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-line-clamp: 2; /*指定文字显示的行数*/
					-webkit-box-orient: vertical;
				}
				.num {
					color: #999;
					font-size: 24rpx;
				}
			}
			.close-icon {
				background-color: #fff;
				border-radius: 50%;
				position: absolute;
				right: -10rpx;
				top: -20rpx;
			}
		}
		.row2 {
			.wrapper-sku {
				width: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: flex-start;
				height: 140rpx;
				-webkit-overflow-scrolling: touch;
				overflow: auto;
				.list {
					width: 90%;
					background-color: #eee;
					border-radius: 28rpx;
					// border: 1px solid #999;
					margin: 10rpx auto;
					.item {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						width: 100%;
						padding: 0 10rpx;
						font-size: 24rpx;
						height: 68rpx;
						white-space: nowrap;
						text-overflow: ellipsis;
						overflow: hidden;
						// background-color: red;
						text {
							flex: none;
							padding: 20rpx;
						}
					}
				}
				.list.active {
					border: 1px solid #999;
				}
			}
		}
		.row3 {
			.list {
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
				width: 90%;
				margin: 10rpx auto;
				.item {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 0 10rpx;
					font-size: 24rpx;
					height: 68rpx;
					background-color: #eee;
					border-radius: 28rpx;
					margin: 10rpx auto;
				}
			}
		}
		.row4 {
			.wrapper-num {
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
		}
		.btm {
			margin: 0 auto;
			button {
				color: #fff;
				// width: 50%;
				background-color: $navigateBackgroundColor;
			}
		}
	}
}
</style>
