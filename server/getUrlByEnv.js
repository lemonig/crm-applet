import url from './url';

function getUrl() {
  return url[wx.getAccountInfoSync().miniProgram.envVersion];
}

module.exports = {
  getUrl,
};
