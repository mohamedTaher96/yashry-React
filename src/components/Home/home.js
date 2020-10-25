import React,{Component} from 'react';
import Slider from '../Slider/Slider'
import Card from'./card'


import {_PlusCart,_plusProduct,_minsProduct} from './../../store/actions'
import { connect } from 'react-redux'

class Home extends Component{

    handelPlusCart =(item)=>{
        item.qty = 1;
        this.props._PlusCart(item)
    }
    handelPlusItem=(id)=>{
        this.props._plusProduct(id)
    }
    handelMinsItem=(id)=>{
        this.props._minsProduct(id)
    }

    render(){
        return(
            <div>
                <div>
                    <div className="section_title text-center mb-80 ">
                        <span>Yashry Products</span>
                    </div>
                </div>
                <Slider>
                    {
                        this.props.storage.products?
                            this.props.storage.products.map((item,index)=>(
                                <div key={index}>
                                    <Card 
                                        item={item} 
                                        storage={this.props.storage}
                                        handelPlusCart={(item)=>{this.handelPlusCart(item)}}
                                        handelPlusItem={(item)=>{this.handelPlusItem(item)}}
                                        handelMinsItem={(item)=>{this.handelMinsItem(item)}}
                                    />
                                </div>
                            ))
                        :null
                    }
                </Slider>
            </div>
        )
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        _PlusCart:(item)=>{dispatch(_PlusCart(item))},
        _plusProduct:(id)=>{dispatch(_plusProduct(id))},
        _minsProduct:(id)=>{dispatch(_minsProduct(id))}
    }
  }
export default connect(null,mapDispatchToProps)(Home)