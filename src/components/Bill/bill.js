import React from 'react';
import Card from './card'


 const Bill = (props)=>{
    return(
        <div className="bills-sections">
            {
                props.storage.bills.length>0?
                props.storage.bills.map((bill,index)=>(
                    <div key={index}>
                        <Card bill={bill} />
                    </div>
                )):
                (
                    <div className="cart-empry">
                        No Bills Fount !
                    </div>
                )
            }
        </div>
    )
}
export default  Bill