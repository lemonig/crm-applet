import { _post } from "@App/server/http";
const basePath = "undefined";
// 专家分页查询
export function expertInfo(data) {
  return _post({
    url: `/api/expert/page`,
    data,
  });
}
// 专家更新
export function expertUpdate(data) {
  return _post({
    url: `/api/expert/update`,
    data,
  });
}
// 专家删除
export function expertDelete(data) {
  return _post({
    url: `/api/expert/delete`,
    data,
  });
}
// 专家创建
export function expertAdd(data) {
  return _post({
    url: `/api/expert/add`,
    data,
  });
}
