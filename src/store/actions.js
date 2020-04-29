
export const signIn = (user)=>{

    return{
        type:"SIGN_IN",
        user:user
    }
}
export const signOut = ()=>{
    
    return{
        type:"SIGN_OUT",

    }
}

export const orderNewItem = (item)=>{

    return{
        type:"ORDER_NEW_ITEM",
        item:item

    }
}

export const removeOrderItem = (id,price)=>{
    return{
        type:"REMOVE_ORDER_ITEM",
        id:id,
        price:price
    }
}

export const clearOrder = ()=>{
    return{
        type:"CLEAR_ORDER",
    }
}
export const orderInfo = (info)=>{
    return{
        type:"ORDER_INFO",
        info : info
    }
}

export const openModal = (type)=>{
    return{
        type:"OPEN_MODAL",
        modal:type
    }
}

export const closeModal = ()=>{
    return{
        type:"CLOSE_MODAL",
    }
}


export const handelNewFavorite = (item)=>{
    return{
        type:"MAKE_FAVORITE",
        item:item
    }
}
export const handelRemoveFavorite = (id)=>{
    return{
        type:"REMOVE_FAVORITE",
        id:id
    }
}


