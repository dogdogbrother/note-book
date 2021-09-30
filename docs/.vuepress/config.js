const webConfig = require('./config/webConfig')
const nav = require('./config/navConfig')
const sidebar = require('./config/sidebarConfig')
module.exports = {
  ...webConfig,
  themeConfig: {
    logo: '/img/home.jpg',
    nav,
    sidebar,
  }
}