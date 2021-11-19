/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 16:13:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-08 10:41:47
 */
import App from './App.vue'
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import router from './router/index'
import 'element-plus/dist/index.css'

const app = createApp(App)

import evsComponent from '../packages/index'
console.log('环境变量---->', process.env)

console.log(evsComponent, '-----asdss-')

app
  .use(router)
  .use(ElementPlus)
  .use(evsComponent)
  .mount('#app')
