import React, { Component,useState } from 'react';
import './App.css';
import Home from './components/home';
import Webhook from './components/webhook';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom';
import Header from './components/Header/header';
import RegistrationForm from './components/RegistrationForm/RegistrationForm';
import LoginForm from './components/LoginForm/LoginForm';

function App() {

  const [title, updateTitle] = useState(null);
  const [errorMessage, updateErrorMessage] = useState(null);

      return (
        <BrowserRouter>
             <Switch>
                <Route path="/" exact={true}>
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                </Route>
                <Route path="/register">
                  <RegistrationForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                </Route>
                <Route path="/login">
                  <LoginForm showError={updateErrorMessage} updateTitle={updateTitle}/>
                </Route>   
                <Route path="/home">
                  <Home showError={updateErrorMessage} updateTitle={updateTitle}/>
                </Route>         
              </Switch>
       </BrowserRouter>
      );
    
  }

export default App;


