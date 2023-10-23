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
// 微信登录 
  export function wxLogin(data) {  
    return _post({    
      url:`/mini/api/wxLogin`,    
      data  
    })
  }
  export function wxLogOut(data) {  
    return _post({    
      url:`/mini/api/user/logout`,    
      data  
    })
  }
// 微信登录 
  export function getUserInfo(data) {  
    return _post({    
      url:`/mini/api/user/info`,    
      data  
    })
  }
  export function getSMS(data) {  
    return _post({    
      url:`/mini/api/sms/send`,    
      data  
    })
  }
  export function smsLogin(data) {  
    return _post({    
      url:`/mini/api/sms/login`,    
      data  
    })
  }