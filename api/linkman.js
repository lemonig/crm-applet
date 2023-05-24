import {
  _post
} from "../server/request";
// 客户联系人创建
export function linkmanAdd(data) {
  return _post({
    url: `/mini/api/person/add`,
    data,
  });
}
// 客户联系人更新
export function linkmanUpdate(data) {
  return _post({
    url: `/mini/api/person/update`,
    data,
  });
}
// 客户联系人分页查询
export function linkmanInfo(data) {
  return _post({
    url: `/mini/api/person/page`,
    data,
  });
}
// 客户联系人分页查询
export function linkmanDetail(data) {
  return _post({
    url: `/mini/api/person/detail`,
    data,
  });
}
// 客户联系人删除
export function linkmanDelete(data) {
  return _post({
    url: `/api/person/delete`,
    data,
  });
}
//商机人员查询
export function linkmanList(data) {
  return _post({
    url: `/api/deal/person/list`,
    data,
  });
}
