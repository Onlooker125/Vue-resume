import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import routes from './router'

import store from './store/index'
Vue.use(VueRouter);
// 世界上只有两种光东西不可以直视一种是 太阳
//   另外一种是打工人自信的光芒
Vue.config.productionTip = false

import Vant from 'vant';
import 'vant/lib/index.css';

Vue.use(Vant);

import rem from './libs/rem'
Vue.use(rem)

// import echarts from 'echarts'
// Vue.prototype.$echarts = echarts
let router = new VueRouter({
  mode: 'hash',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {
        x: 0,
        y: 0
      }
    }
  },
  routes
})
/* eslint-disable no-new */
// 全局导航守卫
router.beforeEach((to, from, next) => {
  // 对组件进行动态缓存
  if (to.name == 'express') {
    store.commit('iskeepAlive', to.name);
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')