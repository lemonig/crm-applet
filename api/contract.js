import { _post } from '../server/request';
// 合同列表
export function pageContract(data) {
  return _post({
    url: `/mini/api/contract/page`,
    data,
  });
}
// 合同详情
export function getContract(data) {
  return _post({
    url: `/mini/api/contract/get`,
    data,
  });
}
// 合同详情
export function contractTypeList(data) {
  return _post({
    url: `/mini/api/contract/type/list`,
    data,
  });
}
export function worklog(data) {
  return _post({
    url: `/mini/api/contract/worklog`,
    data,
  });
}
