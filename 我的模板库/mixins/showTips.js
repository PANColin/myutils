export default {
	data() {
		return {
			seconds: 3,
			timer: null
		}
	},
	methods: {
		// 展示倒计时的提示消息
		showTips(n, name) {
			// 调用 uni.showToast() 方法，展示提示消息
			uni.$showMsg({
				title: n + ' 秒后自动跳转到' + name
			});
		},
		delayNavigate(type, path, name) {
			// 把 data 中的秒数重置成 3 秒
			this.seconds = 3;
			this.showTips(this.seconds, name);
			// 将定时器的 Id 存储到 timer 中
			this.timer = setInterval(() => {
				this.seconds--;
				// 判断秒数是否 <= 0
				if (this.seconds <= 0) {
					// 清除定时器
					clearInterval(this.timer);
					// 跳转到 登录 页面
					uni[type]({
						url: path,
						complete(res) {
							console.log(res);
						}
					});
					// 终止后续代码的运行（当秒数为 0 时，不再展示 toast 提示消息）
					return false;
				}
				this.showTips(this.seconds, name);
			}, 1000);
		}
	}

}
