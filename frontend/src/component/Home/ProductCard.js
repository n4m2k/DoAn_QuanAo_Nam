import React from "react";
import { Link } from "react-router-dom";
import Rating from "@mui/material/Rating";

const ProductCard = ({ product }) => {
  const options = {
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  return (
    <Link to={`/product/${product._id}`} className="productCart">
      <div className="product-item">
        <div className="product-thumbail">
          <div className="sale-top-right"> -20%</div>
          <div className="product-img">
            <div className="img-thumb">
              <img
                className="img-item"
                src={product.images[0].url}
                alt={product.name}
              />
            </div>
          </div>
        </div>
        <div className="product-info">
          <h3 className="product-name">
            <p className="product-name-a">{product.name}</p>
          </h3>
          <div>
            <Rating {...options}></Rating>
            <span className="productInfoSpan">
              ({product.numOfReviews} đánh giá)
            </span>
          </div>
          <div className="product-item-price">
            <span className="special-price">
              <span className="price product-price">{product.price}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
