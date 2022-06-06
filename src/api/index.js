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
  userSubmit(data) {
    return request({
      url: '/users/operate',
      method: 'post',
      data,
      mock: false
    })
  },
  menuSubmit(data) {
    return request({
      url: '/menu/operate',
      method: 'post',
      data,
      mock: true
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
  },
  getUserList(data) {
    return request({
      url: '/users/list',
      method: 'get',
      data,
      mock: false,
    })
  },
  getRoleList(data) {
    return request({
      url: '/roles/allList',
      method: 'get',
      data,
      mock: true,
    })
  },
  getDeptList(data) {
    return request({
      url: '/dept/list',
      method: 'get',
      data,
      mock: true,
    })
  },
  userDel(data) {
    return request({
      url: '/users/detele',
      method: 'post',
      data,
      mock: true,
    })
  },
}