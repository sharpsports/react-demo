var internalId = document.currentScript.getAttribute('internalid');
var publicKey = document.currentScript.getAttribute('publickey');
var extensionAuthToken = document.currentScript.getAttribute('extensionauthtoken');

let userAgent = navigator.userAgent;
let dummyExtensionVersion = ''

if (userAgent.includes('Firefox')){
  dummyExtensionVersion = 'firefox_none';
} else if (userAgent.includes('Safari')) {
  dummyExtensionVersion = 'safari_none';
} else if (userAgent.includes('Chrome')){
  dummyExtensionVersion = 'chrome_none';
} else {
  dummyExtensionVersion = 'unknown_none';
}

sessionStorage.setItem("sharpSportsExtensionVersion", dummyExtensionVersion);


document.addEventListener('sharpSportsExtensionReady',(message) => {
  document.dispatchEvent(new CustomEvent('initSharpSportsExtension', { 
    detail: {
      'internalId': internalId,
      'publicKey': publicKey,
      'extensionAuthToken': extensionAuthToken
    } 
  }));
});


