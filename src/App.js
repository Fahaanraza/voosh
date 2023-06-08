
import React, { useState }  from "react";
import { BrowserRouter as Router, Switch,
  Route,Redirect } from "react-router-dom";
import { Row, Col } from 'antd';
import LoginPage from './components/login';
import RegisterPage from './components/register';
import MainPage from "./components/mainPage";
import UserPage from "./components/userPage";
import AuthRoute from './components/auth';
import './App.css'

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
    return (
      <div  className='overlay'>
      <Router>
        <Switch>
          <Route path="/register" component={RegisterPage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/home" component={MainPage} />
          <Route path="/user/:userName" component={UserPage} />
          <Redirect from="/" to="/home" /> 
        </Switch>
      </Router>
      </div>
    );
}