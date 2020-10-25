import React,{Component} from 'react';
import Card from'./card'
import Bill from'./../Bill/card'

import  { Feather } from 'react-web-vector-icons';
import {Button} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'

import {_plusProduct,_minsProduct,_plusBill} from '../../store/actions'
import { connect } from 'react-redux'
import axios from'axios'

class Cart extends Component{

    constructor(){
        super()
        this.state ={
            loading : false,
            bill : false
        }
    }
    handelPlusItem=(id)=>{
        this.props._plusProduct(id)
    }
    handelMinsItem=(id)=>{
        this.props._minsProduct(id)
    }
    handelCreateBill=()=>{
        this.setState({loading:true})
        const data = {bill:this.props.storage.cart,currency:this.props.storage.currency.id}
        axios.post('https://yashry.herokuapp.com/api/bill/create', data)
          .then(response=> {
            if(response.data.status == 1)
            {
                this.setState({
                    loading:false,
                    bill:response.data.bill
                })
            }
          })
    }
    handelStoreBill = ()=>{
        this.setState({loading:true})
        const data = {bill:this.state.bill}
        axios.post('https://yashry.herokuapp.com/api/bill/store', data)
          .then(response=> {
            if(response.data.status == 1)
            {
                this.setState({
                    loading:false,
                    bill:null
                })
                this.props._plusBill(response.data.bill)
                this.props.history.push('/bills');
            }
          })
    }

    render(){
        return(
            <div>
                {
                    !this.state.bill?
                    (
                        <div className="cart-section">
                            <div className="section_title text-center mb-80 ">
                                <span> 
                                    <Feather name='shopping-cart'  color='#F0542C' size={40}/>
                                    Yashry Cart 
                                </span>
                            </div>
                            <div className="cart-body">
                            {
                                this.props.storage.cart.length>0?
                                (
                                <div>
                                {
                                    this.props.storage.cart.map(item=>(
                                    <div key={item.id} className='cart-item'>
                                        <Card 
                                            item={item} 
                                            storage={this.props.storage}
                                            handelPlusItem={(item)=>{this.handelPlusItem(item)}}
                                            handelMinsItem={(item)=>{this.handelMinsItem(item)}}
                                        />
                                    </div>
                                    ))
                                    }     
                                    <div className="bill-section">
                                        {
                                            !this.state.loading?
                                            (
                                                <Button  className="form-control flex-center" onClick={()=>{this.handelCreateBill()}}>
                                                    Make Bill
                                                </Button>
                                            ):null
                                        }

                                    </div>  
                                </div>
                                ):
                                (
                                <div className="cart-empry">
                                    There are no purchases in your cart !
                                </div>
                                )
                            }
                            </div>
                        </div>
                    ):
                    (
                        <div className="cart-section">
                            <Bill bill={this.state.bill}/>
                            <br></br>
                            {
                                !this.state.loading?
                                (
                                <Button  className="form-control flex-center" onClick={()=>{this.handelStoreBill()}} >
                                    Confirm Bill
                                </Button> 
                                ):null
                            }
                
                        </div>
                    )
                }

    </div>
    )}
}

const mapDispatchToProps = (dispatch)=>{
    return{
        _plusProduct:(id)=>{dispatch(_plusProduct(id))},
        _minsProduct:(id)=>{dispatch(_minsProduct(id))},
        _plusBill:(bill)=>{dispatch(_plusBill(bill))}
    }
}
const mapStateToProps = (state)=>{
    return{
      storage : state.user_storage,
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Cart))