import { _post } from "@App/server/http";
const basePath = "undefined";
// 客户联系人创建
export function customerAdd(data) {
  return _post({
    url: `/api/person/add`,
    data,
  });
}
// 客户联系人更新
export function customerUpdate(data) {
  return _post({
    url: `/api/person/update`,
    data,
  });
}
// 客户联系人分页查询
export function customerInfo(data) {
  return _post({
    url: `/api/person/page`,
    data,
  });
}
// 客户联系人删除
export function customerDelete(data) {
  return _post({
    url: `/api/person/delete`,
    data,
  });
}
//商机人员查询
export function customerList(data) {
  return _post({
    url: `/api/deal/person/list`,
    data,
  });
}
