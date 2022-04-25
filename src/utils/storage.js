/**
 * storage二次封装
 */
import config from '../config'
export default {
  getStorage() {
    return JSON.parse(localStorage.getItem(config.namespace) || "{}")  //获取当前模块存储的值
  },
  setItem(key,val) {
    let storage = this.getStorage()
    storage[key] = val
    localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  getItem(key) {
    return this.getStorage()[key]
  },
  clearItem(key) {
    let storage = this.getStorage()
    delete storage[key]
    localStorage.setItem(config.namespace,JSON.stringify(storage))
  },
  clearAll() {
    return localStorage.clear()
  }
}