import {
    _post,
    _upload
  } from "../server/request";
  // 任务
    export function activity(data) {  
      return _post({    
        url:`/mini/api/jump/activity/page`,    
        data  
      })
    }
  //商机
    export function deal(data){
      return _post({
          url: `/mini/api/jump/deal/page`,
          data,
        });
  }
  //合同列表

  export function contract(data){
      return _post({
          url: `/mini/api/jump/contract/page`,
          data,
        });
  }
