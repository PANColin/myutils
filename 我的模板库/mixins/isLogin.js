import {
	mapMutations
} from 'vuex';

export default {
	data() {
		return {
			// 倒计时的秒数
			seconds: 3,
			// 定时器的 Id
			timer: null
		}
	},
	methods: {
		...mapMutations('m_user', ['updateRedirectInfo']),
		isLogin(path) {
			var token = this.$store.state['m_user'].token;
			if (token) {
				return true
			} else {
				if (path.match(/\/goodsubpkg\/goodsDetail\/goodsDetail/)) {
					return this.delayNavigate(path);
				} else {
					uni.$confirmMsg({
						content: '暂未登录，是否立即登录'
					}, () => {
						uni.navigateTo({
							url: "/pages/user/login/login"
						});
						this.updateRedirectInfo({
							// 跳转的方式
							openType: 'navigateTo',
							// 从哪个页面跳转过去的
							from: path,
						});
					})
				}

			}
		},
		// 展示倒计时的提示消息
		showTips(n, params) {
			// 调用 uni.showToast() 方法，展示提示消息
			uni.showToast({
				// 不展示任何图标
				icon: 'none',
				// 提示的消息
				title: '请先登录' + n + ' 秒后自动跳转到登录页',
				// 为页面添加透明遮罩，防止点击穿透
				mask: true,
				// 1.5 秒后自动消失
				duration: 1500,
				...params
			});
		},
		// 延迟导航到 my 页面
		delayNavigate(path) {
			// 把 data 中的秒数重置成 3 秒
			this.seconds = 3;
			this.showTips(this.seconds);

			// 将定时器的 Id 存储到 timer 中
			this.timer = setInterval(() => {
				this.seconds--;

				// 判断秒数是否 <= 0
				if (this.seconds <= 0) {
					// 清除定时器
					clearInterval(this.timer);

					// 跳转到 登录 页面
					uni.navigateTo({
						url: "/pages/user/login/login",
						// 页面跳转成功之后的回调函数
						success: () => {
							// console.log(path, '============');
							// 调用 vuex 的 updateRedirectInfo 方法，把跳转信息存储到 Store 中
							this.updateRedirectInfo({
								// 跳转的方式
								openType: 'navigateTo',
								// 从哪个页面跳转过去的
								from: path,
							});
						}
					})
					// 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
					return false;
				}

				this.showTips(this.seconds);
			}, 1000);
		},
	}
}
