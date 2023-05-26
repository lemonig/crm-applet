import {
  _post
} from "../server/request";
const basePath = "undefined";
// 客户分页查询
export function companyInfo(data) {
  return _post({
    url: `/mini/api/organization/page`,
    data,
  });
}
// 客户删除
export function companyDelete(data) {
  return _post({
    url: `/api/organization/delete`,
    data,
  });
}
// 客户更新
export function companyUpdate(data) {
  return _post({
    url: `/mini/api/organization/update`,
    data,
  });
}
// 客户创建
export function companyAdd(data) {
  return _post({
    url: `/mini/api/organization/add`,
    data,
  });
}
// 客户
export function companyDetail(data) {
  return _post({
    url: `/mini/api/organization/get`,
    data,
  });
}
