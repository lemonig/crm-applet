import { _post } from "@App/server/http";
const basePath = "undefined";
// 部门删除
export function deptDelete(data) {
  return _post({
    url: `/api/dept/delete`,
    data,
  });
}
// 部门添加
export function deptAdd(data) {
  return _post({
    url: `/api/dept/add`,
    data,
  });
}
// 部门列表
export function deptList(data) {
  return _post({
    url: `/api/dept/list`,
    data,
  });
}
// 部门修改
export function deptUpdate(data) {
  return _post({
    url: `/api/dept/update`,
    method: "post",
    data,
  });
}
