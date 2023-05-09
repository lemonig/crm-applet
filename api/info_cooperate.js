import { _post } from "@App/server/http";

const basePath = "undefined";
// 合作伙伴删除
export function cooperateDelete(data) {
  return _post({
    url: `/api/partner/delete`,
    data,
  });
}
// 合作伙伴创建
export function cooperateAdd(data) {
  return _post({
    url: `/api/partner/add`,
    data,
  });
}
// 合作伙伴分页查询
export function cooperateInfo(data) {
  return _post({
    url: `/api/partner/page`,
    data,
  });
}
// 合作伙伴更新
export function cooperateUpdate(data) {
  return _post({
    url: `api/partner/update`,
    data,
  });
}

// 合作伙伴联系人删除
export function cooperatePersonDelete(data) {
  return _post({
    url: `api/partner/person/delete`,
    data,
  });
}
// 合作伙伴联系人创建
export function cooperatePersonAdd(data) {
  return _post({
    url: `/api/partner/person/add`,
    data,
  });
}
// 合作伙伴联系人分页查询
export function cooperatePersonInfo(data) {
  return _post({
    url: `api/partner/person/page`,
    data,
  });
}
// 合作伙伴联系人更新
export function cooperatePersonUpdate(data) {
  return _post({
    url: `/api/partner/person/update`,
    data,
  });
}
