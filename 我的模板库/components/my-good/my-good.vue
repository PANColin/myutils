<template>
	<view class="wrapper">
		<view class="left"><radio :checked="goods.goods_state" color="#C00000" v-if="showRadio" @click="clickHandler"></radio></view>
		<view class="goods-wrapper">
			<view @click="moveToDetail">
				<view class="goods_item">
					<!-- 左侧 图片容器 -->
					<view class="goods_img_wrap">
						<block v-if="goods.productPic">
							<image mode="widthFix" :src="goods.productPic ? goods.productPic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
						</block>
						<block v-if="goods.pic">
							<image mode="widthFix" :src="goods.pic ? goods.pic : 'https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg'"></image>
						</block>
					</view>
					<!-- 右侧 商品容器 -->
					<view class="goods_info_wrap">
						<block v-if="goods.productName">
							<view class="goods_name">{{ goods.productName }}</view>
						</block>
						<block v-if="goods.name">
							<view class="goods_name">{{ goods.name }}</view>
						</block>
						<!-- <block v-if="goods.productSkuId">
							<view class="goods_productSkuId">编号:{{ goods.productSkuId }}</view>
						</block> -->
						<block v-if="goods.productId">
							<view class="goods_productSkuId">编号:{{ goods.productId }}</view>
						</block>
						<text class="goods_price">价格:￥{{ goods.price ? goods.price : goods.productPrice | tofixed }}</text>
						<block v-if="goods.quantity">
							<text class="goods_num">数量:{{ goods.quantity }}</text>
						</block>
						<block v-if="goods.productQuantity">
							<text class="goodspro_num">x{{ goods.productQuantity }}</text>
						</block>
						<block v-if="goods.productCount">
							<text class="goodspro_num">x{{ goods.productCount }}</text>
						</block>
						<text class="dec" v-if="isProductAttr">
							<block v-for="(item, index) in goods.productAttr" :key="index">
								<text class="dec-item">{{ item.key }}:{{ item.value }}</text>
							</block>
						</text>
						<block v-if="current == 2">
							<view class="return_good" @click.stop="returnGood"><text>退货</text></view>
						</block>
					</view>
				</view>
			</view>
			<view class="goods_info-bottom" v-if="showNum"><uni-number-box :min="1" :value="goods.quantity" @change="bindChange"></uni-number-box></view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'my-good',
	// 定义 props 属性，用来接收外界传递到当前组件的数据
	created() {
		this.isProductAttr = this.goods.productAttr instanceof Array;
	},
	props: {
		// 商品的信息对象
		goods: {
			type: Object,
			default() {
				return {};
			}
		},
		// 是否展示图片左侧的 radio
		showRadio: {
			type: Boolean,
			// 如果外界没有指定 show-radio 属性的值，则默认不展示 radio 组件
			default: false
		},
		// 是否展示价格右侧的 NumberBox 组件
		showNum: {
			type: Boolean,
			default: false
		},
		current: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			isProductAttr: false
		};
	},
	filters: {
		// 把数字处理为带两位小数点的数字
		tofixed(num) {
			return Number(num).toFixed(2);
		}
	},
	methods: {
		// 退货
		returnGood() {
			// console.log(this.goods);
			uni.navigateTo({
				url: `../../minesubpkg/orderBack/orderBack?orderId=${this.goods.orderId}&orderItemId=${this.goods.id}&num=${this.goods.productQuantity}`
			});
			// console.log(this.goods);
		},
		moveToDetail(e) {
			// console.log(e);
			uni.navigateTo({
				url: '/goodsubpkg/goodsDetail/goodsDetail?productId=' + (this.goods.productId ? this.goods.productId : this.goods.id)
			});
		},
		// 点击单选框
		clickHandler(e) {
			// console.log(e);
			// console.log(this.goods);
			let goods_state = !this.goods.goods_state;
			// console.log(goods_state);
			this.$emit('radio-change', { goods_id: this.goods.id, goods_state: !this.goods.goods_state });
		},
		// num盒子改变事件
		bindChange(values) {
			const params = {
				id: this.goods.id,
				productId: this.goods.productId,
				productSkuId: this.goods.productSkuId,
				quantity: values.value ? values.value - this.goods.quantity : values - this.goods.quantity,
				num: values,
				type: values.type ? values.type : 'input'
			};
			// console.log(params);
			this.$emit('num-change', params);
		}
	}
};
</script>

<style lang="scss">
.wrapper {
	border-bottom: 1px solid #ccc;
	padding: 20rpx;
	display: flex;
	.left {
		display: flex;
		align-items: center;
	}
	.goods-wrapper {
		display: flex;
		flex-direction: column;

		.goods_info-bottom {
			display: flex;
			justify-content: flex-end;
			// flex-direction: column;
			align-items: center;
			margin: 0 20rpx;
			// .goods_price {
			// 	width: 200rpx;
			// 	color: $themeColor;
			// 	font-size: 32rpx;
			// }
		}
		.goods_item {
			// width: 750rpx;
			display: flex;
			align-items: center;
			.goods_img_wrap {
				// flex: 2;
				padding-left: 20rpx;
				width: 100px;
				display: flex;
				justify-content: center;
				align-items: center;
				image {
					width: 160rpx !important;
					height: 160rpx !important;
				}
			}
			.goods_info_wrap {
				position: relative;
				// flex: 1;
				width: 340rpx;
				padding-left: 20rpx;
				display: flex;
				flex-direction: column;
				justify-content: space-around;
				font-family: fantasy;
				.goods_name {
					display: -webkit-box;
					overflow: hidden;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
					font-size: 30rpx;
					font-weight: bold;
					padding-right: 40rpx;
				}
				.goods_price {
					width: 200rpx;
					color: #f00;
					font-size: 24rpx;
				}
				.goods_productSkuId,
				.goods_num,
				.dec {
					color: #8d8d8d;
					font-size: 24rpx;
				}
				.dec {
					.dec-item {
						padding-right: 10rpx;
					}
				}
				.goodspro_num {
					// display: flex;
					// justify-content: flex-end;
					// align-items: center;
					position: absolute;
					right: -40rpx;
				}
				.return_good {
					align-self: flex-end;
					text {
						font-size: 30rpx;
						text-decoration: underline;
						color: #99e;
					}
				}
			}
		}
	}
}
</style>
