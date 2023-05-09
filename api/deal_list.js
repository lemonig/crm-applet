import {
    request,
    _post
} from "../server/request";

// 商机分页查询
export function dealPage(data) {
  return _post({
    url: `/api/deal/page`,
    data,
  });
}
// 商机单个获取
export function dealSingleGet(data) {
  return _post({
    url: `/api/deal/get`,
    data,
  });
}
// 商机活动获取
export function dealList(data) {
  return _post({
    url: `/api/deal/activity/list`,
    data,
  });
}
// 商机添加
export function dealadd(data) {
  return _post({
    url: `/api/deal/add`,
    data,
  });
}
// 商机更新
export function dealUpdate(data) {
  return _post({
    url: `/api/deal/update`,
    data,
  });
}
// 商机编号自动获取
export function dealCodeGet(data) {
  return _post({
    url: `/api/deal/code/get`,
    data,
  });
}
// 商机漏斗
export function dealChart(data) {
  return _post({
    url: `/api/deal/chart`,
    data,
  });
}
// 商机导出
export function dealExport(data, title) {
  return _download({
    url: `/api/deal/export`,
    data,
    title,
  });
}

// 终止
export function dealterminate(data) {
  return _post({
    url: `/api/deal/action/terminate`,
    data,
  });
}
// 丢单
export function deallose(data) {
  return _post({
    url: `/api/deal/action/lose`,
    data,
  });
}
// 赢单
export function dealwin(data) {
  return _post({
    url: `/api/deal/action/win`,
    data,
  });
}
// 转移
export function dealtransfer(data) {
  return _post({
    url: `/api/deal/action/transfer`,
    data,
  });
}
// 批准完成
export function approveOperate(data) {
  return _post({
    url: `/api/deal/approve/operate`,
    data,
  });
}

// 审批分页获取
export function approvalPage(data) {
  return _post({
    url: `/api/deal/approve/page`,
    data,
  });
}
// 审批导出
export function approvalexport(data, title) {
  return _download({
    url: `/api/deal/approve/export`,
    data,
    title,
  });
}
// 审批漏斗
export function dealFunnel(data, title) {
  return _post({
    url: `/api/deal/funnel`,
    data,
  });
}

// 变更日志
export function dealLogs(data) {
  return _post({
    url: `/api/deal/history/page`,
    data,
  });
}
