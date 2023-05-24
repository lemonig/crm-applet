import {
  _post
} from "../server/request";
// 登录 
  export function login(data) {  
    return _post({    
      url:`/mini/api/login`,    
      data  
    })
  }