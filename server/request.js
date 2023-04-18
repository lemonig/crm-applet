import {
  baseURL,
  contentType,
  messageName,
  statusName,
  successCode,
} from '../config/index.js'

import {
  isArray
} from './validate.js'
import Notify from '../vant/notify/notify'
import Toast from '../vant/toast/toast'

let loadingInstance = null

// 操作正常Code数组
const codeVerificationArray = isArray(successCode) ?
  [...successCode] :
  [...[successCode]]

const CODE_MESSAGE = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时',
}

const request = ({
  url,
  method,
  params,
  header
}) => {
  //  加载请求拦截器
  //  token
  const token = wx.getStorageSync('token')
  const dataType = wx.getStorageSync('dataType')
  if (token) {
    header['Authorization'] = 'Bearer ' + token
    header['dataType'] = dataType || 0
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      header,
      data: params,
      success({
        data
      }) {
        // 若data.code存在，覆盖默认code
        let code = data && data[statusName] ? data[statusName] : 9999
        if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200
        switch (code) {
          case 200:
            //  请求成功
            return resolve(data)
          default:
            //  请求异常
            if (code === 10004) {
              //  登录失效处理
              wx.redirectTo({
                url: '/pages/login/index'
              })
            }
            const errMsg = `${
              data && data[messageName]
                ? data[messageName]
                : CODE_MESSAGE[code]
                ? CODE_MESSAGE[code]
                : '未知错误'
            }`
            Notify({
              type: 'danger',
              message: errMsg
            });
            return reject(data)
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {}
    })

  })

}
module.exports = {
  request
}