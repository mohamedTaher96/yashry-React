import React,{Component} from 'react'
import {Navbar,Nav,NavDropdown} from 'react-bootstrap'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import {openModal,signOut} from './../store/actions'
import  { Feather } from 'react-web-vector-icons';

class Header extends Component{

    openModal = ()=>{
        this.props._openModal('login')
    }
    signup = ()=>{
        this.props._signUp()
    }

    render(){
        return(
            <Navbar  bg="dark" expand="lg" variant="dark"  >
                <Navbar.Brand ><Link to="/" style={{color: "white"}}>YUMMI_PIZZA</Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link  ><Link to="/">Home</Link></Nav.Link>
                    <Nav.Link ><Link to="/menu">Menu</Link></Nav.Link>
                    <Nav.Link ><Link to="/orders">Orders Log</Link></Nav.Link>
                    {!this.props.user?(<Nav.Link onClick={this.openModal}>LogIn</Nav.Link>):
                    (
                        <NavDropdown title={this.props.user.name} id="basic-nav-dropdown">
                            {/* <NavDropdown.Divider /> */}
                            <NavDropdown.Item onClick={()=>{this.signup()}}>LogOut </NavDropdown.Item>
                        </NavDropdown>
                    )
                    }
                </Nav>
                    <a href="#">    
                        <Feather name='instagram'  color='#fff' size={30}/>
                    </a>
                    <a href="#">    
                        <Feather name='facebook'  color='#fff' size={30}/>
                    </a>
                    <a href="#">    
                        <Feather name='twitter'  color='#fff' size={30}/>
                    </a>
               
                </Navbar.Collapse>
            </Navbar>   

    
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        user:state.user.user
    }
}
const mapDispatchToProps=(dispatch)=>{

    return{
      _openModal : (type)=>{dispatch(openModal(type))},
      _signUp    : ()    =>{dispatch(signOut())}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Header)