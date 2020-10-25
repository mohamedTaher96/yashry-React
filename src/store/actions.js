
export const _storeData = (data)=>{
    return{
        type:"STORE_DATA",
        data:data
    }
}
export const _setCurrency = (item)=>{
    return{
        type:"SET_CURRENCY",
        item:item
    }
}

export const _PlusCart = (item)=>{
    return{
        type:"PLUS_CART",
        item:item
    }
}

export const _plusProduct = (id)=>{
    return{
        type:"PLUS_PRODUCT",
        id:id
    }
}

export const _minsProduct = (id)=>{
    return{
        type:"MINS_PRODUCT",
        id:id
    }
}

export const _plusBill = (bill)=>{
    return{
        type:"PLUS_BILL",
        bill:bill
    }
}



