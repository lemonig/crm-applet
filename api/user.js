import { _post } from "@App/server/http";
// 用户
export function userInfo(data) {
  return _post({
    url: `/api/user/owner`,
    data,
  });
}
// 菜单
export function menuInfo(data) {
  return _post({
    url: `/api/user/menu/list`,
    data,
  });
}

// 单点登录
export function getSsoAuthUrl(data) {
  return _post({
    url: `api/sso/getSsoAuthUrl`,
    data,
  });
}
export function doLoginByTicket(data) {
  return _post({
    url: `api/sso/doLoginByTicket`,
    data,
  });
}

//  登录 当前用户信息
export function owner(params) {
  return _post({
    url: "/api/user/owner",
    data: params,
  });
}
export function logout(params) {
  return _post({
    url: "/api/sso/logout",
    data: params,
  });
}
