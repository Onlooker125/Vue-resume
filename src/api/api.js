/*
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-24 08:57:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\api\api.js
 */
import axios from 'axios';
import { appConfig } from '@/app.config'

export var base = appConfig.apiUrl;
axios.defaults.headers.post['Content-Type'] = 'application/json; charset=UTF-8';
//添加请求拦截器
axios.interceptors.request.use(function (config) {
  let token = localStorage.getItem('token') || 'e0dbc9ba-e91d-4275-8e53-06e52f4ff036'
  if (config.url!='/api/auth') {
    config.headers['auth'] = token
  }
  // form表单形式提交
  if (config.data) {
    config.headers['Access-Control-Allow-Origin'] = '*'
    let formData = new FormData();
    for (let key in config.data) {
      if (key === 'file') {
        formData.append(key, config.data[key].file);
      } else {
        formData.append(key, config.data[key]);
      }
    }
    config.data = formData

    config.headers['Content-Type'] = 'multipart/form-data'
  }
  if (config.ajaxByForm) {
    // config.data = /token/g.test(config.data) ? config.data : config.data

  } else if (config.params) {
    // config.params['token'] = token;
  }

  return config;
}, function (error) {
  return Promise.reject(error);
});

//返回状态判断(添加响应拦截器) 示例暂无拦截 根据实际情况判断
axios.interceptors.response.use(res => {
  if (res.data.code == 403) {
    // token过期
    toLogin()
  } else {
    return res
  }
}, error => {
  if (error.response.code === 403) {
    toLogin()
  } else if (error.response.code === 500) {
    // 服务器错误
    return Promise.reject(error.response.data)
  }
  // 返回 response 里的错误信息
  return Promise.reject(error.response.data)
})

let toLogin = () => {
  // let type = localStorage.getItem("type")
  location.href = `/#/login`
}