import { _post } from "@App/server/http";
const basePath = "undefined";
// 招标代理更新
export function agentUpdate(data) {
  return _post({
    url: `/api/biddingAgency/update`,
    data,
  });
}
// 招标代理创建
export function agentAdd(data) {
  return _post({
    url: `/api/biddingAgency/add`,
    data,
  });
}
// 招标代理删除
export function agentDelete(data) {
  return _post({
    url: `/api/biddingAgency/delete`,
    data,
  });
}
// 招标代理分页查询
export function agentInfo(data) {
  return _post({
    url: `/api/biddingAgency/page`,
    data,
  });
}

// 合作伙伴联系人删除
export function agentPersonDelete(data) {
  return _post({
    url: `api/biddingAgency/person/delete`,
    data,
  });
}
// 合作伙伴联系人创建
export function agentPersonAdd(data) {
  return _post({
    url: `api/biddingAgency/person/add`,
    data,
  });
}
// 合作伙伴联系人分页查询
export function agentPersonInfo(data) {
  return _post({
    url: `api/biddingAgency/person/page`,
    data,
  });
}
// 合作伙伴联系人更新
export function agentPersonUpdate(data) {
  return _post({
    url: `api/biddingAgency/person/update`,
    data,
  });
}
