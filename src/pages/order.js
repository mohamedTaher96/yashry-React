import React,{Component} from 'react';
import Header from './../components/header'
import FooterComponent from './../components/footer'
import PopComponent from './../components/popup'
import {Card,Button} from 'react-bootstrap'
import Table from 'react-bootstrap/Table'

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
        var orders = JSON.parse(localStorage.getItem('orders'))?JSON.parse(localStorage.getItem('orders')):[];
        var orders = orders.map((item,index)=>(
            <Card className="orderLog_card">
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.total}EGP</Card.Text>
                <Card.Text>{item.date}</Card.Text>
                <hr/>
                <ul>
                {item.order_items.map(orde_item=>(
                    <li>{orde_item.item.name} - {orde_item.item.price}EGP</li>
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

export default Order