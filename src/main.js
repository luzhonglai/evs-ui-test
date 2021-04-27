/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-25 17:53:08
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-27 10:53:36
 */

import SearchArea from './components/SearchArea/index.vue'
import Export from './components/Export/index.vue'
import EvsTablePage from './components/EvsTablePage/index.vue'
import EvsSearchArea from './components/EvsSearchArea/index.vue'
import EvsModel from './components/EvsModel/index.vue'

const components = {
  SearchArea,
  EvsTablePage,
  EvsSearchArea,
  Export,
  EvsModel,
}

const install = function(Vue) {
  if (install.installed) return
  // components.map(component => Vkeymponent(component.name, component))
  Object.keys(components).forEach((key) => {
    Vue.component(components[key].name, components[key])
  })
}

export default {
  install,
  ...components,
}

export { SearchArea, EvsTablePage, EvsSearchArea, Export, EvsModel }
