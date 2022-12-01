import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../actions/productAction";
import ReviewCard from "./ReviewCard";
import { useAlert } from "react-alert";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import { addItemsToCart } from "../../actions/cartAction";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import { NEW_REVIEW_RESET } from "../../constants/productConstants";
const ProductDetails = ({ match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );
  const options = {
    // size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      alert.error("Sản phẩm trong kho không đủ");
      return;
    }
    const qty = quantity + 1;
    setQuantity(qty);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) {
      return;
    }
    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Thêm sản phẩm vào giỏ hàng thành công");
  };

  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success("Đánh giá thành công");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, alert, error, reviewError, success]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={`${product.name}`}></MetaData>
          <div className="container">
            <div className="category">
              <div className="break-crumb">
                <ul className="breakcrumb">
                  <li className="home">
                    <Link to="/">Trang chủ </Link>
                    <span> / </span>
                    <span>Chi tiết sản phẩm</span>
                    <span> / </span>
                  </li>
                  <li>
                    <strong>
                      <span>{product.name}</span>
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="main-content">
                <div className="details-product">
                  <div className="details-img">
                    <Carousel>
                      {product.images &&
                        product.images.map((item, i) => (
                          <img
                            className="CarouselImage"
                            key={item.url}
                            src={item.url}
                            alt={`${i} Slide`}
                          />
                        ))}
                    </Carousel>
                  </div>
                  <div className="details-info">
                    <div className="details-name">{product.name}</div>
                    <div className="group-status">
                      <span className="first-status">
                        <span className="a_name">Thương hiệu:</span>
                        <span className="status_name">NEED OF WISDOM</span>
                        <span className> | </span>
                      </span>

                      <span className="first-status">
                        <span className="a_name">Tình trạng:</span>
                        <span className="status_name">
                          <b
                            className={
                              product.Stock < 1 ? "redColor" : "blueColor"
                            }
                          >
                            {product.Stock < 1 ? "Hết hàng" : "Còn hàng"}
                          </b>
                        </span>
                      </span>
                    </div>
                    <div className="details-price">
                      <span className="details-product-price">
                        {new Intl.NumberFormat("vi-VN", {
                          style: "currency",
                          currency: "VND",
                        }).format(product.price)}
                      </span>
                    </div>
                    <div className="detailsBlock-2">
                      <Rating {...options}></Rating>
                      <span className="numReview">
                        ({product.numOfReviews} đánh giá)
                      </span>
                    </div>
                    <div className="product-sumary">
                      <div className="description">
                        NEEDS OF WISDOM® / Streetwear / Based in Saigon / Made
                        in Vietnam
                      </div>
                    </div>
                    <div className="swatch">
                      <div className="swatch-header">Kích thước</div>
                      <div className="swatch-element">
                        <input
                          id="swatch-0-S"
                          type="radio"
                          name="option-0"
                          defaultValue="S"
                        />
                        <label htmlFor="swatch-0-S">S</label>
                      </div>
                      <div className="swatch-element">
                        <input
                          id="swatch-0-S"
                          type="radio"
                          name="option-0"
                          defaultValue="S"
                        />
                        <label htmlFor="swatch-0-S">M</label>
                      </div>
                      <div className="swatch-element">
                        <input
                          id="swatch-0-S"
                          type="radio"
                          name="option-0"
                          defaultValue="S"
                        />
                        <label htmlFor="swatch-0-S">L</label>
                      </div>
                      <div className="swatch-element">
                        <input
                          id="swatch-0-S"
                          type="radio"
                          name="option-0"
                          defaultValue="S"
                        />
                        <label htmlFor="swatch-0-S">XL</label>
                      </div>
                    </div>

                    <div className="form-product">
                      <header>Số lượng:</header>
                      <div className="custom-btn-number">
                        <button
                          className="btn-num num-1"
                          onClick={decreaseQuantity}
                        >
                          -
                        </button>
                        <button
                          className="btn-num num-2"
                          onClick={increaseQuantity}
                        >
                          +
                        </button>
                        <input
                          type="number"
                          className="prd-quantity"
                          readOnly
                          name="quantity"
                          value={quantity}
                        />
                      </div>
                      <button
                        disabled={product.Stock < 1 ? true : false}
                        className="btn-cart"
                        onClick={addToCartHandler}
                      >
                        Thêm vào giỏ hàng
                      </button>
                      <div>
                        <button
                          className="btn-review"
                          onClick={submitReviewToggle}
                        >
                          Đánh giá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="ds-product">
                <div className="product-tab">
                  <ul className="tab-tittle">
                    <li className="tab-link">
                      <h3>
                        <span>Mô tả</span>
                      </h3>
                    </li>
                  </ul>
                  <div className="tab-float">
                    <div className="tab-content">
                      <div className="rte">
                        <p>{product.description}</p>
                      </div>
                    </div>
                  </div>
                  <h3 className="review-Heading">Đánh giá:</h3>
                  <Dialog
                    aria-labelledby="simple-dialog-title"
                    open={open}
                    onClose={submitReviewToggle}
                  >
                    <DialogTitle>Đánh giá sản phẩm</DialogTitle>
                    <DialogContent className="submitDialog">
                      <Rating
                        onChange={(e) => setRating(e.target.value)}
                        value={rating}
                        size="large"
                      ></Rating>
                      <textarea
                        className="submitDialogTextArea"
                        cols="30"
                        rows="5"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={submitReviewToggle} color="secondary">
                        Hủy
                      </Button>
                      <Button onClick={reviewSubmitHandler} color="primary">
                        Gửi
                      </Button>
                    </DialogActions>
                  </Dialog>
                  <div>
                    {product.reviews && product.reviews[0] ? (
                      <div className="reviews">
                        {product.reviews &&
                          product.reviews.map((review) => (
                            <ReviewCard review={review} />
                          ))}
                      </div>
                    ) : (
                      <p className="noReviews">Chưa có đánh giá</p>
                    )}
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

export default ProductDetails;
