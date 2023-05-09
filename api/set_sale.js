import { _post } from "@App/server/http";
const basePath = "undefined";

// 流程列表
export function saleList(data) {
  return _post({
    url: `/api/pipeline/list`,
    data,
  });
}
// 流程更新
export function saleUpdate(data) {
  return _post({
    url: `/api/pipeline/update`,
    data,
  });
}

// 流程删除
export function saleDelete(data) {
  return _post({
    url: `/api/pipeline/delete`,
    data,
  });
}

// 流程创建
export function saleAdd(data) {
  return _post({
    url: `/api/pipeline/add`,
    data,
  });
}
// 流程阶段创建
export function saleaStageAdd(data) {
  return _post({
    url: `/api/pipeline/stage/add`,
    data,
  });
}
// 流程阶段列表
export function saleStageList(data) {
  return _post({
    url: `/api/pipeline/stage/list`,
    data,
  });
}
// 流程阶段更新
export function saleStageUpdate(data) {
  return _post({
    url: `/api/pipeline/stage/update`,
    data,
  });
}
// 流程阶段删除
export function saleStageDelete(data) {
  return _post({
    url: `/api/pipeline/stage/delete`,
    data,
  });
}
