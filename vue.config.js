const path = require('path')
module.exports = {
  // DEV
  // publicPath:'/VUE/supermall/dist/',
  // PRO
  publicPath:'./',
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'common': '@/common',
        'views': '@/views'
      },
    }
  }
}
