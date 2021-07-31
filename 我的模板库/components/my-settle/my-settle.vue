<template>
	<!-- 最外层的容器 -->
	<view class="my-settle-container">
		<!-- 全选区域 -->
		<label class="radio" @click="changeAllState">
			<radio color="#C00000" :checked="isFullCheck" />
			<text>全选</text>
		</label>

		<!-- 合计区域 -->
		<view class="amount-box">
			合计:
			<text class="amount">￥{{ checkedGoodsAmount }}</text>
		</view>

		<!-- 结算按钮 -->
		<view class="btn-settle" @click="settlement">结算({{ checkedCount }})</view>
	</view>
</template>

<script>
import { addPreOrder, getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
import { mapGetters, mapMutations, mapState } from 'vuex';
import isLogin from '@/mixins/isLogin.js';

export default {
	name: 'my-settle',
	mixins: [isLogin],
	data() {
		return {};
	},
	computed: {
		...mapGetters('m_cart', ['checkedCount', 'total', 'checkedGoodsAmount']),
		// token 是用户登录成功之后的 token 字符串
		...mapState('m_user', ['token']),
		...mapState('m_cart', ['cart']),
		//  是否全选
		isFullCheck() {
			return this.total === this.checkedCount;
		}
	},
	methods: {
		// 把 m_user 模块中的 updateRedirectInfo 方法映射到当前页面中使用
		...mapMutations('m_cart', ['updateAllGoodsState']),
		// label 的点击事件处理函数
		changeAllState() {
			// 修改购物车中所有商品的选中状态
			// !this.isFullCheck 表示：当前全选按钮的状态取反之后，就是最新的勾选状态
			this.updateAllGoodsState(!this.isFullCheck);
		},
		// 点击了结算按钮
		settlement() {
			//  先判断是否勾选了要结算的商品
			if (!this.checkedCount) return uni.$showMsg({ title: '请选择要结算的商品！' });

			// 最后判断用户是否登录了
			if (this.isLogin('/minesubpkg/cart/cart')) {
				// console.log('登陆了');
				this.payOrder();
			}
		},
		// 支付订单
		async payOrder() {
			//  创建订单
			//  组织订单的信息对象
			const orderInfo = {
				orderItemList: this.cart.filter(x => x.goods_state).map(x => ({ cartId: x.id, productId: x.productId, productQuantity: x.quantity, productSkuId: x.productSkuId }))
			};
			console.log(orderInfo,'=========================');
			const { data: res } = await addPreOrder(orderInfo);
			console.log(res);
			if (!res.success) return uni.$showMsg({ title: '订单生产失败' });
			uni.redirectTo({
				url: '../../minesubpkg/order/order?orderId=' + res.data.orderId
			});
		}
	}
};
</script>

<style lang="scss">
.my-settle-container {
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	height: 50px;
	// 将背景色从 cyan 改为 white
	background-color: white;
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding-left: 5px;
	font-size: 14px;
	z-index: 999;
	.radio {
		display: flex;
		align-items: center;
	}

	.amount {
		color: #c00000;
	}

	.btn-settle {
		height: 50px;
		min-width: 100px;
		background-color: #c00000;
		color: white;
		line-height: 50px;
		text-align: center;
		padding: 0 10px;
	}
}
</style>
