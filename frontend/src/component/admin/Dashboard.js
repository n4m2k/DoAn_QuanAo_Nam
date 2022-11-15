import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProduct } from "../../actions/productAction";
import { Link } from "react-router-dom";
import SideBar from "./SideBar";
import "./dashboard.css";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { getAllOrders } from "../../actions/orderAction";
import { getAllUsers } from "../../actions/userAction";

const Dashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders } = useSelector((state) => state.allOrders);
  const { users } = useSelector((state) => state.allUsers);
  const dispatch = useDispatch();

  let outOfStock = 0;
  products &&
    products.forEach((item) => {
      if (item.Stock === 0) {
        outOfStock += 1;
      }
    });

  useEffect(() => {
    dispatch(getAdminProduct());
    dispatch(getAllOrders());
    dispatch(getAllUsers);
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });
  const lineState = {
    labels: ["Tiền ban đầu", "Tiền kiếm được"],
    datasets: [
      {
        label: "Doanh thu",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };
  const doughnutState = {
    labels: ["Hết hàng", "Còn hàng"],
    datasets: [
      {
        backgroundColor: ["#00A6B4", "#6800B4"],
        hoverBackgroundColor: ["#4B5000", "#35014F"],
        data: [outOfStock, products.length - outOfStock],
      },
    ],
  };

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
                <span>Trang khách hàng</span>
              </strong>
            </li>
          </ul>
        </div>
        <div className="main-content-dashboard">
          <div className="dashboard">
            <SideBar></SideBar>
            <div className="dashboardContainer">
              <Typography component="h1">QUẢN LÝ</Typography>
              <div className="dashboardSummary">
                <div>
                  <p>
                    Doanh thu <br /> {totalAmount}
                  </p>
                </div>
                <div className="dashboardSummaryBox2">
                  <Link to="/admin/products">
                    <p>Sản phẩm</p>
                    <p>{products && products.length}</p>
                  </Link>
                  <Link to="/admin/orders">
                    <p>Đơn hàng</p>
                    <p>{orders && orders.length}</p>
                  </Link>
                  <Link to="/admin/users">
                    <p>Người dùng</p>
                    <p>{users && users.length}</p>
                  </Link>
                </div>
              </div>
              <div className="lineChart">
                <Line data={lineState}></Line>
              </div>
              <div className="doughnutChart">
                <Doughnut data={doughnutState}></Doughnut>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
