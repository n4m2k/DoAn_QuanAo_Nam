import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import "./Home.css";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";
import { Link } from "react-router-dom";

const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  // const product = {
  //   name: "Blue Tshirt",
  //   images: [
  //     {
  //       url: "https://bizweb.dktcdn.net/thumb/grande/100/318/614/products/1-2-jpeg.jpg?v=1666759797000",
  //     },
  //   ],
  //   price: "200000",
  //   _id: "Nam",
  // };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Trang chủ"></MetaData>

          <div className="banner">
            <p>#STEPOUT COLLECTION | HODIDAY SEASON</p>
            <h1>HADES</h1>
            <a href="#container">
              <button>
                Kéo xuống <CgMouse></CgMouse>
              </button>
            </a>
          </div>
          <div className="category-1">
            <h1 className="hero-content">SẢN PHẨM MỚI</h1>
            <div className="product-list" id="container">
              {products &&
                products.map((product) => (
                  <ProductCard product={product}></ProductCard>
                ))}
            </div>
            <div className="btn-custome">
              <Link to="/products" className="button-custome">
                Xem tất cả
              </Link>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
