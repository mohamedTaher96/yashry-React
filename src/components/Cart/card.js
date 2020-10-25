import React from 'react';
import {Card,Button} from 'react-bootstrap'
import  {FontAwesome, Feather } from 'react-web-vector-icons';

 const CartCard = (props)=>{
    return(
        <Card >
        <figure>
            <Card.Img variant="top" src={props.item.image} />
        </figure>
        <div className="price">
            <span className="badge badge-success">{ (props.storage.currency.price_to_default * props.item.price).toFixed(2) } 
            {props.storage.currency.key==="dollar"?
                    (<FontAwesome   name='dollar' color='white' size={20}/>)
                 :props.storage.currency.key==="euro"?
                 (<FontAwesome   name='euro' color='white' size={20}/>)
                 :props.storage.currency.key==="Pound sterling"?
                 (<FontAwesome   name='gbp' color='white' size={20}/>)
                 :null
                 }
            </span>
        </div>   
        {
            props.item.discount>0?
            (
                <div className="discount">
                    <span className="badge badge-secondary">{props.item.discount} %</span>
                </div>      
            ):null
        }

        <Card.Body>
            <Card.Title>{props.item.title}</Card.Title>
            <Card.Text>{props.item.info}</Card.Text>
            <div className="flex-center product-no">
                <Button  className="form-control flex-center" onClick={()=>{props.handelPlusItem(props.item.id)}}>
                    <Feather name='plus'  color='#fff' size={18}/>
                </Button>
                <div className="numbers">
                    {props.storage.cart.find(cart=>cart.id==props.item.id).qty}
                </div>         
                <Button  className="form-control flex-center" onClick={()=>{props.handelMinsItem(props.item.id)}}>
                    <Feather name='minus'  color='#fff' size={18}/>
                </Button>
            </div>
        </Card.Body>
    </Card>
    )
}
export default  CartCard