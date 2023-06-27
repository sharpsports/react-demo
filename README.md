# Demo React app for SharpSports Integration



## Getting started

 
### Installation `npm install`


This will install all necessary node dependencies. You need to have node and npm installed on your machine.

### Run `npm start`

You can now view the demo at http://localhost:3000


## Environment Variables

  
Update a `.env` file in the root directory to set environment variables. You must re-run `npm start` in order to reload env vars

**Required Variables**

- REACT_APP_API_BASE: API base url for connection with SharpSports API (e.g. https://api.sharpsports.io, http://localhost:8000)
- REACT_APP_UI_BASE: UI base url for frontend enviornment (e.g. https://ui.sharpsports.io, http://localhost:3006)
- REACT_APP_INTERNAL_ID: InternalID of test bettor
- REACT_APP_PRIVATE_KEY: Test user private key
	- Live: `433b0432d117a4c9ae338bd2e8467175d67af829`
	- Sandbox: `1fb886d9aff543cb6e2d87691a8b977abf12d312`
- REACT_APP_PUBLIC KEY: Test user public key
	- Live: `a4e27d45042947e7967146c26973bbd4a4e27d45`
	- Sandbox: `1fb886d9aff543cb6e2d87691a8b977abf12d312`

 **Optional Testing Variables**

- REACT_APP_SERVICE: Context service query param, will also add add required auth
	- React Native: sharpsports-mobile-npm_{version}
	- Android Native: sharpsports-mobile-android_{version}
	- iOS Native: sharpsports-mobile-spm_{version}
	- Cordova: sharpsports-mobile-cordova_{version}
- REACT_APP_EXTENSION_BOOL: True if want extensionAuthToken on Context
- REACT_APP_USERAGENT: Spoofed UserAgent for testing
	- Android Example: Mozilla/5.0 (Linux; Android 13) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.5735.130 Mobile Safari/537.36
	- iOS Example: Mozilla/5.0 (iPhone; CPU iPhone OS 16_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.5 Mobile/15E148 Safari/604.1
	- Chrome Example: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36


 ## Manual Setup

- If you change the publicKey, privateKey, or internalID variables in `.env` file you will need to update the script tag values in `index.html` to match, including computed extensionAuthToken (same as auth value in `home.js`
- If you wish to test without extension implementation then comment out `https://d1vhnbpkpweicq.cloudfront.net/extension-cdn.js` script tag altogether
- Download/Delete SharpSports Chrome Extension and start a new browser tab for testing this path

