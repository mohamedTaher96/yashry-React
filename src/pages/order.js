import React,{Component} from 'react';
import Header from './../components/header'
import FooterComponent from './../components/footer'
import PopComponent from './../components/popup'
import {Card,Button} from 'react-bootstrap'

import { connect } from 'react-redux'

class Order extends Component{

    constructor(){
        super()
        this.state={
            menu:[],
            rate:[]
        }
    }

    componentDidMount(){
    }

    render(){
        console.log(this.props.order_storage)
        // var orders = JSON.parse(localStorage.getItem('orders'))?JSON.parse(localStorage.getItem('orders')):[];
        var orders = this.props.order_storage.map((item,index)=>(
            <Card className="orderLog_card">
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.total} EUR</Card.Text>
                <Card.Text>{item.date}</Card.Text>
                <hr/>
                <ul>
                {item.order_items.map(order_item=>(
                    <li>{order_item.item.name} - {order_item.item.price*order_item.qty} EUR (qty:{order_item.qty})</li>
                ))}
                </ul>
            </Card.Body>
        </Card>
        ))
        return(
            <div>
                <Header/>
                <PopComponent />
                <div>
                    <div className="section_title text-center mb-80 ">
                        <span>YOUR ORDERS LOGS</span>
                        <h3>We Wish You Have A Good Meals</h3> 
                    </div>
                    <div className="orderLog">
                        {orders}
                    </div>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
        order_storage : state.user_storage.orders,
    }
  }
export default connect (mapStateToProps,null) (Order)