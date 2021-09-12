/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 16:13:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-09-13 00:21:04
 */

const path = require('path')

const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  productionSourceMap: false,

  pages: {
    index: {
      entry: 'demo/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },

  lintOnSave: true,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: false,
    },
  },
  css: { extract: false },
  chainWebpack: config => {
    config.resolve.alias.set('~', resolve('demo'))
    config.resolve.alias.set('@', resolve('packages'))
    config.module
      .rule('eslint')
      .exclude.add(resolve('lib'))
      .end()
      .exclude.add(resolve('demo'))
      .end()
    // packages和examples目录需要加入编译
    config.module
      .rule('js')
      .include.add(resolve('packages'))
      .end()
      .include.add(resolve('demo'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  },
}
