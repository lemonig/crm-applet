/**
 * @description 项目基础配置信息
 */
const network = require('./net.config')
const setting = require('./setting.config')
module.exports = {
  ...network,
  ...setting
}
