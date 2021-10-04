/*
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-24 10:25:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\store\index.js
 */
// 导入vue及vuex
import Vue from 'vue'
import Vuex from 'vuex'
//vuex持久化
import createVuexAlong from 'vuex-along'
// 挂载vuex
Vue.use(Vuex)
 
// 创建vuex对象并向外暴露
export default new Vuex.Store({
  plugins: [createVuexAlong()],//vuex-along
  // 全局属性变量
  state: {
      personInfos:null,
  },
  // 全局同步方法, 调用方法,this.$store.commit("xxx")
  mutations: {
      CHANGEINFO(state, params) {
        state.personInfos=params
      },
      CHANGEITEM(state, params) {
        let akey=Object.keys(params)[0]
        state.personInfos[akey]=params[akey]
      },
  },
  // 异步方法 调用方法,this.$store.dispatch("xxx") 
  actions: {
      //context是一个对象，从它里面把咱们需要的commit方法解构出来
     
  },
  // Vuex属性计算,在视图里面当变量使用
  getters: {
     
  },
  // 模块化注册
  modules: {
  }
})
