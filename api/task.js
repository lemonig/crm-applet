import { _post } from '../server/request';
// 任务添加
export function addTask(data) {
  return _post({
    url: `/mini/api/activity/add`,
    data,
  });
}
export function listTask(data) {
  return _post({
    url: `/mini/api/activity/page`,
    data,
  });
}
// 任务更新
export function updateTask(data) {
  return _post({
    url: `/mini/api/activity/update`,
    data,
  });
}
// 任务详情
export function detailTask(data) {
  return _post({
    url: `/mini/api/activity/get`,
    data,
  });
}
// 商机快速查询
export function searchDeal(data) {
  return _post({
    url: `/mini/api/deal/search`,
    data,
  });
}
// 商机快速查询
export function activityList(data) {
  return _post({
    url: `/mini/api/type/activity/list`,
    data,
  });
}
// 商机删除
export function activityDelte(data) {
  return _post({
    url: `/mini/api/activity/delete`,
    data,
  });
}
// 联系人
export function activityPerson(data) {
  return _post({
    url: `/mini/api/activity/person/list`,
    data,
  });
}
