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
    })
  },
  getNoticeCount(data) {
    return request({
      url: '/leave/count',
      method: 'get',
      data,
    })
  },
  getMenuList(data) {
    return request({
      url: '/menu/list',
      method: 'get',
      data,
    })
  }
}