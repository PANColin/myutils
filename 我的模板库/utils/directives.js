import Vue from 'vue'

const selectLoadMore = Vue.directive('selectLoadMore', {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-select-dropdown .el-select-dropdown__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      // console.log('=====================')
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})
const elScrollMore = Vue.directive('elScrollMore', {
  bind(el, binding) {
    // 获取element-ui定义好的scroll盒子
    const SELECTWRAP_DOM = el.querySelector('.el-scrollbar .el-scrollbar__wrap')
    SELECTWRAP_DOM.addEventListener('scroll', function() {
      // console.log('=====================')
      const CONDITION = this.scrollHeight - this.scrollTop <= this.clientHeight
      if (CONDITION) {
        binding.value()
      }
    })
  }
})
export { selectLoadMore, elScrollMore }
