import React, { Fragment } from "react";
import CheckoutSteps from "./CheckoutSteps";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import "./ConfirmOrder.css";
const ConfirmOrder = ({ history }) => {
  const { shippingInfo, cartItems } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.user);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );

  const shippingCharges = subtotal > 1000000 ? 0 : 30000;

  const tax = subtotal * 0.01;

  const totalPrice = subtotal + tax + shippingCharges;

  const address = `${shippingInfo.address}, ${shippingInfo.city}, ${shippingInfo.state}, ${shippingInfo.country}`;

  const proceedPayment = () => {
    const data = {
      subtotal,
      shippingCharges,
      tax,
      totalPrice,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));

    history.push("/process/payment");
  };
  return (
    <Fragment>
      <MetaData title={"Xác nhận đơn hàng"}></MetaData>

      <div className="container">
        <div className="category">
          <div className="break-crumb">
            <ul className="breakcrumb">
              <li className="home">
                <Link to="/">Trang chủ </Link>
                <span> / </span>
              </li>
              <li>
                <strong>
                  <span>Chi tiết đơn hàng</span>
                </strong>
              </li>
            </ul>
          </div>

          <div className="main-content">
            <div className="confirmOrderPage">
              <div>
                <CheckoutSteps activeStep={1}></CheckoutSteps>
                <div className="confirmShippingArea">
                  <Typography>Thông tin vận chuyển</Typography>
                  <div className="confirmshippingAreaBox">
                    <div>
                      <p>Họ và tên:</p>
                      <span>{user.name}</span>
                    </div>
                    <div>
                      <p>Số điện thoại:</p>
                      <span>{shippingInfo.phoneNo}</span>
                    </div>
                    <div>
                      <p>Địa chỉ:</p>
                      <span>{address}</span>
                    </div>
                  </div>
                </div>
                <div className="confirmCartItems">
                  <Typography>Giỏ hàng của bạn:</Typography>
                  <div className="confirmCartItemsContainer">
                    {cartItems &&
                      cartItems.map((item) => (
                        <div key={item.product}>
                          <img src={item.image} alt="Product" />
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>{" "}
                          <span>
                            {item.quantity} X{" "}
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(item.price)}{" "}
                            ={" "}
                            <b>
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price * item.quantity)}
                            </b>
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
              <div>
                <div className="orderSummary">
                  <Typography>Tóm tắt đơn hàng</Typography>
                  <div>
                    <div>
                      <p>Tạm tính:</p>
                      <span>
                        {" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(subtotal)}
                      </span>
                    </div>
                    <div>
                      <p>Chi phí vận chuyển:</p>
                      <span>
                        {" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(shippingCharges)}
                      </span>
                    </div>
                    <div>
                      <p>Thuế:</p>
                      <span>
                        {" "}
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(tax)}
                      </span>
                    </div>
                  </div>

                  <div className="orderSummaryTotal">
                    <p>
                      <b>Tổng tiền:</b>
                    </p>
                    <span>
                      {" "}
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalPrice)}
                    </span>
                  </div>

                  <button onClick={proceedPayment}>Tiến hành thanh toán</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ConfirmOrder;
