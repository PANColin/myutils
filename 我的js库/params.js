/**
 * url:地址全称或者去掉问号的参数字符串
 * isArray 是否以数组返回，默认是false
 * args:传入的参数的key
 * return:返回传入的key和value组成的数组对象或者对象
 */
function getParamsCall({ Paddress, isArray = false }, ...args) {
  if (Paddress) {
    if (/\?/.test(Paddress)) {
      var param = Paddress.split("?")[1];
      var pram2 = new URLSearchParams("?" + param);
    } else {
      var pram2 = new URLSearchParams("?" + Paddress);
    }
    if (isArray) {
      return args.map((el) => {
        const paramObj = {};
        paramObj[el] = pram2.get(el);
        return paramObj;
      });
    } else {
      const paramObj = {};
      for (let item of args) {
        paramObj[item] = pram2.get(item);
      }
      return paramObj;
    }
  }else{
    throw Error("您传入的参数有误，请以{Paddress：您传的参数地址值, isArray = false默认是flase,以对象形式返回,您可以设置true，以数组形式返回}形式传递参数name的值");
  }
}
/**
 * url:地址全称或者去掉问号的参数字符串
 * arrParamName:传入的参数的key的数组
 * isArray 是否以数组返回，默认是false
 * return:返回传入的key和value组成的数组对象或者对象
 */
function getParamsApply(url, arrParamName, isArray = false) {
  if (/\?/.test(url)) {
    var param = url.split("?")[1];
    var pram2 = new URLSearchParams("?" + param);
  } else {
    var pram2 = new URLSearchParams("?" + url);
  }
  if (arrParamName instanceof Array) {
    if (isArray) {
      return arrParamName.map((el) => {
        const paramObj = {};
        paramObj[el] = pram2.get(el);
        return paramObj;
      });
    } else {
      const paramObj = {};
      for (let item of arrParamName) {
        paramObj[item] = pram2.get(item);
      }
      return paramObj;
    }
  } else {
    throw Error("您传入的参数有误，请以数组形式传递参数name的值");
  }
}
