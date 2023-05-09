import { _post } from "@App/server/http";
// 天眼查
export function tianyancha(data) {
  return _post({
    url: `/api/tianyancha/search`,
    data,
  });
}
export function dictList(data) {
  return _post({
    url: `/api/data/dict/list `,
    data,
  });
}
