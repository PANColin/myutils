<template>
       <tab-bar>
      <tab-bar-item path="/home" :activeColor="activeTxtColor">
        <img slot="item-icon" src="~@/assets/img/tabbar/user.png" alt="" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/user-active.png" alt="" />
        <div slot="item-text">用户</div>
      </tab-bar-item>
      <tab-bar-item path="/category" :activeColor="activeTxtColor">
        <img slot="item-icon" src="~@/assets/img/tabbar/robot.png" alt="" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/robot-active.png" alt="" />
        <div slot="item-text">机器人</div>
      </tab-bar-item>
      <tab-bar-item path="/about" :activeColor="activeTxtColor">
        <img slot="item-icon" src="~@/assets/img/tabbar/desktop.png" alt="" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/desktop-active.png" alt="" />
        <div slot="item-text">电脑</div>
      </tab-bar-item>
      <tab-bar-item path="/shopcart" :activeColor="activeTxtColor">
        <img slot="item-icon" src="~@/assets/img/tabbar/piechart-circle-fil.png" alt="" />
        <img slot="item-icon-active" src="~@/assets/img/tabbar/piechart-circle-fil-active.png" alt="" />
        <div slot="item-text">数据</div></tab-bar-item
      >
    </tab-bar> 
</template>

<script>
import TabBar from "@/components/tabbar/TabBar.vue";
import TabBarItem from "@/components/tabbar/TabBarItem.vue";
export default {
    name: 'WorkspaceMaintabBar',

    components: {TabBar,TabBarItem},
    data() {
        return {
            activeTxtColor:"deepPink"
        };
    },

    mounted() {
        
    },

    methods: {
        
    },
};
</script>

<style scoped>

</style>