import React, { Component } from 'react';


class Webhook extends React.Component {

   ws = new WebSocket('ws://localhost:3000/ws')
    render() {
       return (
          <div></div>
       )
    }
  }
  
  export default Webhook;
  