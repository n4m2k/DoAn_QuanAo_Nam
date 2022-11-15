import React, { Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addItemsToCart, removeItemsFromCart } from "../../actions/cartAction";
import "./Cart.css";

const Cart = ({ history }) => {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const increaseQuantity = (id, quantity, stock) => {
    const newQty = quantity + 1;
    if (stock <= quantity) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const decreaseQuantity = (id, quantity) => {
    const newQty = quantity - 1;
    if (quantity <= 1) {
      return;
    }
    dispatch(addItemsToCart(id, newQty));
  };
  const removeCartItem = (id) => {
    dispatch(removeItemsFromCart(id));
  };
  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };
  return (
    <Fragment>
      {cartItems.length === 0 ? (
        <div className="container">
          <div className="category">
            <div className="break-crumb">
              <ul className="breakcrumb">
                <li className="home">
                  <Link to="/">Trang chủ </Link>
                  <span>/ </span>
                </li>
                <li>
                  <strong>
                    <span>Giỏ hàng</span>
                  </strong>
                </li>
              </ul>
            </div>
            <div className="main-content-1">
              <div className="shopping-cart">
                <div className="title-cart">
                  <h1 className="title-head">
                    <span>Giỏ hàng của bạn</span>
                  </h1>
                </div>
              </div>
              <div className="main-cart-page">
                <div className="cart-page">
                  <div className="cart-1">
                    <div>
                      <p style={{ marginBottom: 300 }}>
                        Không có sản phẩm nào. Quay lại{" "}
                        <Link to="/">cửa hàng</Link> để tiếp tục mua sắm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Fragment>
          <div className="container">
            <div className="category">
              <div className="break-crumb">
                <ul className="breakcrumb">
                  <li className="home">
                    <Link to="/">Trang chủ </Link>
                    <span>/ </span>
                  </li>
                  <li>
                    <strong>
                      <span>Giỏ hàng</span>
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="main-content-1">
                <div className="shopping-cart">
                  <div className="title-cart">
                    <h1 className="title-head">
                      <span>Giỏ hàng của bạn</span>
                    </h1>
                  </div>
                </div>
                <div className="main-cart-page">
                  <div className="cart-page">
                    <div className="cart-1">
                      <div>
                        <div className="bg-scroll">
                          <div className="cart-thead">
                            <div style={{ width: "18%" }} className="a-center">
                              Ảnh sản phẩm
                            </div>
                            <div style={{ width: "32%" }} className="a-center">
                              Tên sản phẩm
                            </div>
                            <div style={{ width: "17%" }} className="a-center">
                              <span>Đơn giá</span>
                            </div>
                            <div style={{ width: "14%" }} className="a-center">
                              Số lượng
                            </div>
                            <div style={{ width: "14%" }} className="a-center">
                              Thành tiền
                            </div>
                            <div style={{ width: "5%" }} className="a-center">
                              Xóa
                            </div>
                          </div>
                          {/* Sản phẩm */}
                          {cartItems &&
                            cartItems.map((item) => (
                              <div className="cart-tbody" key={item.product}>
                                <div className="item-cart">
                                  <div
                                    style={{ width: "18%" }}
                                    className="image-1"
                                  >
                                    <Link
                                      to={`/product/${item.product}`}
                                      className="product-image-cart"
                                    >
                                      <img src={item.image} alt="" />
                                    </Link>
                                  </div>
                                  <div
                                    style={{ width: "32%" }}
                                    className="a-center"
                                  >
                                    <h3 className="product-name-cart">
                                      <Link to={`/product/${item.product}`}>
                                        {item.name}
                                      </Link>
                                    </h3>
                                  </div>
                                  <div
                                    style={{ width: "17%" }}
                                    className="a-center"
                                  >
                                    <span className="item-cart-price">
                                      <span className="price">
                                        {item.price}
                                      </span>
                                    </span>
                                  </div>
                                  <div
                                    style={{ width: "14%" }}
                                    className="a-center"
                                  >
                                    <div className="input-qty-pr">
                                      <input
                                        type="text"
                                        className="type-check-number"
                                        value={item.quantity}
                                        readOnly
                                      />
                                      <button
                                        className="btn-plus"
                                        onClick={() =>
                                          increaseQuantity(
                                            item.product,
                                            item.quantity,
                                            item.stock
                                          )
                                        }
                                      >
                                        +
                                      </button>
                                      <button
                                        className="btn-minus"
                                        onClick={() => {
                                          decreaseQuantity(
                                            item.product,
                                            item.quantity
                                          );
                                        }}
                                      >
                                        -
                                      </button>
                                    </div>
                                  </div>
                                  <div
                                    style={{ width: "14%" }}
                                    className="a-center"
                                  >
                                    <span className="item-cart-price">
                                      <span className="price">
                                        {item.quantity * item.price}
                                      </span>
                                    </span>
                                  </div>
                                  <div
                                    style={{ width: "5%" }}
                                    className="a-center"
                                  >
                                    <div
                                      className="remove-item"
                                      onClick={() => {
                                        removeCartItem(item.product);
                                      }}
                                    >
                                      <span>
                                        <i className="fa-solid fa-trash" />
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                    <div className="footer-cart">
                      <div className="form-button-cart">
                        <Link to="/" className="cart-continue">
                          TIẾP TỤC MUA HÀNG
                        </Link>
                      </div>
                      <div className="shopping-cart-table">
                        <div className="table-total">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td className="total-text">Tạm tính</td>
                                <td className="total-price">{`${cartItems.reduce(
                                  (acc, item) =>
                                    acc + item.quantity * item.price,
                                  0
                                )}`}</td>
                              </tr>
                              <tr>
                                <td className="total-text total-text-end">
                                  Tổng tiền thanh toán
                                </td>
                                <td className="total-price total-price-end">
                                  {`${cartItems.reduce(
                                    (acc, item) =>
                                      acc + item.quantity * item.price,
                                    0
                                  )}`}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                        <button
                          className="btn-checkout-cart"
                          onClick={checkoutHandler}
                        >
                          Thanh toán
                        </button>
                      </div>
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

export default Cart;
