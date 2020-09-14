import CheckoutActionTypes from "./checkout.types";
// import { addItemToCart, removeItemFromCart } from "./checkout.utils";

const INITIAL_STATE = {
  hidden: true,
  cartItems: [],
};

const checkoutReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CheckoutActionTypes.ORDER_SUCCESS:
      return {
        ...state,
        cartItems: action.payload
      };
    //   case CartActionTypes.TOGGLE_CART_HIDDEN:
    //     return {
    //       ...state,
    //       hidden: !state.hidden,
    //     };
  
    //   case CartActionTypes.ADD_ITEM:
    //     return {
    //       ...state,
    //       cartItems: addItemToCart(state.cartItems, action.payload),
    //     };
  
    //   case CartActionTypes.REMOVE_ITEM:
    //     return {
    //       ...state,
    //       cartItems: removeItemFromCart(state.cartItems, action.payload),
    //     };
  
    //   case CartActionTypes.CLEAR_ITEM_FROM_CART:
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.filter(
    //         (cartItem) => cartItem.id !== action.payload.id
    //       ),
    //     };

    default:
      return state;
  }
};

export default checkoutReducer;