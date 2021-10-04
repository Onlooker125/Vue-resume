<!--
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-23 10:53:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\views\activity\index\index.vue
-->
<template>
  <div class="main">111{{ appConfig.name }}</div>
</template>
<script>
import { appConfig } from "@/app.config";
import { getApi, postApi, putApi } from "@/api/index";
export default {
  //模块
  components: {},
  data() {
    return {
      appConfig: appConfig,
      bannerList: [],
    };
  },
  created() {
    // this.$toast(this.appConfig.name);
    // this.getBanner();
  },
  methods: {
    //获取banner
    getBanner() {
      getApi({
        url: recommendedlist,
      }).then((res) => {
        if (res.code == 200) {
          let data = res.data;
          this.bannerList = data;
        }
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "./index.less";
</style>