/**
 * api统一管理
 */
import request from '../utils/request'
export default {
  login(data) {
    console.log(data,'123');
    return request({
      url: '/user/login',
      method: 'post',
      data,
    })
  }
}