import React,{Component} from 'react'
import  { Feather } from 'react-web-vector-icons';

class FooterComponent extends Component{

    render(){
        return(
            <footer class="footer">
            <div class="footer_top">
                <div class="container">
                    <div class="row">
                        <div class="col-xl-4 col-md-6 col-lg-4">
                            <div class="footer_widget text-center ">
                                <h3 class="footer_title pos_margin">
                                    KSA
                                </h3>
                                <p>5th flora, 700/D kings road, <br/> 
                                        green lane Mka-1782 <br/>
                                        <a href="#">info@yummipizza.com</a></p>
                                <a class="number" href="#">+10 378 483 6782</a>
    
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-6 col-lg-4">
                            <div class="footer_widget text-center ">
                                <h3 class="footer_title pos_margin">
                                    Egypt
                                </h3>
                                <p>5th flora, 700/D kings road, <br/> 
                                        green lane Mansour-1782 <br/>
                                        <a href="#">info@yummipizza.com</a></p>
                                <a class="number" href="#">+10 378 483 6782</a>
    
                            </div>
                        </div>
                        <div class="col-xl-4 col-md-12 col-lg-4">
                                <div class="footer_widget">
                                    <h3 class="footer_title">
                                            Stay Connected
                                    </h3>
                                    
                                    <div class="row justify-content-center">
                                    <div>
                                        <div class="socail_links text-center">
                                                <ul>
                                                    <li>
                                                        <a href="#">
                                                        <Feather
                                                        name='facebook'
                                                        color='#F0542C'
                                                        size={30}
                                                        />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <Feather
                                                            name='twitter'
                                                            color='#F0542C'
                                                            size={30}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <Feather
                                                            name='instagram'
                                                            color='#F0542C'
                                                            size={30}
                                                            />
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#">
                                                            <Feather
                                                            name='mail'
                                                            color='#F0542C'
                                                            size={30}
                                                            />
                                                        </a>
                                                    </li>
                                                </ul>
                                        </div>
                                    </div>
                                </div>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="copy-right_view">
                <div class="container">
                    <div class="footer_border"></div>
                    <div class="row">
                        <div class="col-xl-12 copy_right_text">
                            Copyright ©2020 All rights reserved to  <b class='copy_right_name'> M_Taher</b> 
                        </div>
                    </div>
                </div>
            </div>
        </footer>  
        )
    }
}

export default FooterComponent







