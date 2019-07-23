import axios from 'axios'
import store from '../store'
import router from '../router/router';
import { getToken, setToken, removeToken } from '@/util/auth';
import { Message } from 'element-ui'
import errorCode from '@/const/errorCode'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import qs from 'qs';
//超时时间
axios.defaults.timeout = 30000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;
//axios.defaults.baseURL = 'http://www.52gongzi.com:8040'
axios.defaults.baseURL = 'http://123.206.120.120:8040'
NProgress.configure({ showSpinner: false }) // NProgress Configuration
let msg;
//HTTPrequest拦截
axios.interceptors.request.use(config => {
  NProgress.start() // start progress bar
  if (store.getters.access_token) {
    config.headers['token'] = getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }
  if(config.method=='put'){
    config.data=qs.stringify(config.data, { arrayFormat: 'repeat' });
  }
  return config
}, error => {
  return Promise.reject(error)
})
//HTTPresponse拦截
axios.interceptors.response.use(data => {
      NProgress.done();
      var resData = data.data;
        resData.code = data.status;
      return resData
}, error => {
      NProgress.done();
      return Promise.reject(new Error(error));
})
export default axios