const WXLogger = require('./wxLogger.js');
    const Monitor = WXLogger.init({
        pid: 'e2247z4cy8@15e3568dc85a18e',
        region: 'cn',    // 指定应用部署的地域：中国设为cn，海外地区靠近新加坡的设为sg。
        environment:wx.getAccountInfoSync().miniProgram.envVersion
    });
    export default Monitor;