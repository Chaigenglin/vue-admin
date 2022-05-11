/**
 * axios封装
 */
import axios from "axios";
import config from "../config";
import router from "../router";
import storage from "./storage";
import { ElMessage } from "element-plus";

const TOKEN_INVALID = 'TOKEN失效，请重新登录'
const NETWORK_ERROR = '网络异常，请稍后再试'
//创建axios实例对象 添加全局配置
const service = axios.create({
  baseURL: config.baseApi,
  timeout: 8000
})
// 请求拦截
service.interceptors.request.use(req=>{

  //TO-DO
  const hearders = req.headers
  const {token} = storage.getItem('userInfo')
  if(!hearders.Authorization) hearders.Authorization = 'Bearer ' + token
  return req
})

// 响应拦截
service.interceptors.response.use(res=> {
  const {code, data, msg} = res.data
  // console.log(res,'code');
  if(code == 200) {
    return data
  }else if(code === 500001) { //登录失效
    setTimeout(()=> {
      ElMessage.error(TOKEN_INVALID)
    },1500)
    router.push('/login')
    return Promise.reject(TOKEN_INVALID)
  }else {
    ElMessage.error(msg || NETWORK_ERROR)
    return Promise.reject(msg || NETWORK_ERROR)
  }
})

/**
 * 请求核心配置
 * @options 请求参数配置
 */

function request(options) {
  options.method = options.method || 'get'  //默认get请求
  if(options.method.toLowerCase() === 'get') {
    options.params = options.data
  }
  let isMock = config.mock;
  if (typeof options.mock != 'undefined') {
      isMock = options.mock;
  }
  //以防万一
  if(config.env === 'prod') {
    service.defaults.baseURL = config.baseApi
  }else {
    service.defaults.baseURL = isMock ? config.mockApi : config.baseApi
  }
  return service(options)
}

//对象方法
['get', 'post', 'put', 'delete', 'patch'].forEach(item=> {
  request[item] = (url,data,options)=> {
    return request({
      url,
      data,
      method: item,
      ...options
    })
  }
})

export default request