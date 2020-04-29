import { combineReducers,createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web

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
          return {
            ...state,
            order:state.order.concat(action.item),
          };
        case 'REMOVE_ORDER_ITEM':
          return {
            ...state,
            order:state.order.filter(item=>item.id!=action.id),
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
export const Store = createStore(persistedReducer);
export const persistor = persistStore(Store)
// export default Store


