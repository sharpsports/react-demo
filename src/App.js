import React, { Component } from 'react';
import './App.css';
import Home from './components/home';
import Webhook from './components/webhook';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';

class App extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

      return (

        <BrowserRouter>
             <Switch>
              <Route path="/" component={Home}>
              </Route>
              <Route path="/webhook" component={Webhook}>
              </Route>
            </Switch>
       </BrowserRouter>

      );
    }
  }

export default App;


