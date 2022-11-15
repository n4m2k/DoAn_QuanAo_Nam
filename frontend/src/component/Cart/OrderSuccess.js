import React from "react";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
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
                <span>Thanh toán</span>
              </strong>
            </li>
          </ul>
        </div>
        <div className="main-content">
          <div className="orderSuccess">
            <CheckCircleIcon></CheckCircleIcon>
            <Typography>Bạn đã đặt hàng thành công!!</Typography>
            <Link to="/orders">Xem đơn hàng</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;
