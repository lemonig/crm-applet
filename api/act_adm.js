import {
    request
} from "../server/request";

// 活动删除
export function actDelete(data) {
    return request({
        url: `/api/activity/delete`,
        method: "post",
        data,
    });
}
// 活动计划导出
export function actExport(data, title) {
    return request({
        url: `/api/activity/export`,
        method: "post",
        data,
        title,
    });
}
// 活动创建
export function actAdd(data) {
    return request({
        url: `/api/activity/add`,
        method: "post",
        data,
    });
}
// 活动修改
export function actUpdate(data) {
    return request({
        url: `/api/activity/update`,
        method: "post",
        data,
    });
}
// 活动分页查询
export function actPage(data) {
    return request({
        url: `/api/activity/page`,
        method: "post",
        data,
    });
}