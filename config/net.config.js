/**
 * @description 导出网络配置
 **/
//  https://frpc-2.01oak.com/
//  https://wx-mini.greandata1.com/
module.exports = {
  //  接口请求地址
  baseURL: 'https://wx-mini.greandata1.com/',
  // 配后端数据的接收方式application/json;charset=UTF-8 或 application/x-www-form-urlencoded;charset=UTF-8
  contentType: 'application/json;charset=UTF-8',
  // 操作正常code，支持String、Array、int多种类型
  successCode: [10000,  '10000'],
  // 数据状态的字段名称
  statusName: 'code',
  // 状态信息的字段名称
  messageName: 'msg',
}
