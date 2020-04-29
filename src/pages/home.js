import React,{Component} from 'react';
import Header from './../components/header'
import Slider from './../components/carousel'
import SlickSlider from './../components/slickSlider'
import FooterComponent from './../components/footer'
import PopComponent from './../components/popup'


class Home extends Component{

    constructor(){
        super()
        this.state={
            menu:[],
            rate:[]
        }
    }

    componentDidMount(){
        fetch("http://localhost:8000/api/home?page=")
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              menu: this.state.menu.concat(result.menu),
              rate: this.state.rate.concat(result.rate),
            });
          },
          (error) => {
                console.log(error)
          }
        )
    }

    render(){
        return(
            <div>
                <Header/>
                <PopComponent />
                <Slider/>
                <div>
                    <div className="section_title text-center mb-80 ">
                        <span>Pizza Menu</span>
                        <h3>Best Ever Pizza</h3> 
                    </div>
                </div>
                <SlickSlider menu={this.state.menu} bestMenu={true}/>
                <div>
                    <div className="section_title text-center mb-80">
                        <span>Testimonials</span>
                        <h3>HAPPY CUSTOMERS</h3> 
                    </div>
                </div>
                <SlickSlider rate={this.state.rate} Testimonials={true}/>
                <FooterComponent/>
            </div>
        )
    }
}

export default Home