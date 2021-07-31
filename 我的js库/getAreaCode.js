//转换地区编码的方法
/**
 *
 * @param {code:areaName的对象} obj
 * @param {地址} address
 * @returns 返回一个具体的{code:areaName的对象}
 */
function getAreaCode(obj, address) {
  //  定义一个空数组装载一个个具体的{code:areaName的对象}
  let codeList = [];
  Object.keys(obj).forEach((val) => {
    // console.log(val + " -> " + this.areaList.province_list[val]);
    let objC = {};
    // console.log(idx,arr)
    objC[val] = obj[val];
    codeList.push(objC);
  });
  // return codeList;
  // 定义一个最终结果的对象
  let result = {};
  codeList.forEach((el) => {
    //...将含有areaName的对象的数组转换
    if (address.indexOf(...Object.values(el)) != -1) {
      // console.log(el);
      // 在这里不能返回有作用域问题吧可能
      // return el;
      result = el;
    }
  });
  return result;
}
export { getAreaCode };
