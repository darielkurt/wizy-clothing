import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CustomButton from "../custom-button/custom-button.component";
import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { withRouter } from "react-router-dom";

import { addItem, removeItem } from "../../redux/cart/cart.actions";

import "./sticky-cart.styles.scss";

const StickyCart = ({ cartItems, history, addItem, removeItem }) => {
  return (
    <div className="sticky-cart">
      <h1 className="title">CART</h1>
      <div className="cart-items">
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <div className="cart-item" key={cartItem.id}>
              <CartItem key={cartItem.id} item={cartItem} />
              <div className='arrow' onClick={() => removeItem(cartItem)}>&#10094;</div>
              <div className='arrow' onClick={() => addItem(cartItem)}>&#10095;</div>
            </div>
          ))
        ) : (
          <span className="empty-message">Your cart is empty</span>
        )}
      </div>
      <CustomButton
        onClick={() => {
          history.push("/checkout");
        }}
      >
        GO TO CHECKOUT
      </CustomButton>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

const mapDispatchToProps = (dispatch) => ({
    addItem: item => dispatch(addItem(item)),
    removeItem: item => dispatch(removeItem(item)), 
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(StickyCart)
);
