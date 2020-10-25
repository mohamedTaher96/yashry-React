import React,{Component} from 'react'
import {Navbar,Nav} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import  { Feather } from 'react-web-vector-icons';
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import {_setCurrency} from './../../store/actions'
import { connect } from 'react-redux'

class Header extends Component{

    handelCurrency = (item)=>{
        this.props._setCurrency(item)
    }
    render(){
        return(
            <Navbar  bg="dark" expand="lg" variant="dark"  >
                <Navbar.Brand ><Link to="/" style={{color: "white"}}>Yashery</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Link   to="/">Home</Link>
                    <Link to="/cart">
                        <Feather name='shopping-cart'  color='#fff' size={18}/> 
                        Cart 
                        <span className="header-cart-number">{this.props.storage.cart.length}</span>
                    </Link>
                    <Link  to="/bills">Bills</Link>
                    {/* <Nav.Link  > */}
                    <DropdownButton id="dropdown-basic-button" title={this.props.storage.currency.key}>
                        {
                            this.props.storage.currencies.map(item=>(
                                <Dropdown.Item key={item.id}  href={"#/action-"+item.id}
                                    onClick={()=>{this.handelCurrency(item)}}
                                >{item.key}
                                </Dropdown.Item>
                            ))
                        }
                    </DropdownButton>
                    {/* </Nav.Link> */}
                </Nav>
                    <Link to="#">    
                        <Feather name='instagram'  color='#fff' size={30}/>
                    </Link>
                    <Link to="#">    
                        
                    </Link>
                    <Link to="#">    
                        <Feather name='twitter'  color='#fff' size={30}/>
                    </Link>
                </Navbar.Collapse>
            </Navbar>   
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
      _setCurrency:(menu)=>{dispatch(_setCurrency(menu))}
    }
  }
  export default connect (null,mapDispatchToProps)(Header);
