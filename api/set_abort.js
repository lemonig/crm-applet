import { _post } from "@App/server/http";
const basePath = "undefined";
// 终止原因列表
export function abortList(data) {
  return _post({
    url: `/api/type/terminationReason/list`,
    data,
  });
}
// 终止原因创建
export function abortAdd(data) {
  return _post({
    url: `/api/type/terminationReason/add`,
    data,
  });
}
// 终止原因删除
export function abortDelete(data) {
  return _post({
    url: `/api/type/terminationReason/delete`,
    data,
  });
}
// 终止原因更新
export function abortUpdate(data) {
  return _post({
    url: `/api/type/terminationReason/update`,
    data,
  });
}
