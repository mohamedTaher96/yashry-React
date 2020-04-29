import React,{Component} from 'react'
import {Carousel} from 'react-bootstrap'

class Slider extends Component{

    constructor(){
        super()
        this.state={
            index:1
        }
    }
    

    handleSelect= (selectedIndex, e) => {
        this.setState({index:selectedIndex})
      };
    render(){
        return (
            <Carousel touch={true} activeIndex={this.state.index} onSelect={this.handleSelect}>
              <Carousel.Item>
              <div className="cover cover1"></div>
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="cover cover2"></div>
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <div className="cover cover3"></div>
                <Carousel.Caption>
                  <h3>Third slide label</h3>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                  </p>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          );
    }
}

export default Slider
