import { combineReducers,createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import update from 'react-addons-update';


const STORAGE_STATE = {
  products:null,
  cuurency:null,
  currencies:[],
  cart:[],
  bills:[],
  currency:"dolar"
}

    const storageReucer = (state = STORAGE_STATE, action) =>{
      switch (action.type) {
          case 'STORE_DATA':
            return {
              ...state,
              products:action.data.products,
              currencies:action.data.currencies,
              currency:action.data.currencies.find(item=>item.default==1)
            }; 
            case 'SET_CURRENCY':
              return {
                ...state,
                currency:action.item
              };
            case 'PLUS_CART':
              return {
                ...state,
                cart: [action.item, ...state.cart]
              };

              case 'PLUS_PRODUCT':
                const index = state.cart.findIndex(item=>item.id==action.id)
                return update(state, { 
                  cart: { 
                    [index]: {
                      qty: {$set: state.cart[index].qty+1}
                    }
                  }
                });

              case 'MINS_PRODUCT':
                const mins_index = state.cart.findIndex(item=>item.id==action.id)
                if(state.cart[mins_index].qty !=1)
                {
                  return update(state, { 
                    cart: { 
                      [mins_index]: {
                        qty: {$set: state.cart[mins_index].qty-1}
                      }
                    }
                  });
                }else
                {
                  return {
                    ...state,
                    cart: state.cart.filter(item=>item.id != action.id)
                  };
                }

                case 'PLUS_BILL':
                  return {
                    ...state,
                    bills: [action.bill, ...state.bills],
                    cart:[]
                  };
          default:
              return state;
      }
    }

  const persistConfig = {
    key: 'root',
    storage,
  }
  const reducers =  combineReducers({
    user_storage:storageReucer
  });
  const persistedReducer = persistReducer(persistConfig, reducers)
  export const Store = createStore(persistedReducer);
  export const persistor = persistStore(Store)
// export default Store


