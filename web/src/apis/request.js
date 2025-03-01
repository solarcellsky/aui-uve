/**
 * 全站http配置
 *
 * axios参数说明
 * isSerialize是否开启form表单提交
 * isToken是否需要token
 */
import axios from 'axios';
console.log(import.meta.env.VITE_BASE_URL)
const service = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL, // 本地-前端解决跨域
  timeout: 600000, // 请求超时时间
  validateStatus: function (status) {
    return status >= 200 && status <= 500;
  },
  withCredentials: true,
});

//http request拦截
service.interceptors.request.use(
  (config) => {
    const meta = config.meta || {};
    //headers中配置text请求
    if (config.text === true) {
      config.headers['Content-Type'] = 'text/plain';
    }


    //headers中配置serialize为true开启序列化
    if (config.method === 'post' && meta.isSerialize === true) {
      config.data = JSON.parse(JSON.stringify(config.data));
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
//http response 拦截
service.interceptors.response.use(
  (res) => {

    //获取状态码
    const status = res.status;
    const m = res.data.message || res.data.error_description || '未知错误';

    //如果在白名单里则自行catch逻辑处理
    //如果是401则跳转到登录页面
    if (status === 401) {
      return Promise.reject(new Error(m));
    }

    if (status == 403 && m == '无权限') {
      return Promise.reject(new Error(m));
    }
    // 如果请求为非200否者默认统一处理
    if (status !== 200 && res.config.showError !== false) {
      return Promise.reject(new Error(m));
    }

    if (res.data.code > 0 && res.config.showError !== false) {
      return Promise.reject(new Error(m));
    }
    return res.data;
  },
  (error) => {
    return Promise.reject(new Error(error));
  }
);

export default service;
