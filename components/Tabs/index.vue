<template>
  <div>
    <!-- tab切换区域 -->
    <div class="flex-around-column tabs">
      <div
        v-for="(item, index) in tabList"
        :key="index"
        class="flex-center tab-item"
        :style="{ fontSize }"
      >
        <div
          :style="{ color: activeTab === index ? activecolor : color }"
          class="fcp fw"
          :class="[activeTab === index ? 'tab-active-text' : 'tab-text']"
          @click="tabChange(index)"
        >
          {{ item }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // tabs列表
    tabList: {
      type: Array,
      default: () => []
    },
    fontSize: {
      type: String,
      default: '2rem'
    },
    // 激活的颜色
    activecolor: {
      type: String,
      default: '#ffffff'
    },
    // 未激活的颜色
    color: {
      type: String,
      default: '#909294'
    }
  },
  data() {
    return {
      activeTab: 0
    }
  },
  methods: {
    tabChange(index) {
      this.activeTab = index
    }
  }
}
</script>

<style lang="scss" scoped>
// tabs切换
.tab-item {
  padding: 60px;
  flex: none;
}
.tab-item:nth-child(n + 2) {
  margin-left: 20px;
}

.tab-text {
  // font-size: 28px;
  // color: #909294;
}

.tab-active-text {
  // font-size: 28px;
  font-weight: bold;
  // color: #ffffff;
}
</style>
