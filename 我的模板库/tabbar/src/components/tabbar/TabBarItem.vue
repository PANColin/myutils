<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props: {
    path: { type: String },
    activeColor: { type: String, default: "red" },
  },
  components: {},

  data() {
    return {
      //   isActive: false,
    };
  },
  computed: {
    isActive() {
      return this.$route.path.indexOf(this.path) !== -1;
    },
    activeStyle(){
        return this.isActive ? {color:this.activeColor} : {};
    }
  },
  mounted() {},

  methods: {
    itemClick() {
      this.$router.replace(this.path).catch((err) => err);
      console.log(this.$route.path);
    },
  },
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  font-size: 10px;
  height: 49px;
}
.tab-bar-item img {
  width: 25px;
  height: 25px;
  vertical-align: middle;
}
</style>
