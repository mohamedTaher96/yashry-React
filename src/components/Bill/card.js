import React from 'react';
import  {FontAwesome, Feather } from 'react-web-vector-icons';


 const Bill = (props)=>{

    let currency = null;
    if(props.bill.currency.key==="dollar")
    {
        currency = (<FontAwesome   name='dollar' color='#a5a5a5' size={20}/>)
    }else if(props.bill.currency.key==="euro")
    {
        currency = (<FontAwesome   name='euro' color='#a5a5a5' size={20}/>)
    }else if(props.bill.currency.key==="Pound sterling")
    {
        currency = (<FontAwesome   name='euro' color='#a5a5a5' size={20}/>)
    }


    return(
        <div className="bill-item">
            <div>
                <h3>YASHRY</h3> 
                <div>
                    <label> Date : </label>
                    <label> {props.bill.date} </label>
                </div>
                <h5></h5>
            </div>
            <div>
                <label> items </label>
                <ul>
                    {
                        props.bill.items.map((item,index)=>(
                            <li key={index}> {item.qty} - {item.title}  - {item.price}
                                {currency}
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
            <div>
                <label> Subtotal : </label>
                <label> {props.bill.subtotal.toFixed(2)} {currency} </label>
            </div>
            <div>
                <label> Taxes : </label>
                <label> {props.bill.tax.toFixed(2)} {currency} </label>
            </div>
            {
                props.bill.discounts?
                (
                <div>
                    <label> Discounts : </label>
                    <ul>
                        {
                            props.bill.discounts.map((item,index)=>(
                                <li key={index}> {item} {currency}</li>
                            ))
                        }
                        
                    </ul>
                </div>
                ):null
            }

            <div>
                <label> Total : </label>
                <label> {(props.bill.subtotal + props.bill.tax -props.bill.discount).toFixed(2)} {currency} </label>
            </div>
        </div>
    )
}
export default  Bill