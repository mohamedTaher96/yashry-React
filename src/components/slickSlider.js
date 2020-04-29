import React,{Component} from 'react';
import Slider from "react-slick";
import {Card,Button} from 'react-bootstrap'
import BeautyStars from 'beauty-stars';
import {Image} from 'react-bootstrap'
import  { FontAwesome} from 'react-web-vector-icons';

import { connect } from 'react-redux'
import {orderNewItem,handelNewFavorite,handelRemoveFavorite} from './../store/actions'

class SlickSlider extends Component{
    constructor(){
        super()
        this.state={
            items:null
        }
    }
    addOrderItem = (item)=>{
        this.props._orderNewItem(item)
    }
    handelFavorite = (item)=>{
      this.props.storage.favorites.some(fav=>fav.id==item.id)?
          this.props._handelRemoveFavorite(item.id):
          this.props._handelNewFavorite(item)
  }

    render() {
        var items = this.props.Testimonials?
        this.props.rate.map(item=> {
        return(
          <div className="TestimonialsView">
              <Card>
                  <Card.Body>
                      <Image src={require("./../images/slider/"+"1.jpg")} roundedCircle />
                      <Card.Title>{item.user.name}</Card.Title>
                      <Card.Text>{item.comment}</Card.Text>
                      <BeautyStars
                          className="rate"
                          value={item.rate}
                          size={23}
                      />
                  </Card.Body>
              </Card>                 
           </div>
        )}):this.props.bestMenu?
        this.props.menu.map(item=>{
          return(
          <div>
              <Card style={{ width: '18rem' }}>
                  <figure>
                      <Card.Img variant="top" src={item.image} />
                  </figure>
                  <div className="favorite" onClick={()=>{this.handelFavorite(item)}}>
                    {this.props.storage.favorites.some(fav=>fav.id==item.id)?
                        <FontAwesome name="heart" color="red" />:
                        <FontAwesome name="heart" />
                    }
                    </div>  
                    <div className="price">
                        <p>{item.price} EGP</p>
                    </div>                
              <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>{item.content}</Card.Text>
                  <Button  className="form-control" onClick={()=>{this.addOrderItem(item)}}>Order</Button>
              </Card.Body>
              </Card>
          </div>
      )}):this.props.favoriteSlider?
      this.props.favorite.map(item=>(
        <div>
            <Card style={{ width: '18rem' }}>
                <figure>
                    <Card.Img variant="top" src={item.image} />
                </figure>
                <div className="favorite" onClick={()=>{this.handelFavorite(item)}}>
                {this.props.storage.favorites.some(fav=>fav.id==item.id)?
                    <FontAwesome name="heart" color="red" />:
                    <FontAwesome name="heart" />
                }
                </div>
                <div className="price">
                    <p>{item.price} EGP</p>
                </div>
            <Card.Body>
                <Card.Title>{item.name}</Card.Title>
                <Card.Text>{item.content}</Card.Text>
                <Button  className="form-control" onClick={()=>{this.addOrderItem(item)}}>Order</Button>
            </Card.Body>
            </Card>
        </div>
      )):null
        var settings = {
            className:'slick',
            dots: true,
            focusOnSelect: false,
            arrows: false,
            infinite: true,
            slidesPerRow:this.props.Testimonials?1:4,
            autoplay:this.props.Testimonials?true:false,
            responsive: [
                {
                  breakpoint: 1100,
                  settings: {
                    slidesPerRow:this.props.Testimonials?1:3,
                    infinite: true,
                    dots: true
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesPerRow:this.props.Testimonials?1:2,
                    initialSlide: 2
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesPerRow:this.props.Testimonials?1:1
                  }
                }
              ]

        };

        return (
          items.length==0?(
            <div className="noItem">
              <h4>Choose Your Favorites</h4>
            </div>
          ):
          <Slider {...settings}>
            {items}
          </Slider>
        );
      }
}
const mapStateToProps = (state)=>{
  return{
    storage : state.user_storage,
  }
}
const mapDispatchToProps=(dispatch)=>{

    return{
      _orderNewItem : (item)=>{dispatch(orderNewItem(item))},
      _handelNewFavorite : (item)=>{dispatch(handelNewFavorite(item))},
      _handelRemoveFavorite : (item)=>{dispatch(handelRemoveFavorite(item))}
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (SlickSlider)
