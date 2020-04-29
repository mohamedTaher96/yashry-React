import React,{Component} from 'react'

import Modal from 'react-modal';
import { connect } from 'react-redux'
import {closeModal} from './../store/actions'

import Auth from './auth'
import OrderInfo from './orderInfo'

// import { useFormik } from 'formik';
// import * as Yup from 'yup';




class ModalComponent extends Component{
    constructor(){
        super()
        this.state={
        }
    }



    closeModal = ()=>{
        this.props._closeModal()
    }


    
    render(){

        const customStyles = {
            content : {
              width                 : '350px',
              top                   : '50%',
              left                  : '50%',
              right                 : 'auto',
              bottom                : 'auto',
              marginRight           : '-50%',
              transform             : 'translate(-50%, -50%)',
              z_index               : '200'
            }
          };
          var modalContent = this.props.modal.type=='order'?
          (
            <OrderInfo orderInfo={()=>{this.props.newOrder()}}/>
          ):this.props.modal.type=='login'?(
            <Auth/>
          ):null
          
        return(
            <div>
            <Modal
              isOpen={this.props.modal.isOpen}
              style={customStyles}
              contentLabel="Example Modal"
            >
                {modalContent}

            </Modal>
          </div>

        )
    }
}
const mapStateToProps = (state)=>{
    return{
      modal : state.modal,
    }
  }
const mapDispatchToProps=(dispatch)=>{

    return{
      _closeModal : ()=>{dispatch(closeModal())},
    }
  }

export default connect(mapStateToProps,mapDispatchToProps) (ModalComponent)
