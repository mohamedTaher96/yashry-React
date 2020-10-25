import React,{Component} from 'react'
import {Card,Button} from 'react-bootstrap'
import InfiniteScroll from 'react-infinite-scroll-component';
import Spinner from 'react-bootstrap/Spinner'
import  { FontAwesome} from 'react-web-vector-icons';

import { connect } from 'react-redux'
import {orderNewItem,handelNewFavorite,handelRemoveFavorite} from './../store/actions'

class MenuComponent extends Component{
    constructor(){
        super()
        this.state={
            items:[]
        }
    }

    addOrderItem = (item)=>{
        this.props._orderNewItem(item)
    }
    fetchData = ()=>{
        this.props.fetchdate(true)
    }
    handelFavorite = (item)=>{
        this.props.favorite_storage.some(fav=>fav.id==item.id)?
            this.props._handelRemoveFavorite(item.id):
            this.props._handelNewFavorite(item) 
    }

    render(){
        var items = this.props.menu.map(item=>(
            <div>
                <Card style={{ width: '18rem' }}>
                    <figure>
                        <Card.Img variant="top" src={item.image} />
                    </figure>
                    <div className="favorite" onClick={()=>{this.handelFavorite(item)}}>
                        {this.props.favorite_storage.some(fav=>fav.id==item.id)?
                            <FontAwesome name="heart" color="red" />:
                            <FontAwesome name="heart" />
                        }
                    </div>
                    <div className="price">
                        <p>{item.price} EUR</p>
                    </div>
                <Card.Body>
                    <Card.Title>{item.name}</Card.Title>
                    <Card.Text>{item.content}</Card.Text>
                    <Button  className="form-control" onClick={()=>{this.addOrderItem(item)}}>Order</Button>
                </Card.Body>
                </Card>
            </div>
        ))
        return(
                <InfiniteScroll
                className="menu_card"
                dataLength={this.state.items.length} //This is important field to render the next data
                next={this.fetchData}
                hasMore={true}
                loader={
                <Button variant="primary" className="form-control" disabled>
                <Spinner
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    />Loading...
                  </Button>
                }
                endMessage={
                    <p style={{textAlign: 'center'}}>
                    <b>Yay! You have seen it all</b>
                    </p>
                }
                >
                {items}
                </InfiniteScroll>

        )
    }
}
const mapStateToProps = (state)=>{
    return{
      favorite_storage : state.user_storage.favorites,
    }
  }
const mapDispatchToProps=(dispatch)=>{
    return{
      _orderNewItem : (item)=>{dispatch(orderNewItem(item))},
      _handelNewFavorite : (item)=>{dispatch(handelNewFavorite(item))},
      _handelRemoveFavorite : (item)=>{dispatch(handelRemoveFavorite(item))}
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (MenuComponent)
