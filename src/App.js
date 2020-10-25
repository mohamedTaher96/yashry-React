import React,{Component} from 'react';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";

import Home from './components/Home/home'
import Cart from './components/Cart/cart'
import Bill from './components/Bill/bill'
import Header from './components/Header/header.js'
import Footer from './components/Footer/footer'

import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './App.css';

import {_storeData} from './store/actions'
import { connect } from 'react-redux'



class App extends Component {
  componentDidMount()
  {
    fetch("https://yashry.herokuapp.com/api/products")
    .then(res => res.json())
    .then(
      (result) => {
        this.props._storeData(result.data)
      }
    )
  }

  render()
  {
    return (
      <div className="App">
          <Router>
            {/* HEADER_COMPONENT */}
            <Header storage={this.props.storage}/>
            {/* BODY_COMPNENT */}
            <Switch>
              <Route path="/cart">
                <Cart storage={this.props.storage} />
              </Route> 
              <Route path="/bills">
                <Bill storage={this.props.storage} />
              </Route>
              <Route path="/">
                <Home storage={this.props.storage} />
              </Route>
            </Switch>
            {/* FOOTER_COMPONENT */}
            <Footer/>
          </Router>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    _storeData:(menu)=>{dispatch(_storeData(menu))}
  }
}
const mapStateToProps = (state)=>{
  return{
    storage : state.user_storage,
  }
}
export default connect (mapStateToProps,mapDispatchToProps)(App);
