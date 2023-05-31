import {
  _post
} from "../server/request";
  const basePath='undefined'
  // 合同列表 
  export function pagecContract(data) {  
    return _post({    
      url:`/mini/api/contract/page`,    
      data  
    })
  }
  // 合同详情 
  export function getContract(data) {  
    return _post({    
      url:`/mini/api/contract/get`,    
      data  
    })
  }