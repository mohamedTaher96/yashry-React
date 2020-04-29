import React,{Component} from 'react';
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'

import { connect } from 'react-redux'
import {closeModal,signIn} from './../store/actions'


class Auth extends Component{
    constructor(){
        super()
        this.state={
            login:{
                login_email:{
                    value:'',
                    error:''
                },
                login_password:{
                    value:'',
                    error:'' 
                },
                error:''
            },
            register:{
                name:{
                    value:'',
                    error:''
                },
                email:{
                    value:'',
                    error:''
                },
                password:{
                    value:'',
                    error:'' 
                },
                password_confirmation:{
                    value:'',
                    error:'' 
                },
                contact:{
                    value:'',
                    error:'' 
                }
            }
        }
    }
    closeModal = ()=>{
        this.props._closeModal()
    }
    handleValueChange = (val,key,type)=>{
        this.setState({
                [type]:{
                    ...this.state.login,
                    ...this.state.register,
                    [key]:{
                        value:val.target.value,
                        error:'',
                    }
                }
        })
    }
    handleLoginSubmits = (e)=>{
        e.preventDefault();
        fetch("https://yummipizza.herokuapp.com/api/login",{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              "email":this.state.login.login_email.value,
              "password":this.state.login.login_password.value
          })})
          .then(res => res.json())
          .then(
            (result) => {
              if(result.status == 1)
              {
                this.props._signIn(result.data)
                this.props._closeModal()
              }else{
                this.setState({
                    login:{
                        ...this.state.login,
                        ...this.state.register,
                        error:"This Data doesn't match our data"
                    }
                })
              }
            },
            (error) => {
                  console.log(error)
            }
          )
    }

    handleRegisterSubmits=(e)=>{
        e.preventDefault();
        fetch("https://yummipizza.herokuapp.com/api/register",{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              "name":this.state.register.name.value,
              "email":this.state.register.email.value,
              "password":this.state.register.password.value,
              "password_confirmation":this.state.register.password_confirmation.value,
              "phone":this.state.register.contact.value,
          })})
          .then(res => res.json())
          .then(
            (result) => {
                console.log(result)
              if(result.status == 1)
              {
                this.props._signIn(result.data)
                this.props._closeModal()
              }else
              {
                  this.setState({
                      register:{
                            ...this.state.register,
                          name:{...this.state.register.name,error:result.data.name},
                          email:{...this.state.register.email,error:result.data.email},
                          password:{value:'',error:result.data.password},
                          password_confirmation:{value:''},
                          contact:{...this.state.register.contact,error:result.data.contact},
                      }
                  })
              }
            },
            (error) => {
                  console.log(error)
            }
          )
    }

    componentDidMount(){
    }
    render(){
        return(
            <Tabs defaultActiveKey="login" id="uncontrolled-tab-example">
                <Tab eventKey="login" title="Login">
                    <Form onSubmit={this.handleLoginSubmits}>
                        <h2> Login</h2>
                        <Form.Text className="text-muted">
                            {this.state.login.error}
                        </Form.Text>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" required value={this.state.login.login_email.value} onChange={(val)=>{this.handleValueChange(val,"login_email","login")}}/>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="Password" placeholder="Password" required  value={this.state.login.login_password.value} onChange={(val)=>{this.handleValueChange(val,"login_password","login")}}/>
                        </Form.Group>
                        <Button variant="primary" className="modal_btn" type="submit">
                            LogIn
                        </Button>
                        <Button onClick={this.closeModal} className="btn btn-primary modal_btn " >
                            Close
                        </Button>
                    </Form>
                </Tab>
                <Tab eventKey="register" title="Register">
                    <Form onSubmit={this.handleRegisterSubmits}>
                        <h2> Register</h2>
                        <Form.Group >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="tet" placeholder="Enter Name" required value={this.state.register.name.value} onChange={(val)=>{this.handleValueChange(val,"name","register")}}/>
                            <Form.Text className="text-muted">
                                {this.state.register.name.error}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email" required value={this.state.register.email.value} onChange={(val)=>{this.handleValueChange(val,"email","register")}}/>
                            <Form.Text className="text-muted">
                                {this.state.register.email.error}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="Password" placeholder="Password" required value={this.state.register.password.value}  onChange={(val)=>{this.handleValueChange(val,"password","register")}}/>
                            <Form.Text className="text-muted">
                                {this.state.register.password.error} 
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="Password" placeholder="confirm Password" required value={this.state.register.password_confirmation.value}  onChange={(val)=>{this.handleValueChange(val,"password_confirmation","register")}}/>
                            <Form.Text className="text-muted">
                                {this.state.register.password.error}
                            </Form.Text>
                        </Form.Group>
                        <Form.Group >
                            <Form.Label>Contact</Form.Label>
                            <Form.Control type="text" placeholder="Contact"  required value={this.state.register.contact.value}  onChange={(val)=>{this.handleValueChange(val,"contact","register")}}/>
                            <Form.Text className="text-muted">
                                {this.state.register.contact.error} 
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" className="modal_btn" type="submit">
                            register
                        </Button>
                        <Button onClick={this.closeModal} className="btn btn-primary modal_btn" >
                            Close
                        </Button>
                    </Form>
                </Tab>
            </Tabs>

        )
    }
}

const mapDispatchToProps=(dispatch)=>{

    return{
      _closeModal : ()=>{dispatch(closeModal())},
      _signIn : (data)=>{dispatch(signIn(data))},
    }
  }

export default connect(null,mapDispatchToProps) (Auth)
