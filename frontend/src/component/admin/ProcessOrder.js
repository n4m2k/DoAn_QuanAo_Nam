import React, { Fragment, useEffect, useState } from "react";
import CheckoutSteps from "../Cart/CheckoutSteps";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import {
  getOrderDetails,
  clearErrors,
  updateOrder,
} from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import SideBar from "./SideBar";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import { UPDATE_ORDER_RESET } from "../../constants/orderConstants";
import "./processOrder.css";

const ProcessOrder = ({ history, match }) => {
  const { order, error, loading } = useSelector((state) => state.orderDetails);
  const { error: updateError, isUpdated } = useSelector((state) => state.order);

  const dispatch = useDispatch();

  const alert = useAlert();

  const [status, setStatus] = useState("");

  const updateOrderSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("status", status);

    dispatch(updateOrder(match.params.id, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Cập nhật đơn hàng thành công!");
      dispatch({ type: UPDATE_ORDER_RESET });
    }

    dispatch(getOrderDetails(match.params.id));
  }, [dispatch, error, alert, match.params.id, isUpdated, updateError]);
  return (
    <Fragment>
      <MetaData title="Đơn hàng"></MetaData>

      <div className="main-content-dashboard">
        <div className="dashboard">
          <SideBar></SideBar>
          <div className="newProductContainer">
            {loading ? (
              <Loader></Loader>
            ) : (
              <div
                className="confirmOrderPage"
                style={{
                  display:
                    order.orderStatus === "Đã giao hàng" ? "block" : "grid",
                }}
              >
                <div>
                  {/* <CheckoutSteps activeStep={1}></CheckoutSteps> */}
                  <div className="confirmShippingArea">
                    <Typography>Thông tin vận chuyển</Typography>
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
                  <div className="confirmCartItems">
                    <Typography>Giỏ hàng của bạn:</Typography>
                    <div className="confirmCartItemsContainer">
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
                                {" "}
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
                <div
                  style={{
                    display:
                      order.orderStatus === "Đã giao hàng" ? "none" : "block",
                  }}
                >
                  <form
                    className="updateOrderForm"
                    encType="multipart/form-data"
                    onSubmit={updateOrderSubmitHandler}
                  >
                    <h1>Cập nhật đơn hàng</h1>

                    <div>
                      <AccountTreeIcon></AccountTreeIcon>
                      <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="">Trạng thái</option>
                        {order.orderStatus === "Đang xử lý" && (
                          <option value="Đang vận chuyển">
                            Đang vận chuyển
                          </option>
                        )}
                        {order.orderStatus === "Đang vận chuyển" && (
                          <option value="Đã giao hàng">Đã giao hàng</option>
                        )}
                      </select>
                    </div>

                    <Button
                      id="createProductBtn"
                      type="Submit"
                      disabled={
                        loading ? true : false || status === "" ? true : false
                      }
                    >
                      Cập nhật sản phẩm
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default ProcessOrder;
