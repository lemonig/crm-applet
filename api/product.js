import { _post } from "@App/server/http";
const basePath = "undefined";
// 产品分页查询
export function productList(data) {
  return _post({
    url: `/api/product/page`,
    data,
  });
}
// 产品更新
export function productUpdate(data) {
  return _post({
    url: `/api/product/update`,
    data,
  });
}
// 产品删除
export function productDelete(data) {
  return _post({
    url: `/api/product/delete`,
    data,
  });
}
// 产品创建
export function productAdd(data) {
  return _post({
    url: `/api/product/add`,
    data,
  });
}
// 产品创建
export function productTypeList(data) {
  return _post({
    url: `/api/type/product/list`,
    data,
  });
}
