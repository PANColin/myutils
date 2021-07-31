<template>
  <div>
    <div id="tab-bar">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "TabBar",

  components: {},
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style scoped>
#tab-bar {
  display: flex;
  /* justify-content: space-evenly; */
  background-color: #eee;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  box-shadow: 0 -2px 1px rgba(198, 182, 182, 0.8);
}
</style>
