import { combineReducers,createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { composeWithDevTools } from 'redux-devtools-extension';
import { act } from 'react-dom/test-utils';

const INITIAL_STATE = {
  user: null,
};
const ORDER_STATE = {
  order:[],
  info:null
}

const MODAL_STATE = {
  isOpen:false,
  type:null,
  data:null
}
const STORAGE_STATE = {
  favorites:[],
  orders:[]

}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
      case 'SIGN_IN':

        return {
          ...state,
          user: action.user,
        };
        
      case 'SIGN_OUT':
        return {
          ...state,
          user: null,
        };
        default:
            return state;
    }
  }

  const orderReucer = (state = ORDER_STATE, action) =>{
    switch (action.type) {
        case 'ORDER_NEW_ITEM':

          if(!action.item.qty)
          {
            action.item.qty=1
          }
        state.order.map(item=>item.id==action.item.id?
            item.qty = item.qty+1
            :!item.qty?
            item.qty=1:
            null
        )
        var order = state.order.length==0?
              state.order.concat(action.item):
            state.order.some(item=>item.id==action.item.id)?
              state.order:
              state.order.concat(action.item)

          return {
            ...state,
            order:order,
          };
        case 'REMOVE_ORDER_ITEM':
          state.order.map(item=>item.id==action.id?
            item.qty = 0:
            null
          )
          return {
            ...state,
            order:state.order.filter(item=>item.id!=action.id),
          };
          case 'CHANGE_QTY':
            state.order.map(item=>item.id==action.id?
              item.qty = action.qty:
              null
            )
            return {
              ...state,
              order:state.order,
            };
          case 'CLEAR_ORDER':
            return {
              ...state,
              order:[],
            };
          case 'ORDER_INFO':
              return {
                ...state,
                info:action.info
              };
        default:
            return state;
    }
    

  }
  const modalReducer = (state = MODAL_STATE, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
  
          return {
            ...state,
            isOpen: true,
            type:action.modal
          };
          
        case 'CLOSE_MODAL':
          return {
            ...state,
            isOpen: false,
            type:null
          };
          default:
              return state;
      }
    }
    const storageReucer = (state = STORAGE_STATE, action) =>{
      switch (action.type) {
          case 'MAKE_FAVORITE':
            return {
              ...state,
              favorites:state.favorites.concat(action.item)
            };
            case 'REMOVE_FAVORITE':
              return {
                ...state,
                favorites:state.favorites.filter(item=>item.id!=action.id),
              };
              case 'MAKE_ORDER':
                return {
                  ...state,
                  orders: [action.item, ...state.orders]
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
    user: userReducer,
    order:orderReucer,
    modal:modalReducer,
    user_storage:storageReucer
  });
  const persistedReducer = persistReducer(persistConfig, reducers)
export const Store = createStore(persistedReducer, composeWithDevTools());
export const persistor = persistStore(Store)
// export default Store


