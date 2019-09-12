module.exports={
    publicPath:'/',
    outputDir:'dist',
    assetsDir:'static',
    indexPath:'index.html',
    filenameHashing: true,
    pages: {
        index: {
          // page 的入口
          entry: 'src/main.js',
          // 模板来源
          template: 'public/index.html',
          // 在 dist 的输出为 index.html
          filename: 'index.html',
          // 当使用 title 选项时，
          // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
          title: '首页',
          // 在这个页面中包含的块，默认情况下会包含
          // 提取出来的通用 chunk 和 vendor chunk。
          chunks: ['chunk-vendors', 'chunk-common', 'index']
        },
    },
    productionSourceMap: false,
    devServer:{
        port:'8080'
    }
}