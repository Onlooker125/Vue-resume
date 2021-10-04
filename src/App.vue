<!--
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-24 14:46:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\App.vue
-->

<template>
  <div id="app">
    <!-- <keep-alive><router-view v-if="$route.meta.keepAlive" /></keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view> -->
    <keep-alive>
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import { postApi } from "./api/index";
export default {
  name: "app",
  created() {
      // 初始化获取auth并加入缓存
      let params = {
        auth: "s1sss",
      };
      postApi({
        url: "/auth",
        query: params,
      }).then((res) => {
        if (res.flag == 'success') {
          localStorage.setItem('token',res.data.auth)
        }
      });
  },
  data() {
    return {
    };
  },
  methods: {},
};
</script>
<style lang="less">
@import "common/css/reset.css";
@import "common/css/common.css";
</style>