import { _post, _download } from "@App/server/http";

export function feeList(data) {
  return _post({
    url: `/api/fee/page`,
    data,
  });
}
export function feeListExport(data, title) {
  return _download({
    url: `/api/fee/export`,
    data,
    title,
  });
}

export function feePersonList(data) {
  return _post({
    url: `/api/fee/person/list`,
    data,
  });
}
export function feeListPersonExport(data, title) {
  return _download({
    url: `/api/fee/person/export`,
    data,
    title,
  });
}
