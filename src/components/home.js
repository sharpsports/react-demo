import md5 from 'md5';
import React from 'react';
import Button from 'react-bootstrap/Button';



class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      this.internalId = process.env.REACT_APP_INTERNAL_ID
      this.privateKey = process.env.REACT_APP_PRIVATE_KEY
      this.publicKey = process.env.REACT_APP_PUBLIC_KEY
      this.extension = (process.env.REACT_APP_EXTENSION_BOOL === 'true')
      this.service = process.env.REACT_APP_SERVICE
      this.userAgent = process.env.REACT_APP_USERAGENT
      this.extensionVersion = sessionStorage.getItem("sharpSportsExtensionVersion");
      this.auth = md5(this.internalId + this.privateKey)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async postContext(url, body) {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.publicKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      return response.json();
    }

    popupWindow(url, title, win, w, h) {
  
      const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
      const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
      return win.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);

    }
  
    onLinkPopUp() {
      console.log("Auth Token: ", this.auth)
      let body = {
        internalId: this.internalId,
        extensionAuthToken: (this.extension) ? this.auth : null,
        bettorToken: (this.service) ? this.auth : null
      }
      let url = `${process.env.REACT_APP_API_BASE}/v1/context`
      if (this.service) url = url.concat(`?service=${this.service}`)
      this.postContext(url,body)
      .then(data => {
        console.log(data)
        let url = `${process.env.REACT_APP_UI_BASE}/link/${data.cid}`;
        if (this.userAgent) url = url.concat(`?userAgent=${this.userAgent}`);
        this.popupWindow(url,'SharpSports',window,500,600)
      })
    }

    onLinkRedirect() {
      console.log("Auth Token: ", this.auth)
      let redirectUrl = window.location.href;
      let body = {
        internalId: this.internalId,
        extensionAuthToken: (this.extension) ? this.auth : null,
        bettorToken: (this.service) ? this.auth : null,
        redirectUrl
      }
      let url = `${process.env.REACT_APP_API_BASE}/v1/context`
      if (this.service) url = url.concat(`?service=${this.service}`)
      this.postContext(url,body)
      .then(data => {
        console.log(data);
        let url = `${process.env.REACT_APP_UI_BASE}/link/${data.cid}`;
        if (this.userAgent) url = url.concat(`?userAgent=${this.userAgent}`);
        window.location.href = url;
      })
    }

    async onRefresh() {
      const sharpSportsExtensionVersion = sessionStorage.getItem("sharpSportsExtensionVersion");
      let url = `${process.env.REACT_APP_API_BASE}/v1/bettors/${this.internalId}/refresh`;
      if (this.extension) url = url.concat(`?auth=${this.auth}&extensionVersion=${sharpSportsExtensionVersion}`)
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.publicKey}`,
          'Content-Type': 'application/json'
        }
      });
      let data = await response.json();
      console.log("Refresh Data", data)
      return 
    }


    render() {


      return (
        <div id="main">
          <h1>Demo Test Application</h1>
          <p>Service: {this.service}</p>
          <p>Extension Version: {this.extensionVersion ? this.extensionVersion : "Extension Script not Initialized"}</p>
          <p>Extension Auth Passed: {this.extension.toString()}</p>
          <p>UserAgent: {this.userAgent ? this.userAgent : 'Default Browser User Agent'}</p>
          <div><Button onClick={() => this.onLinkPopUp()}>Link Book with Popup</Button></div>
          <div><Button onClick={() => this.onLinkRedirect()}>Link Book with Page Redirect</Button></div>
          <div><Button onClick={() => this.onRefresh()}>Refresh</Button></div>
        </div>


      );
    }
  }

  export default Home;
