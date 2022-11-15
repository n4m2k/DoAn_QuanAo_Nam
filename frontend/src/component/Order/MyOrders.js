import React, { Fragment, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import "./myorders.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, myOrders } from "../../actions/orderAction";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import { Typography } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
const MyOrders = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { loading, error, orders } = useSelector((state) => state.myOrders);
  const { user } = useSelector((state) => state.user);
  const columns = [
    { field: "id", headerName: "ID", minWidth: 250, flex: 1 },
    {
      field: "status",
      headerName: "Trạng thái",
      minWidth: 150,
      flex: 0.5,
      cellClassName: (params) => {
        return params.getValue(params.id, "status") === "Đã giao hàng"
          ? "greenColor"
          : "redColor";
      },
    },
    {
      field: "itemsQty",
      headerName: "Số lượng ",
      type: "number",
      minWidth: 150,
      flex: 0.3,
    },
    {
      field: "amount",
      headerName: "Tổng tiền ",
      type: "number",
      minWidth: 270,
      flex: 0.5,
    },
    {
      field: "actions",
      headerName: "",
      type: "number",
      minWidth: 150,
      flex: 0.3,
      sortable: false,
      renderCell: (params) => {
        return (
          <Link to={`/order/${params.getValue(params.id, "id")}`}>
            <LaunchIcon></LaunchIcon>
          </Link>
        );
      },
    },
  ];
  const rows = [];
  orders &&
    orders.forEach((item, index) => {
      rows.push({
        itemsQty: item.orderItems.length,
        id: item._id,
        status: item.orderStatus,
        amount: item.totalPrice,
      });
    });
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(myOrders());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      <MetaData title={`${user.name}`}></MetaData>
      {loading ? (
        <Loader></Loader>
      ) : (
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
            <div className="main-content-orders">
              <div className="shopping-cart">
                <div className="title-cart">
                  <h1 className="title-head">
                    <span>Trang khách hàng</span>
                    <p>
                      <strong>
                        Xin chào,{" "}
                        <Link className="link-name" to="/account">
                          {user.name}
                        </Link>{" "}
                        !
                      </strong>
                    </p>
                  </h1>
                </div>
              </div>
              <div className="myOrdersPage">
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={10}
                  disableSelectionOnClick
                  className="myOrdersTable"
                  autoHeight
                ></DataGrid>
                <Typography id="myOrderHeading">Đơn hàng của tôi</Typography>
              </div>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default MyOrders;
