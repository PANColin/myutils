import isLogin from '@/mixins/isLogin.js'
export default {
	mixins: [isLogin],
	data() {
		return {
			// isCollected: false,
			// id: ''
		}
	},
	methods: {
		// 是否收藏的提示框
		CollectedYN(item) {
			// this.isCollected = item.isCollected;
			if (item.isCollected) {
				uni.$showMsg({
					title: '收藏成功'
				});
			} else {
				uni.$showMsg({
					title: '取消收藏'
				});
			}
		},
		collectClick(item, name, path) {
			if (this.isLogin(path)) {
				// 先判断有没有登录
				item.isCollected = !item.isCollected;
				// #ifdef MP-WEIXIN
				setTimeout(() => {
					if (path == '/pages/find/find') {
						// 重新刷新页面
						uni.reLaunch({
							url: path
						})
					}
				}, 1000)
				// #endif
				// console.log(item.isCollected);
				const cList = uni.getStorageSync(name);
				const collectList = [...cList];
				if (cList) {
					// console.log(cList.findIndex(el => el.id == item.id));
					const cIndex = cList.findIndex(el => el.id == item.id);
					if (cIndex !== -1) {
						// cList[cIndex].isCollected = !cList[cIndex].isCollected;
						collectList.splice(cIndex, 1);
						this.CollectedYN(item);
					}
					if (cIndex === -1) {
						// console.log(item);
						// item.isCollected = !item.isCollected;
						collectList.push(item);
						this.CollectedYN(item);
					}
				} else {
					//不存在才添加
					collectList.push(item);
					this.CollectedYN(item);
				}
				uni.setStorageSync(name, collectList);
			}
		}

	}
}
