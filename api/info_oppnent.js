import { _post } from "@App/server/http";
const basePath = "undefined";
// 竞争对手创建
export function oppnentAdd(data) {
  return _post({
    url: `/api/competitor/add`,

    data,
  });
}
// 竞争对手更新
export function oppnentUpdate(data) {
  return _post({
    url: `/api/competitor/update`,

    data,
  });
}
// 竞争对手删除
export function oppnentDelete(data) {
  return _post({
    url: `/api/competitor/delete`,

    data,
  });
}
// 竞争对手分页查询
export function oppnentInfo(data) {
  return _post({
    url: `/api/competitor/page`,

    data,
  });
}
