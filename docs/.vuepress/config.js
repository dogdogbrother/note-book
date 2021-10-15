const webConfig = require('./config/webConfig')
const nav = require('./config/navConfig')
const sidebar = require('./config/sidebarConfig')
module.exports = {
  ...webConfig,
  themeConfig: {
    logo: '/img/home.jpg',
    nav,
    sidebar,
    lastUpdated: '最后更新时间',
    lastUpdated: true,
    repo: 'https://github.com/dogdogbrother/note-book',
    repoLabel: 'Github',
  },
  markdown: {
    lineNumbers: true
  },
  dest: 'dist',
  theme: 'yuu',
}