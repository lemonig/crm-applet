import {
  _post
} from "../server/request";
const basePath = "undefined";
// 我的销售统计
export function saleCount(data) {
  return _post({
    url: `/mini/api/index/saleCount`,
    data,
  });
}
// 仪表盘
export function dashboard(data) {
  return _post({
    url: `/mini/api/index/dashboard`,
    data,
  });
}

export function taskInfo(data) {
  return _post({
    url: `/mini/api/index/infoCount`,
    data,
  });
}
