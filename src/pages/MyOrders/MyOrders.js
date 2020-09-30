import React, { useState, useEffect } from "react";
import "./MyOrders.style.css";
import axios from "../../axios";
import { useStateValue } from "../../ContextApi/StateProvider";
import moment from "moment";

function MyOrders() {
  const [{ user }, dispatch] = useStateValue();
  const [orders, setOrders] = useState();

  useEffect(() => {
    const getOrders = async () => {
      axios
        .get(`/api/order/${user.email}`)
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => alert(err.message));
    };
    getOrders();
  }, []);

  return (
    <div className="text-center orders my-3">
      {orders?.length > 0 ? (
        <div className="d-flex flex-column justify-content-center w-100">
          <h3 className="text-info">Your Order history</h3>

          <ul className="m-auto order__list">
            {orders.map((order) => (
              <li key={order._id}>
                <div className="p-1 text-start order">
                  <div className="order__left">
                    <h6 className="text-warning">
                      Total {order.items.length} products.
                    </h6>
                    <h6 className="text-light">
                      Total ${order.price + order.shipment} (including shipment){" "}
                    </h6>
                  </div>
                  <div className="order__right">
                    <p className="order__date">
                      {moment(order.timestamp).format(
                        "MMMM Do YYYY, h:mm:ss a"
                      )}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h3 className="text-danger">
          Sorry !! You haven't place any order yet
        </h3>
      )}
    </div>
  );
}

export default MyOrders;
