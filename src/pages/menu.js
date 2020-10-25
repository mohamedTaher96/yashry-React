import React,{Component} from 'react';
import Header from './../components/header'
import FooterComponent from './../components/footer'
import MenuComonent from './../components/menu'
import PopComponent from './../components/popup'
import SlickSlider from './../components/slickSlider'
import {Form,FormControl} from 'react-bootstrap'
import  { FontAwesome} from 'react-web-vector-icons';

import TextField from '@material-ui/core/TextField';

import { connect } from 'react-redux'

class Menu extends Component{
    constructor(){
        super()
        this.state={
            menu:[],
            page:1
        }
    }
    fetchdate=()=>{
        this.setState({
            page:this.state.page+1
        },()=>{this.componentDidMount()})
    }
    handelSearch = (val)=>{
        fetch("http://localhost:8000/api/search",{
            method: 'post',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
              "search":val.target.value,
        })})
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
                menu:result.menu
            })
          },
          (error) => {
                console.log(error)
          }
        )
    }
    componentDidMount(){
        fetch("http://localhost:8000/api/menu?page="+this.state.page)
        .then(res => res.json())
        .then(
          (result) => {
            this.setState({
              menu: this.state.menu.concat(result.menu.data),
            });
          },
          (error) => {
                console.log(error)
          }
        )
    }
    render(){
        // var favorite = JSON.parse(localStorage.getItem('favorites'))?JSON.parse(localStorage.getItem('favorites')):[];
        var favorite = this.props.storage.favorites
        return(
            <div>
                <Header/>
                <PopComponent />
                <div>
                    <div className="section_title text-center mb-80">
                        <span>Favorite</span>
                        <SlickSlider  favoriteSlider={true} favorite={favorite}/>
                    </div>
                    <div className="section_title text-center mb-80 ">
                        <span>Pizza Menu</span>
                        <h3>Best Ever Pizza</h3> 
                        <Form inline style={{justifyContent:'center'}}>
                            <TextField id="standard-secondary" label="Search" color="secondary" type="text"  onChange={(val)=>{this.handelSearch(val)}} className="mr-sm-2" />
                            <FontAwesome name="search" />
                        </Form>
                    </div>
                </div>
                <div className="menu">
                    <MenuComonent menu={this.state.menu} fetchdate={()=>this.fetchdate()}/>
                </div>
                <FooterComponent/>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return{
      storage : state.user_storage,
    }
  }

  

export default connect(mapStateToProps,null)(Menu)