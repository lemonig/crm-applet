import { _post, _downloadPdf } from "@App/server/http";
const basePath = "undefined";
// 工作报告分页查询
export function workreportPage(data) {
  return _post({
    url: `/api/workreport/page`,
    data,
  });
}
// 工作报告细节查询
export function workreportDetail(data) {
  return _post({
    url: `/api/workreport/detail`,
    data,
  });
}
// 工作报告添加

export function workreportAdd(data) {
  return _post({
    url: `/api/workreport/add`,
    data,
  });
}
export function workreportExport(data, title) {
  return _downloadPdf({
    url: `/api/workreport/export`,
    data,
    title,
  });
}
