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

    // 添加合作伙伴 
    export function addpartner(data) {  
        return _post({    
          url:`/mini/api/deal/add/partner`,    
          data  
        })
      }
      // 添加竞争对手 
      export function addcompetitor(data) {  
        return _post({    
          url:`/mini/api/deal/add/competitor`,    
          data  
        })
      }
      // 添加招标代理 
      export function addbiddingAgency(data) {  
        return _post({    
          url:`/mini/api/deal/add/biddingAgency`,    
          data  
        })
      }
      // 删除合作伙伴 
      export function deletepartner(data) {  
        return _post({    
          url:`/mini/api/deal/delete/partner`,    
          data  
        })
      }
      // 删除竞争对手 
      export function deletecompetitor(data) {  
        return _post({    
          url:`/mini/api/deal/delete/competitor`,    
          data  
        })
      }
      // 删除招标代理 
      export function deletebiddingAgency(data) {  
        return _post({    
          url:`/mini/api/deal/delete/biddingAgency`,    
          data  
        })
      }
      // 获取合作伙伴详情 
      export function getpartner(data) {  
        return _post({    
          url:`/mini/api/deal/get/partner`,    
          data  
        })
      }
      // 获取竞争对手详情 
      export function getcompetitor(data) {  
        return _post({    
          url:`/mini/api/deal/get/competitor`,    
          data  
        })
      }
      // 获取招标代理详情 
      export function getbiddingAgency(data) {  
        return _post({    
          url:`/mini/api/deal/get/biddingAgency`,    
          data  
        })
      }
      // 更新合作伙伴 
      export function updatepartner(data) {  
        return _post({    
          url:`/mini/api/deal/update/partner`,    
          data  
        })
      }
      // 更新竞争对手 
      export function updatecompetitor(data) {  
        return _post({    
          url:`/mini/api/deal/update/competitor`,    
          data  
        })
      }
      // 更新招标代理 
      export function updatebiddingAgency(data) {  
        return _post({    
          url:`/mini/api/deal/update/biddingAgency`,    
          data  
        })
      }