import React, { Fragment, useState } from "react";
import "./Header.css";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import Backdrop from "@mui/material/Backdrop";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import { useHistory } from "react-router-dom";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
const UserOptions = ({ user }) => {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const alert = useAlert();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const options = [
    {
      icon: <HomeOutlinedIcon></HomeOutlinedIcon>,
      name: "Trang chủ",
      func: home,
    },
    {
      icon: <ListAltIcon></ListAltIcon>,
      name: "Đơn hàng",
      func: orders,
    },
    {
      icon: (
        <ShoppingCartOutlinedIcon
          style={{ color: cartItems.length > 0 ? "#0089ff" : "unset" }}
        ></ShoppingCartOutlinedIcon>
      ),
      name: `Giỏ hàng(${cartItems.length})`,
      func: cart,
    },
    {
      icon: <PersonIcon></PersonIcon>,
      name: "Thông tin",
      func: account,
    },
    {
      icon: <ExitToAppIcon></ExitToAppIcon>,
      name: "Đăng xuất",
      func: logoutUser,
    },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <DashboardIcon></DashboardIcon>,
      name: "Quản lý",
      func: dashboard,
    });
  }
  function home() {
    history.push("/");
  }
  function cart() {
    history.push("/cart");
  }
  function dashboard() {
    history.push("/admin/dashboard");
  }
  function orders() {
    history.push("/orders");
  }
  function account() {
    history.push("/account");
  }
  function logoutUser() {
    dispatch(logout());
    alert.success("Đăng xuất thành công");
  }
  return (
    <Fragment>
      <Backdrop open={open} style={{ zIndex: "10" }}></Backdrop>
      <SpeedDial
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        className="speedDial"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : "Profile.png"}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          ></SpeedDialAction>
        ))}
      </SpeedDial>
    </Fragment>
  );
};

export default UserOptions;
