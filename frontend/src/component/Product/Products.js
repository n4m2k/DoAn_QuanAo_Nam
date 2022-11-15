import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = ["TOP", "BOTTOM", "JACKET", "SWEATER", "CAP", "ACCESSORIES"];
const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 1000000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const keyword = match.params.keyword;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };
  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  let count = filteredProductsCount;
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          {category ? (
            <MetaData title={`${category}`}></MetaData>
          ) : (
            <MetaData title="Sản phẩm"></MetaData>
          )}
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
                      {!category ? (
                        <span>Tất cả sản phẩm</span>
                      ) : (
                        <span>{category}</span>
                      )}
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="main-content">
                <div className="slide-bar">
                  <div className="title-slidebar">
                    <h2>Danh mục sản phẩm</h2>
                  </div>
                  <div className="slide">
                    <ul className="slide-list">
                      {categories.map((category) => (
                        <li
                          className="slide-item"
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          <p className="slide-a" to="#">
                            {category}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="filterBox">
                    <Typography className="title-slidebar-1">
                      Lọc theo giá
                    </Typography>
                    <Slider
                      className="filter-price"
                      value={price}
                      onChange={priceHandler}
                      valueLabelDisplay="auto"
                      aria-labelledby="range-slider"
                      min={0}
                      max={1000000}
                    />
                    <fieldset>
                      <Typography
                        component="legend"
                        className="title-slidebar-2"
                      >
                        Lọc theo đánh giá
                      </Typography>
                      <Slider
                        className="filter-rating"
                        value={ratings}
                        onChange={(e, newRating) => {
                          setRatings(newRating);
                        }}
                        aria-labelledby="continuous-rating"
                        min={0}
                        max={5}
                        valueLabelDisplay="auto"
                      ></Slider>
                    </fieldset>
                  </div>
                </div>
                <div className="category-product">
                  <div className="sort-category">
                    <div className="left-sort">
                      <h1>Tất cả sản phẩm</h1>
                    </div>
                  </div>
                  <div className="products">
                    <div className="product-list" id="container">
                      {products &&
                        products.map((product) => (
                          <ProductCard product={product}></ProductCard>
                        ))}
                    </div>
                  </div>
                  {resultPerPage < count && (
                    <div className="paginationBox">
                      <Pagination
                        activePage={currentPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setCurrentPageNo}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="First"
                        lastPageText="Last"
                        itemClass="page-item"
                        linkClass="page-link"
                        activeClass="pageItemActive"
                      ></Pagination>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
