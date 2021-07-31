<template>
	<view>
		<view v-if="current != 4">
			<block v-for="(item, i) in orderList" :key="i">
				<view class="order">
					<view class="top">
						<text class="orderId">订单编号：{{ item.order.orderSn }}</text>
						<text>{{ item.order.status | statusText }}</text>
					</view>
					<view class="goods">
						<block v-for="(good, index) in item.items" :key="index"><my-good :goods="good" :current="current"></my-good></block>
					</view>
					<view class="btm">
						<view class="time">时间:{{ item.order.createTime }}</view>
						<view class="title">合计:{{ item.order.totalAmount }} 元</view>
						<view class="button-wrapper">
							<block v-if="current == 0">
								<button type="default" size="mini" @click="cancelOrder(item)">取消订单</button>

								<button @click="pay(item)" type="default" size="mini">付款</button>
							</block>
							<block v-if="current == 2"><button type="default" size="mini" @click="receiveDone(item)">确认收货</button></block>
							<block v-if="item.order.status == 4">
								<button style="border: #f00 1px solid;" type="default" @click="delOrder(item)" size="mini">订单已关闭,删除记录</button>
							</block>
						</view>
					</view>
				</view>
			</block>
		</view>
		<view v-else>
			<block v-for="item in retunList" :key="item.id">
				<view class="return_good">
					<view class="top">
						<text class="orderId">订单编号：{{ item.orderSn }}</text>
						<text>{{ item.status | orderProcessText }}</text>
					</view>
					<view class="goods"><my-good :goods="item" :current="current"></my-good></view>
					<view class="btm">
						<view class="time">时间:{{ item.createTime }}</view>
						<view class="title">合计:{{ item.returnAmount }} 元</view>
					</view>
				</view>
			</block>
		</view>
	</view>
</template>

<script>
import { findAllOrders, orderReturnApplys, cancelOrder, receiveDone, deleteOrder } from '@/api/user/order/index.js';
import { addPreOrder, getPreOrderById, addConfirmOrder } from '@/api/order/index.js';
export default {
	name: 'my-order',
	props: {
		// Invalid default value for prop "retunList":
		// Props with type Object/Array must use a factory function to return the default value.
		//default() {
		// 	return [];
		// }
		orderList: {
			type: Array,
			default() {
				return [];
			}
		},
		current: {
			type: Number,
			// type:String,
			default: 0
		},
		retunList: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	// props: ['orderList', 'current'],
	data() {
		return {};
	},
	methods: {
		//取消订单
		cancelOrder(val) {
			// console.log(val);
			uni.$confirmMsg({ content: '亲，您确定要取消订单么？' }, async () => {
				const { data: res } = await cancelOrder(val.order.id);
				// console.log(res);
				if (!res.success) return uni.$showMsg({ title: '取消订单失败' });
				uni.$showMsg({ title: '取消订单成功' });
			});
		},
		// 付款
		pay(val) {
			uni.navigateTo({
				url: '../../minesubpkg/order/order?orderId=' + val.order.id
			});
			// console.log(val);
		},
		//确认收货
		receiveDone(val) {
			uni.$confirmMsg({ content: '亲，您确定您收到了么？' }, async () => {
				const { data: res } = await receiveDone({ orderId: val.order.id });
				// console.log(res);
				if (!res.success) return uni.$showMsg({ title: res.message });
				uni.$showMsg({ title: '收货成功' });
			});
		},
		// 删除订单
		delOrder(val) {
			uni.$confirmMsg({ content: '亲，您确定删除当前订单么？' }, async () => {
				const { data: res } = await deleteOrder(val.order.id);
				// console.log(res);
				if (!res.success) return uni.$showMsg({ title: res.message });
				uni.$showMsg({ title: '删除订单成功' });
			});
		}
	},
	filters: {
		statusText(val) {
			if (val == 0) {
				return '未付款';
			} else if (val == 1) {
				return '已付款,等待发货';
			} else if (val == 2) {
				return '已发货';
			} else if (val == 3) {
				return '已收货';
			} else if (val == 4) {
				return '已完成';
			} else {
				return '无效订单';
			}
		},
		orderProcessText(process) {
			var text = '等待处理';
			switch (JSON.stringify(process)) {
				case '0':
					text = '等待处理';
					break;
				case '1':
					text = '确认退货,等待用户发货';
					break;
				case '2':
					text = '已退款';
					break;
				case '3':
					text = '已拒绝';
					break;
				case '9':
					text = '拒绝退货';
					break;

				default:
					break;
			}
			return text;
		}
	}
};
</script>

<style lang="scss" scoped>
.order,
.return_good {
	width: 95%;
	margin: 40rpx auto;
	background-color: #fff;
	border-radius: 40rpx;
	.top {
		font-family: fantasy;
		font-size: 24rpx;
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding: 30rpx;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
	.btm {
		display: flex;
		align-items: flex-end;
		flex-direction: column;
		justify-content: center;
		font-family: fantasy;
		padding: 30rpx;
		.title {
			color: #e00;
		}
		.button-wrapper {
			padding-top: 40rpx;
		}
	}
}
</style>
