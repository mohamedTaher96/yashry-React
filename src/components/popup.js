import React,{Component} from 'react'
import Popup from "reactjs-popup";
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import  { Feather } from 'react-web-vector-icons';
import Badge from 'react-bootstrap/Badge'
import ModalComponent from './modal'


import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css


import { connect } from 'react-redux'
import {openModal,clearOrder,closeModal,removeOrderItem} from './../store/actions'

class PopupComponent extends Component{
    constructor(){
        super()
        this.state={
          isOpen:false,
          total : 0
        }
        }
    
        removeItem = (id)=>{
            this.props._removeOrderItem(id)
        }
        confirmOrder = (total) =>{
          if(total>0)
          {
            this.setState({total:total})
            this.props._openModal('order')
          }else
          {
            confirmAlert({
              title: 'Warning!',
              message: 'You must order something',
              buttons: [
                {
                  label: 'OK',
                }
              ]
            });
          }

        }

        newOrder = ()=>{
          alert("s")
            fetch("http://localhost:8000/api/newOrder",{
              method: 'POST',
              headers: {'Content-Type':'application/json'},
              body: JSON.stringify({
                "order":this.props.order.order,
                "user_id":this.props.user?this.props.user.id:null,
                "total":this.state.total,
                "info" :this.props.order.info
              })})
            .then(res => res.json())
            .then(
              (result) => {
                if(result.status == 1)
                {
                  confirmAlert({
                    title: 'Done!',
                    message: 'You order has been delivered',
                    buttons: [
                      {
                        label: 'OK',
                      }
                    ]
                  });
                  this.props._clearOrder()
                  this.props._closeModal()

                  var orders = localStorage.getItem('orders');
                  orders = orders ? JSON.parse(orders) : [];
                  orders.unshift((result.order));
                  localStorage.setItem('orders', JSON.stringify(orders));
                }
              },
              (error) => {
                    console.log(error)
              }
            )
        }
      render(){

        let count = 0;
        let total = 0
        const order = this.props.order.order.map((item,index)=>{
          total += item.price
          count++
          return(
            <tr>
              <td>{index+1}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td><Button className="close_btn" size="sm" variant="outline-light" onClick={()=>{this.removeItem(item.id)}}><Feather name="x" size={22} color="red" /></Button></td>
            </tr>
          )
        })
        
        return(
          <div>
            <ModalComponent newOrder={()=>{this.newOrder()}} />
            <Popup  trigger={<button className="pop_up_button btn btn-primary"> Order <Badge variant="light">{count}</Badge></button>} position="top center">
            <div className="pop_up_view">
            <Table responsive="sm"  hover className="pop_up_table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>type</th>
                  <th>price</th>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                {order}
              </tbody>
            </Table>
            <Table>
              <thead>
                  <tr>
                    <th>#</th>
                    <th>total</th>
                    <th>{total}</th>
                    <th></th>
                  </tr>
                  <tr>
                    <th colspan={3} className="confirm_tr">
                      <Button className="confirm_btn" variant="primary" size="md" block onClick={()=>{this.confirmOrder(total)}}>Confirm  </Button>
                    </th>
                  </tr>
              </thead>
            </Table>
            </div>
          </Popup>
          </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
      order : state.order,
      modal : state.modal.modal,
      user : state.user.user
    }
  }
const mapDispatchToProps=(dispatch)=>{

    return{
      _openModal : (type)=>{dispatch(openModal(type))},
      _clearOrder: ()=>{dispatch(clearOrder())},
      _closeModal : ()=>{dispatch(closeModal())},
      _removeOrderItem : (id)=>{dispatch(removeOrderItem(id))},
    }
}

  

export default connect(mapStateToProps,mapDispatchToProps)(PopupComponent)
