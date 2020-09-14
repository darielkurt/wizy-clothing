import React from "react";

import OrderItem from "../order-item/order-item.component";
import OrderDetails from "../order-details/order-details.component";

import "./order.styles.scss";

const Order = ({ dataItem }) => {
  const {
    id,
    date,
    items,
    name,
    location,
    city,
    country,
    zip,
    price,
  } = dataItem;

  const newDate = new Date(date.seconds * 1000).toDateString();
  const newTime = new Date(date.seconds * 1000).toTimeString();

  return (
    <div className="order">
      <h2 className="order-title">Order ID: {id}</h2>
      <h2 className='date'>
        {newDate}, {newTime}
      </h2>
      <div className="order-area">
        <div>
          {items.map((item) => (
            <OrderItem cartItems={item} key={item.id} />
          ))}
        </div>
        <div className="item-details">
          <OrderDetails
            name={name}
            location={location}
            city={city}
            country={country}
            zip={zip}
            price={price}
          />
        </div>
      </div>
    </div>
  );
};

export default Order;
