window.btoa = window.btoa || $.base64.encode;
export default {
  // to check android or ios
  isAndroid() {
    return navigator.userAgent.match(/Android/i);
  },
  isIOS() {
    return navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i);
  },
  
 // for logging 
  ravenLogging(exceptionFrom,level,logger) {
    Raven.captureException(exceptionFrom, {
      level: level,
      logger: logger
    });
  },
  


};
