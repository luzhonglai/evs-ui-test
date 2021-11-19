/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 15:33:04
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-04 10:38:01
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const constantRouterMap = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/hello.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRouterMap as RouteRecordRaw[],
})

export { constantRouterMap }
export default router
