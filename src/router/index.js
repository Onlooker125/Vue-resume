/*
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-24 11:31:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\router\index.js
 */
import home from '@/view/home'
import baseinfo from '@/view/baseinfo'
// import editTechnology from '@/view/editTechnology'
import educationaledit from '@/view/educationaledit'
import projectexperienceedit from '@/view/projectexperienceedit'
import masterskilledit from '@/view/masterskilledit'
import jobIntentionedit from '@/view/jobIntentionedit'
import login from '@/view/login'
import registered from '@/view/registered';
let routes = [
  // 登录
  {
    path: '/',
    name: 'login',
    component: login
  },
  // 主页
  {
    path: '/home',
    name: 'home',
    component: home
  },
  // 个人中心
  {
    path: '/baseinfo',
    name: 'baseinfo',
    component: baseinfo
  },
  // 教育背景
  {
    path: '/educationaledit',
    name: 'educationaledit',
    component: educationaledit
  },
  // 项目经验
  {
    path: '/projectexperienceedit',
    name: 'projectexperienceedit',
    component: projectexperienceedit
  },
  // 掌握技能
  {
    path: '/masterskilledit',
    name: 'masterskilledit',
    component: masterskilledit
  },
  // 求职意向
  {
    path: '/jobIntentionedit',
    name: 'jobIntentionedit',
    component: jobIntentionedit
  },
  // 注册
  {
    path: '/registered',
    name:'registered',
    component:registered
  },
  { path: '*', redirect: '/' }
];

export default routes;

