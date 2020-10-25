import React,{Component} from 'react';
import Slider from "react-slick";


class Slide extends Component{
    render() {
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
          <Slider {...settings}>
            {this.props.children}
          </Slider>
        );
      }
}

export default Slide
