import React, { Fragment, useEffect } from "react";
import "./orderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import { getOrderDetails, clearErrors } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
const OrderDetails = ({ match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const dispatch = useDispatch();
  const alert = useAlert();
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Chi tiết đơn hàng"></MetaData>
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
              <div className="main-content-order">
                <div className="orderDetailsPage">
                  <div className="orderDetailsContainer">
                    <Typography component="h1">
                      Đơn hàng #{order && order._id}
                    </Typography>
                    <Typography>Thông tin giao hàng</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p>Tên khách hàng: </p>
                        <span>{order.user && order.user.name}</span>
                      </div>
                      <div>
                        <p>Số điện thoại: </p>
                        <span>
                          {order.shippingInfo && order.shippingInfo.phoneNo}
                        </span>
                      </div>
                      <div>
                        <p>Địa chỉ: </p>
                        <span>
                          {order.shippingInfo &&
                            `${order.shippingInfo.address}, ${order.shippingInfo.city},${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                        </span>
                      </div>
                    </div>
                    <Typography>Thanh toán</Typography>
                    <div className="orderDetailsContainerBox">
                      <div>
                        <p
                          className={
                            order.paymentInfo &&
                            order.paymentInfo.status === "succeeded"
                              ? "greenColor"
                              : "redColor"
                          }
                        >
                          {order.paymentInfo &&
                          order.paymentInfo.status === "succeeded"
                            ? "Đã thanh toán"
                            : "Chưa thanh toán"}
                        </p>
                      </div>
                      <div>
                        <p>Tổng tiền: </p>

                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(order.totalPrice && order.totalPrice)}
                        </span>
                      </div>
                    </div>
                    <Typography>Trạng thái</Typography>
                    <div className="orderDetailsContainerBox">
                      <div
                        className={
                          order.orderStatus &&
                          order.orderStatus === "Đã giao hàng"
                            ? "greenColor"
                            : "redColor"
                        }
                      >
                        <p>{order.orderStatus && order.orderStatus}</p>
                      </div>
                    </div>
                  </div>

                  <div className="orderDetailsCartItems">
                    <Typography>Sản phẩm đã đặt:</Typography>
                    <div className="orderDetailsCartItemsContainer">
                      {order.orderItems &&
                        order.orderItems.map((item) => (
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
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;
