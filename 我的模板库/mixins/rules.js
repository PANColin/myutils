//导入验证js
import WxValidate from "../utils/volidata.js";

// 表单验证
export default {
	data() {
		return {
			WxValidate: {},
		}
	},
	methods: {
		initValidate(rulesObj, messageObj) {
			let rules = {
				name: {
					required: true,
					rangelength: [2, 6],
				},
				tel: {
					required: true,
					tel: true,
				},
				...rulesObj
			};

			let message = {
				name: {
					required: "请输入用户名",
					rangelength: "用户名需要在2-6之间",
				},
				tel: {
					required: "请输入正确的手机号码",
					range: "号码输入有效值错误",
				},
				...messageObj
			};
			//实例化当前的验证规则和提示消息
			this.WxValidate = new WxValidate(rules, message);
		}
	},

}
