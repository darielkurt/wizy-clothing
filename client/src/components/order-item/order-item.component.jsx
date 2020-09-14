import React from "react";

import "./order-item.styles.scss";

const OrderItem = ({ cartItems }) => {
  const { id, imageUrl, name, price, quantity } = cartItems;

  return (
    <div className="order-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <div className="order-item-area">
        <div className="details">
          <span className="name">{name}</span>
          <span className="id">ID: {id}</span>
        </div>
        <div className="price">
          Price: <span>${price}</span>
        </div>
        <div className="quantity">
          Quantity: <span>{quantity}</span>
        </div>
      </div>
      <div className="item-total">
        <span className='item-total-holders'>total: </span>
        <span>${price * quantity}</span>
      </div>
    </div>
  );
};

// const OrderItem = ({ id, imageUrl, name, price, quantity }) => (

// );

export default OrderItem;
