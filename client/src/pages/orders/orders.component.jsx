import React from "react";

import Order from "../../components/order/order.component";
import { firestore } from "../../firebase/firebase.utils";

import "./orders.styles.scss";

class OrdersPage extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }
  componentDidMount() {
    firestore.collection("orders").onSnapshot((snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      this.setState({ data });
    });
  }

  render() {
    return (
      <div className="orders-page">
        <h1 className="orders-title">Order History</h1>
        {this.state.data.map((dataItem) => (
          <Order dataItem={dataItem} key={dataItem.id} />
        ))}
      </div>
    );
  }
}

export default OrdersPage;
