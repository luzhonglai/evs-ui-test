/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 16:13:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-13 00:16:34
 */
import App from './App.vue'
import { createApp } from 'vue'
import { setElement } from './element'
const app = createApp(App)

import evsComponent from '../packages/index'
console.log('环境变量---->', process.env)

setElement(app)
console.log(evsComponent, '-----asdss-')

app.use(evsComponent).mount('#app')
