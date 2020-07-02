var path = require("path");
var glob = require('glob');
var port = 80;

function getEntry(globPath) {
  let entries = {}, tmp, htmls = {};

  // 读取src/pages/**/底下所有的html文件
  glob.sync(globPath + 'html').forEach(function (entry) {
    tmp = entry.split('/').splice(-3);
    htmls[tmp[1]] = entry
  })

  // 读取src/pages/**/底下所有的js文件
  glob.sync(globPath + 'js').forEach(function (entry) {
    tmp = entry.split('/').splice(-3);
    entries[tmp[1]] = {
      entry,
      template: htmls[tmp[1]] ? htmls[tmp[1]] : 'index.html', //  当前目录没有有html则以共用的public/index.html作为模板
      filename: 'pages/' + tmp[1] + '.html'   // 以文件夹名称.html作为访问地址
    };
  });
  console.log(entries)
  return entries;
}

let htmls = getEntry('./src/pages/**/*.');

module.exports = {
  pages: htmls,
  publicPath: '/',
  devServer: {
    contentBase: path.join(__dirname, './dist/pages'),
    port,
    index:'./pages/login.html', // 项目启动后默认显示login.html页面
  },
}