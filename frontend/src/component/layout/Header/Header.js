import React, { Fragment } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import { useSelector } from "react-redux";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);
  const total = cartItems.reduce(
    (acc, item) => acc + item.quantity * item.price,
    0
  );
  return (
    <div className="header">
      <div className="header-2">
        <div className="topbar">
          <div className="left-topbar">
            <span>
              Hotline: <a href="tel:0373575340">0373575340</a>
            </span>
          </div>
          <div className="right-topbar">
            <ul className="right-topbar-list">
              <li className="right-topbar-item">
                {/* <Link to="/login">
                  <AccountBoxIcon />
                </Link> */}
              </li>
              <li className="right-topbar-item">
                <Link to="#">Liên hệ</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="header-logo">
          <Link to="/">
            <img
              src="https://theme.hstatic.net/1000306633/1000891824/14/logo_menu_no_scroll.png?v=160"
              alt=""
            />
          </Link>
        </div>
        <div className="header-nav">
          <div className="left-nav-bar">
            <ul className="nav-list">
              <li>
                <Link to="/">HOME</Link>
              </li>
              <li>
                <Link to="/products">CLOTHING</Link>
                {/* <i className="fa-solid fa-chevron-down ic-down" />
                <ul className="subnav">
                  <li>
                    <a to="#">TEE</a>
                  </li>
                  <li>
                    <a to="#">JACKET</a>
                  </li>
                  <li>
                    <a to="#">HOODIE</a>
                  </li>
                  <li>
                    <a to="#">SWEATER</a>
                  </li>
                  <li>
                    <a to="#">BOTTOM</a>
                  </li>
                  <li>
                    <a to="#">ACCESSORIES</a>
                  </li>
                </ul> */}
              </li>
              <li>
                <Link to="/contact">CONTACT</Link>
              </li>
            </ul>
          </div>
          <div className="right-nav-bar">
            <Link to="/search">
              <i className="fa-solid fa-magnifying-glass size-1"></i>
            </Link>

            <div className="header_cart">
              <Link to="/cart">
                <ShoppingBagOutlinedIcon className="size"></ShoppingBagOutlinedIcon>
                <span className="header-cart-num">{cartItems.length}</span>
                {/* khong cos sp: header__cart_list_no_cart */}
                <div className="header__cart_list">
                  {cartItems.length === 0 ? (
                    <p className="text_cart">
                      Chưa có sản phẩm nào trong giỏ hàng
                    </p>
                  ) : (
                    <Fragment>
                      {cartItems.map((item) => (
                        <ul className="cart_list_item">
                          <li className="cart_list_item1">
                            <img
                              src={item.image}
                              alt=""
                              className="header_cart_item1"
                            />
                            <div className="cart_item_info">
                              <h5 className="cart_text_pd">{item.name}</h5>
                              <span className="cart_pd_price">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(item.price)}
                              </span>
                              <span className="cart_pd_multiply">x</span>
                              <span className="cart_pd_qnt">
                                {item.quantity}
                              </span>
                            </div>
                            <div className="cart_item_info1">
                              {/* <i className="fa-solid fa-xmark" /> */}
                            </div>
                          </li>
                        </ul>
                      ))}
                      <div className="border_bt_cart" />
                      <div className="tong">
                        <span className="tong_gia">Tổng cộng :</span>
                        <span>
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(total)}{" "}
                        </span>
                      </div>
                      <div className="border_bt_cart" />
                      <button className="btn_cart_pd">Xem giỏ hàng</button>
                    </Fragment>
                  )}
                </div>
              </Link>
            </div>
            <Link to="/login" className="lgin-size">
              <AccountCircleOutlinedIcon className="size" />
            </Link>
          </div>
        </div>
        <div className="line-bottom"></div>
      </div>
    </div>
  );
};

export default Header;
