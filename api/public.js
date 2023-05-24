import {
  _post
} from "../server/request";
// 登录 
  export function tylook(data) {  
    return _post({    
      url:`/mini/api/tianyancha/search`,    
      data  
    })
  }