import {
  _post,
  _upload
} from "../server/request";
// 登录 
  export function tylook(data) {  
    return _post({    
      url:`/mini/api/tianyancha/search`,    
      data  
    })
  }

  export function uploadFile(data){
    return _upload({
        url: `/mini/api/upload/file`,
        data,
      });
}

export function personTree(data){
    return _post({
        url: `/mini/api/dept/person/tree`,
        data,
      });
}
export function deptTree(data){
    return _post({
        url: `/mini/api/dept/tree`,
        data,
      });
}