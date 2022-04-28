import { createRouter, createWebHashHistory } from "vue-router"; 
const routes = [
  {
    name: 'home',
    path: '/',
    component: ()=> import ('../components/Home.vue'),
    meta: {
      title: '首页'
    },
    redirect: '/welcome',
    children: [
      {
        name: 'welcome',
        path: '/welcome',
        component: ()=> import ('../views/Welcome.vue'),
        meta: {
          title: '欢迎页'
        },
      },
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: ()=> import ('../views/Login.vue'),
    meta: {
      title: '登录页'
    },
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})
export default router