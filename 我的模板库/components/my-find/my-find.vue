<template>
	<view>
		<view class="top" v-if="isShowTabs">
			<view @click="tabsClick(item, index)" class="item" v-for="(item, index) in tabsList" :key="index" :class="index == currentIndex ? 'btm' : ''">{{ item.name }}</view>
		</view>
		<view class="showList">
			<view class="list-item" v-for="item in list" :key="item.id">
				<navigator :url="isWho == 'article' ? '/goodsubpkg/detailAB/detailAB?id=' + item.id : '#'">
					<view class="list-top">
						<image :src="isWho == 'article' ? item.coverImg : item.logo" mode="widthFix"></image>
						<view class="txt">
							<text>{{ item.title }}</text>
							<text>{{ item.summary }}</text>
						</view>
					</view>
				</navigator>
				<view class="list-bottom" v-if="isWho == 'article'">
					<view class="left">
						<uni-icons type="eye"></uni-icons>
						<text class="count">{{ item.viewCount }}</text>
					</view>
					<view class="right" @click="collectClick(item, 'findCollect', `/pages/find/find`)">
						<!-- {{ item.isCollected }} -->
						<uni-icons type="star" size="20" :color="item.isCollected ? '#f00' : '#999'"></uni-icons>
					</view>
				</view>
				<view class="brand-bottom" v-else>
					<text class="name">{{ item.name }}</text>
					<text class="brandStory">{{ item.brandStory }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import isCollected from '@/mixins/isCollected.js';

export default {
	name: 'my-find',
	mixins: [isCollected],
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		},
		isWho: {
			type: String,
			default: 'article'
		},
		isShowTabs: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			tabsList: [{ name: '精选文章', des: 'article' }, { name: '品牌列表', dec: 'brands' }],
			currentIndex: 0
			// isCollected: false,
		};
	},
	created() {},
	methods: {
		tabsClick(val, index) {
			// console.log(val);
			this.currentIndex = index;
			this.$emit('tabsClick', val);
		}
		// collectClick(item, name, path) {
		// 	// console.log('子组件', val);
		// 	const obj = { val, name, path };
		// 	console.log(obj,'子组件');
		// 	this.$emit('collClick', obj);
		// }
	}
};
</script>

<style lang="scss" scoped>
.btm {
	border-bottom: 3px solid #eee;
}
.top {
	position: sticky;
	top: 0;
	z-index: 999;
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: $navigateBackgroundColor;
	.item {
		padding: 20rpx;
		margin-bottom: 10rpx;
		color: #fff;
	}
}
.showList {
	.list-item {
		width: 646rpx;
		height: 462rpx;
		margin: 0 auto;
		background-color: #fff;
		border-radius: 32rpx;
		padding: 0 40rpx;
		margin-top: 20rpx;
		.list-top {
			position: relative;
			width: 646rpx;
			height: 366rpx;
			image {
				width: 100% !important;
				height: 100% !important;
			}
			.txt {
				display: flex;
				flex-direction: column;
				position: absolute;
				left: 40rpx;
				bottom: 100rpx;
				color: #fff;
			}
		}
		.list-bottom {
			height: 96rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			.left {
				display: flex;
				justify-content: space-around;
				align-items: center;
				font-size: 28rpx;
				color: #3e3e3e;
				.count {
					padding-left: 20rpx;
				}
			}
		}
		.brand-bottom {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: flex-start;
			.name {
				font-size: 40rpx;
				font-weight: 600;
			}
			.brandStory {
				font-size: 24rpx;
				color: #b1b1b1;
			}
		}
	}
}
</style>
