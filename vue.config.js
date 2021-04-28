/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-26 15:04:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-27 09:46:58
 */

const path = require('path')

module.exports = {
  // 修改默认的入口
  pages: {
    index: {
      entry: 'src/main.js',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },
  chainWebpack: (config) => {
    // vue默认@指向src目录，这里要修正为examples，另外新增一个~指向packages
    config.resolve.alias.set('~', path.resolve('src'))
    // lib目录是组件库最终打包好存放的地方，不需要eslint检查
    // src/docs是存放md文档的地方，也不需要eslint检查
    config.module
      .rule('eslint')
      .exclude.add(path.resolve('lib'))
      .end()
      .exclude.add(path.resolve('src/docs'))
      .end()
    // packages和examples目录需要加入编译
    config.module
      .rule('js')
      .include.add(/src/)
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap((options) => {
        // 修改它的选项...
        return options
      })
  },
}
