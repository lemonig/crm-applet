import { _post, _download } from "@App/server/http";

export function configList(data) {
  return _post({
    url: `/api/fee/config/page`,
    data,
  });
}
export function configAdd(data) {
  return _post({
    url: `/api/fee/config/add`,
    data,
  });
}

export function configUpdate(data) {
  return _post({
    url: `/api/fee/config/update`,
    data,
  });
}
