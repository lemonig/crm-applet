import { _post } from "@App/server/http";
const basePath = "undefined";
// 活动类型创建
export function activeAdd(data) {
  return _post({
    url: `/api/type/activity/add`,
    data,
  });
}
// 活动类型更新
export function activeUpdate(data) {
  return _post({
    url: `/api/type/activity/update`,
    data,
  });
}
// 活动类型列表
export function activeList(data) {
  return _post({
    url: `/api/type/activity/list`,
    data,
  });
}
// 活动类型删除
export function activeDelete(data) {
  return _post({
    url: `/api/type/activity/delete`,
    data,
  });
}
// 活动计划
export function activeCalendar(data) {
  return _post({
    url: `/api/activity/calendar`,
    data,
  });
}
