/**
 * api统一管理
 */
import request from '../utils/request'
export default {
  login(data) {
    return request({
      url: '/users/login',
      method: 'post',
      data,
      mock: false
    })
  },
  getNoticeCount(data) {
    return request({
      url: '/leave/count',
      method: 'get',
      data,
      mock: true,
    })
  },
  getMenuList(data) {
    return request({
      url: '/menu/list',
      method: 'get',
      data,
      mock: true,
    })
  }
}