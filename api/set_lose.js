import { _post } from "@App/server/http";
const basePath = "undefined";
// 丢单原因列表
export function loseList(data) {
  return _post({
    url: `/api/type/lostReason/list`,
    data,
  });
}
// 丢单原因更新
export function loseUpdate(data) {
  return _post({
    url: `/api/type/lostReason/update`,
    data,
  });
}
// 丢单原因删除
export function loseDelete(data) {
  return _post({
    url: `/api/type/lostReason/delete`,
    data,
  });
}
// 丢单原因创建
export function loseAdd(data) {
  return _post({
    url: `/api/type/lostReason/add`,
    data,
  });
}
