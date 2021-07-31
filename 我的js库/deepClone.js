// 递归函数深克隆   ⭐
function deepClone(obj) {
	if (obj === null) {
		return null;
	} else if (Array.isArray(obj)) {
		var newObj = [];
	} else {
		var newObj = {};
	}

	for (var i in obj) {
		// 判断属性值是否是引用类型
		if (typeof obj[i] === "object") {
			// null array object
			newObj[i] = deepClone(obj[i]);
		} else {
			newObj[i] = obj[i];
		}
	}

	return newObj;
}
