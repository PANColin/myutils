<template>
  <div id="app">
    <main-tab-bar></main-tab-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import MainTabBar from "@/components/MainTabBar.vue";
export default {
  name: "",
  data() {
    return {};
  },
  components: { MainTabBar },
  methods: {},
};
</script>
<style>
@import "~@/assets/css/base.css";
</style>
