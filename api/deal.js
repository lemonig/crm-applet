import { _post } from '../server/request';

// 商机添加
export function addDeal(data) {
  return _post({
    url: `/mini/api/deal/add`,
    data,
  });
}
export function updateDeal(data) {
  return _post({
    url: `/mini/api/deal/update`,
    data,
  });
}
// 商机客户
export function organizationSearch(data) {
  return _post({
    url: `/mini/api/organization/search`,
    data,
  });
}

// 商机详情
export function detailDeal(data) {
  return _post({
    url: `/mini/api/deal/get`,
    data,
  });
}


export function pageDeal(data) {
  return _post({
    url: `/mini/api/deal/page`,
    data,
  });
}
// 产品列表
export function listProduct(data) {
  return _post({
    url: `/mini/api/product/list`,
    data,
  });
}
// 招标代理列表
export function listAgent(data) {
  return _post({
    url: `/mini/api/biddingAgency/list`,
    data,
  });
}
// 合作伙伴列表
export function listPartner(data) {
  return _post({
    url: `/mini/api/partner/list`,
    data,
  });
}
export function dealAct(data) {
  return _post({
    url: `/mini/api/deal/act`,
    data,
  });
}
// 竞争对手列表
export function listCompetitor(data) {
  return _post({
    url: `/mini/api/competitor/list`,
    data,
  });
}
// 销售流程列表
export function listPipelineStage(data) {
  return _post({
    url: `/mini/api/pipeline/stage/list`,
    data,
  });
}
// 销售流程列表
export function listPipelineStagePlus(data) {
  return _post({
    url: `/mini/api/pipeline/stage/plus`,
    data,
  });
}

  // 活动类型列表 
  export function activityList(data) {  
    return _post({    
      url:`/mini/api/type/activity/list`,    
      data  
    })
  }
  // 终止原因列表 
  export function terminationReasonList(data) {  
    return _post({    
      url:`/mini/api/type/terminationReason/list`,    
      data  
    })
  }
  // 丢单原因列表 
  export function lostReasonList(data) {  
    return _post({    
      url:`/mini/api/type/lostReason/list`,    
      data  
    })
  }