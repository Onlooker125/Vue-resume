/*
 * @Author: your name
 * @Date: 2021-08-23 10:49:55
 * @LastEditTime: 2021-08-24 10:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-vant-mobile\src\api\index.js
 */
import axios from 'axios'
import {
  base
} from './api'

//get
/* 
 *params有两个参数
 *url 请求接口路径，如果是restful,需要把参数拼接在接口后面传过来
 *query 请求参数，没有就穿个空对象
 */
export const getApi = params => {
  return axios.get(`${base}${params.url}`, {
    params: params.query || {}
  }).then(res => res.data);
};

// post接口
export const postApi = params => {
  return axios.post(`${base}${params.url}`,params.query).then(res => res.data);
};
// put 接口
export const putApi = params => {
  return axios.put(`${base}${params.url}`, (params.query || params.data || {})).then(res => res.data);
};
// delete 接口
export const deleteApi = params => {
  return axios.delete(`${base}${params.url}`, {
    data: params.query || {}
  }).then(res => res.data);
};

