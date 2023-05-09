import { _post } from "@App/server/http";
const basePath = "undefined";

// 角色列表
export function rolelist(data) {
  return _post({
    url: `/api/role/list`,
    data,
  });
}

// 用户列表
export function userList(data) {
  return _post({
    url: `/api/user/page`,
    data,
  });
}
// 用户更新
export function userUpdate(data) {
  return _post({
    url: `/api/user/update`,
    data,
  });
}

// 用户删除
export function userDelete(data) {
  return _post({
    url: `/api/user/delete`,
    data,
  });
}

// 用户创建
export function userAdd(data) {
  return _post({
    url: `/api/user/add`,
    data,
  });
}

// 用户禁用
export function userDisable(data) {
  return _post({
    url: `/api/user/status/disable`,
    data,
  });
}
// 用户启用
export function userEnable(data) {
  return _post({
    url: `/api/user/status/enable`,
    data,
  });
}

// 用户搜索
export function userSearch(data) {
  return _post({
    url: `/api/user/search`,
    data,
  });
}
// 销售人员
export function salesmanList(data) {
  return _post({
    url: `/api/user/salesman/list`,
    data,
  });
}
// 销售人员 按年份
export function salesmanByYear(data) {
  return _post({
    url: `/api/user/salesman/all`,
    data,
  });
}
