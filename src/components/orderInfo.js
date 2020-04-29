import React,{Component} from 'react';
import Form from 'react-bootstrap/Form'
import {Button} from 'react-bootstrap'

import { connect } from 'react-redux'
import {orderNewItem,orderInfo,closeModal} from './../store/actions'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


class OrderInfo extends Component{
    constructor(){
        super()
        this.state={
            order:{
                name:{
                    value:'',
                    error:''
                },
                address:{
                    value:'',
                    error:'' 
                },
                contact:{
                    value:'',
                    error:'' 
                }
            },
        }
    }
    handleValueChange = (val,key,type)=>{
        this.setState({
                [type]:{
                    ...this.state.order,
                    [key]:{
                        value:val.target.value,
                        error:'',
                    }
                }
        })
    }
    handleSubmits = (e)=>{
        e.preventDefault();
        if(this.state.order.name.value && this.state.order.address.value&&this.state.order.contact.value)
        {
            this.props._orderInfo(this.state.order)
            this.confirmAlert()
        }
    }
    confirmAlert = ()=>{
        confirmAlert({
            title: 'Confirm Order',
            message: 'Are you sure you want to confirm?.',
            buttons: [
                {
                  label: 'Yes',
                  onClick: () => {this.props.orderInfo()}
                },
                {
                  label: 'No',
                }
            ]
        });
    }
    closeModal = ()=>{
        this.props._closeModal()
    }

    componentDidMount(){
    }
    render(){
        return(
            <Form onSubmit={this.handleSubmits}>
                <h2>ORDER INFO</h2>
                <Form.Group >
                    <Form.Label>Name</Form.Label>
                    <Form.Control 
                        type="text" placeholder="Enter Name" 
                        value={this.state.order.name.value} required 
                        onChange={(val)=>{this.handleValueChange(val,"name","order")}}/>
                    <Form.Text className="text-muted">
                        {this.state.order.name.error}
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Address</Form.Label>
                    <Form.Control 
                        type="text" placeholder="Address" required  
                        onChange={(val)=>{this.handleValueChange(val,"address","order")}}/>
                    <Form.Text className="text-muted">
                        {this.state.order.address.error} 
                    </Form.Text>
                </Form.Group>
                <Form.Group >
                    <Form.Label>Contact</Form.Label>
                    <Form.Control 
                        type="tel" placeholder="Contact"  required 
                        value={this.state.order.contact.value}
                         onChange={(val)=>{this.handleValueChange(val,"contact","order")}}/>
                    <Form.Text className="text-muted">
                        {this.state.order.contact.error} 
                    </Form.Text>
                </Form.Group>
                <Button variant="primary" className="modal_btn" type="submit">
                    Order
                </Button>
                <Button onClick={this.closeModal} className="btn btn-primary modal_btn" >
                    Close
                </Button>
            </Form>

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
        _orderNewItem : (item)=>{dispatch(orderNewItem(item))},
        _closeModal : ()=>{dispatch(closeModal())},
        _orderInfo : (info)=>{dispatch(orderInfo(info))}
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (OrderInfo)
