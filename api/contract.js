// 商机
import { _post, _download } from "@App/server/http";
// 商机活动获取
export function contractPage(data) {
  return _post({
    url: `/api/contract/page`,
    data,
  });
}
