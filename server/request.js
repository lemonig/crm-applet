import { contentType, messageName, statusName, successCode } from '../config/index.js';
import {getUrl} from './getUrlByEnv'
import { isArray } from '../utils/validate.js';
 const baseURL = getUrl();
//  const baseURL = 'https://wx.greandata1.com/test';

let loadingInstance = null;

// 操作正常Code数组
const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]];

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
};

const request = ({ url, method, data, header }) => {
    const startTime = new Date().getTime();
  //  加载请求拦截器
  //  token
  const token = wx.getStorageSync('token');
  const dataType = wx.getStorageSync('dataType');
  if (token) {
    header['token'] = token;
    header['dataType'] = dataType || 0;
  }
  wx.showLoading({
    title: '请稍等...',
    mask: true,
  });
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseURL + url,
      method,
      header,
      data,
      timeout: 30000,
      // enableHttp2:true,
      success({ data }) {
        reportApiMonitorSuccess(url, data.code,startTime,data.message);
        wx.hideLoading();
        // 若data.code存在，覆盖默认code
        let code = data && data[statusName] ? data[statusName] : 9999;
        if (codeVerificationArray.indexOf(data[statusName]) + 1) code = 200;
        switch (code) {
          case 200:
            //  请求成功
            resolve(data);
            break;

          case 401:
            wx.redirectTo({
              url: '/pages/login/index',
            });
            break;

          default:
            //  请求异常
            if (code === 10004) {
              //  登录失效处理
              wx.redirectTo({
                url: '/pages/login/index',
              });
            }
            const errMsg = `${
              data && data[messageName]
                ? data[messageName]
                : CODE_MESSAGE[code]
                ? CODE_MESSAGE[code]
                : '未知错误'
            }`;
            wx.showToast({
              title: errMsg,
              icon: 'error',
              duration: 2000,
            });
            return resolve(data);
        }
      },
      fail: function (err) {
        reportApiMonitorFail(url,500 ,startTime, err);
        wx.hideLoading();

        // wx.showToast({
        //   title: err.message,
        //   icon: 'error',
        //   duration: 2000,
        // });
        reject(err);
      },
      complete() {
        wx.hideLoading();

      },
    });
  });
};

const _post = async ({
  url,
  data,
  header = {
    'content-type': 'application/json',
  },
}) => {
  let res = await request({
    // 'content-type': 'application/x-www-form-urlencoded'
    url,
    data,
    header,
    method: 'POST',
  });
  return res;
};
const _get = async ({
  url,
  data,
  header = {
    'content-type': 'application/json',
  },
}) => {
  let res = await request({
    // 'content-type': 'application/x-www-form-urlencoded'
    url,
    data,
    header,
    method: 'GET',
  });
  return res;
};

const _upload = async ({
    url,
    data,
    
  }) => {
      return new Promise((rso,rej)=>{
        wx.uploadFile({
            url: baseURL + url, 
            filePath: data,
            name: 'file',
            header:{
                token:wx.getStorageSync('token')
            },
            success: function (uploadRes) {
                let obj = JSON.parse(uploadRes.data)
              rso(obj)
            },
            fail: function (uploadError) {
              rej(uploadError)
            },
          });
      })
   
  };



// 在接口请求成功时上报接口监控数据
function reportApiMonitorSuccess(url, code,startTime,msg) {
    if(code == 200){
      code = 0
    }
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    console.log('request time--',duration)
    wx.reportEvent('wxdata_perf_monitor', {
        "wxdata_perf_monitor_id": url,
        "wxdata_perf_monitor_level": 0,
        "wxdata_perf_error_code": code,
        "wxdata_perf_error_msg": msg,
        "wxdata_perf_cost_time": duration,
        "wxdata_perf_extra_info1": "",
        "wxdata_perf_extra_info2": "",
        "wxdata_perf_extra_info3": "",

    });
  }
  
  // 在接口请求失败时上报接口监控数据
  function reportApiMonitorFail(url, code,startTime, error) {
    const endTime = new Date().getTime();
    const duration = endTime - startTime;
    wx.reportEvent('wxdata_perf_monitor', {
      url: url,             
      status: 'fail',     
      duration: duration, 
      error: error     
    });
  }
  

  

module.exports = {
  request,
  _post,
  _get,
  _upload,
  baseURL:baseURL
};
