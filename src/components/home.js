import md5 from 'md5';
import React from 'react';
import Button from 'react-bootstrap/Button';



class Home extends React.Component {

    constructor(props) {
      super(props);
      this.state = { width: 0, height: 0 };
      this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
      this.internalId = 'extension-test'
      this.publicKey = 'a4e27d45042947e7967146c26973bbd4a4e27d45'
      this.privateKey = '433b0432d117a4c9ae338bd2e8467175d67af829'
      this.extensionAuthToken = md5(this.internalId + this.privateKey)
    }

    componentDidMount() {
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
      this.setState({ width: window.innerWidth, height: window.innerHeight });
    }

    async postContext(url, data) {

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.publicKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      return response.json();
    }

    popupWindow(url, title, win, w, h) {
  
      const y = win.top.outerHeight / 2 + win.top.screenY - ( h / 2);
      const x = win.top.outerWidth / 2 + win.top.screenX - ( w / 2);
      return win.open(url, title, `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${w}, height=${h}, top=${y}, left=${x}`);
  }
  
    
    onLinkPopUp() {
      this.postContext('https://api.sharpsports.io/v1/context',{internalId:this.internalId, extensionAuthToken: this.extensionAuthToken})
      .then(data => {
        console.log(data)
        this.popupWindow(`https://ui.sharpsports.io/link/${data.cid}`,'SharpSports',window,500,600)
      })
    }

    onLinkRedirect() {
      let redirectUrl = window.location.href;
      this.postContext('https://api.sharpsports.io/v1/context',{internalId:this.internalId, extensionAuthToken: this.extensionAuthToken, redirectUrl:redirectUrl})
      .then(data => {
        window.location.href = `https://ui.sharpsports.io/link/${data.cid}`
      })
    }

    async onRefresh() {
      const sharpSportsExtensionVersion = sessionStorage.getItem("sharpSportsExtensionVersion")
      const response = await fetch(`https://api.sharpsports.io/v1/bettors/${this.internalId}/refresh?auth=${this.extensionAuthToken}&extensionVersion=${sharpSportsExtensionVersion}`, {
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
          <h1>My Extension Test</h1>
          <div><Button onClick={() => this.onLinkPopUp()}>Link Book with Popup</Button></div>
          <div><Button onClick={() => this.onLinkRedirect()}>Link Book with Page Redirect</Button></div>
          <div><Button onClick={() => this.onRefresh()}>Refresh</Button></div>
        </div>


      );
    }
  }

  export default Home;
