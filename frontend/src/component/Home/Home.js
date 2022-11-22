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
  const categories = [
    "TOP",
    "BOTTOM",
    "JACKET",
    "SWEATER",
    "CAP",
    "ACCESSORIES",
  ];
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
            <div className="home-title">
              <h1 class="border">PHUONG NAM</h1>
              <h1 class="wave">PHUONG NAM</h1>
            </div>
            <a href="#container">
              <button>
                Kéo xuống <CgMouse></CgMouse>
              </button>
            </a>
          </div>
          <div className="module-interior">
            <div className="block-module">
              <Link to={`/products`}>
                <div className="ratiobox">
                  <img
                    className="lazyautosizes lazyloaded"
                    data-sizes="auto"
                    data-src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category1_new.png?v=326"
                    data-lowsrc="//theme.hstatic.net/1000306633/1000891824/14/block_home_category1_new.png?v=326"
                    src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category1_new.png?v=326"
                    alt="Tops"
                    sizes="496px"
                  />
                </div>
              </Link>
            </div>
            <div className="block-module">
              <Link to={`/products`}>
                <div className="ratiobox">
                  <img
                    className="lazyautosizes lazyloaded"
                    data-sizes="auto"
                    data-src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category2_new.png?v=326"
                    data-lowsrc="//theme.hstatic.net/1000306633/1000891824/14/block_home_category2_new.png?v=326"
                    src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category2_new.png?v=326"
                    alt="Tops"
                    sizes="496px"
                  />
                </div>
              </Link>
            </div>
            <div className="block-module">
              <Link to={`/products`}>
                <div className="ratiobox">
                  <img
                    className="lazyautosizes lazyloaded"
                    data-sizes="auto"
                    data-src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category3_new.png?v=326"
                    data-lowsrc="//theme.hstatic.net/1000306633/1000891824/14/block_home_category3_new.png?v=326"
                    src="//theme.hstatic.net/1000306633/1000891824/14/block_home_category3_new.png?v=326"
                    alt="Tops"
                    sizes="496px"
                  />
                </div>
              </Link>
            </div>
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
          <div className="site-animation wrapper-heading-home wrapper-heading-home-instagram">
            <div className="wrapper-animation2">
              <span className="text-animation-2">
                <h2>
                  <span>streetwear brand limited</span>
                </h2>
              </span>
              <span className="text-animation-2">
                <h2>
                  <span>streetwear brand limited</span>
                </h2>
              </span>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
