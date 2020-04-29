import React from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import Home from './pages/home'
import Menu from './pages/menu'
import Order from './pages/order'
// import PopComponent from './components/popup'

import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import { connect } from 'react-redux'



function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/orders">
            <Order />
          </Route> 
          <Route path="/menu">
            <Menu />
          </Route> 
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
    
  );
}

export default connect (null,null)(App);
