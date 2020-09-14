import React from "react";

import "./order-details.styles.scss";

const OrderDetails = ({ location, city, country, zip, name, price }) => (
  <div className="order-details">
    <div className="order-details-name">
      <div className="order-holder">Ship & bill to: </div>
      {name}
    </div>
    <div className="address">
      <div className="order-holder">Shipping & Billing Address: </div>
      <span className="location">{location}, </span>
      <span className="city">{city}, </span>
      <span className="country">{country}, </span>
      <span className="zip">{zip}</span>
    </div>
    <span className="price">
    <div className='order-holder'>Total amount: </div>
    ${price}
    </span>
  </div>
);

export default OrderDetails;
