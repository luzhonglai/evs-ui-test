/* eslint-disable @typescript-eslint/camelcase */
/*
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-09-08 16:13:47
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-04 10:37:51
 */

const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const resolve = dir => {
  return path.join(__dirname, dir)
}

module.exports = {
  pages: {
    index: {
      entry: 'demo/main.ts',
      template: 'public/index.html',
      filename: 'index.html',
    },
  },

  lintOnSave: true,
  productionSourceMap: false,
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: false,
    },
  },

  css: { extract: true },
  chainWebpack: config => {
    config.resolve.alias.set('~', resolve('demo'))
    config.resolve.alias.set('@', resolve('packages'))
    config.module
      .rule('eslint')
      .exclude.add(resolve('lib'))
      .end()
      .exclude.add(resolve('demo'))
      .end()
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
      .end()
    config.plugin('TerserPlugin').use(
      new TerserPlugin({
        extractComments: false, // 是否将注释提取到一个单独的文件中
        terserOptions: {
          warnings: false, // 打包提示
          compress: {
            drop_debugger: true, // 注视点console
            drop_console: true,
            pure_funcs: ['console.log'], // 去除console
          },
        },
        cache: true,
        sourceMap: false,
        parallel: false,
      }),
    )
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto',
        },
      ],
    },
  },
}
