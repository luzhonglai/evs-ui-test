/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 16:13:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-13 00:15:35
 */
import SearchArea from './SearchArea'
import Export from './Export'
import EvsTablePage from './EvsTablePage'
import EvsSearchArea from './EvsSearchArea'
import EvsSvgIcon from './EvsSvgIcon'

import { version } from '../package.json'
// import EvsModel from './EvsModel/index.vue'
import EvsTablePlus from './EvsTablePlus'
// import EvsMenu from './EvsMenu'

const components = {
  SearchArea,
  EvsSvgIcon,
  EvsTablePage,
  EvsSearchArea,
  Export,
  //编译失败组件问题
  // EvsModel,
  EvsTablePlus,
  // EvsMenu
}

const install = function(Vue) {
  if (install.installed) return
  // components.map(component => Vkeymponent(component.name, component))
  Object.keys(components).forEach(key => {
    Vue.component(components[key].name, components[key])
  })
}

export default {
  install,
  version,
}

export { SearchArea, EvsSvgIcon, EvsTablePage, EvsSearchArea, EvsTablePlus }
