const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập Tên sản phẩm"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Vui lòng nhập Mô tả"],
  },
  price: { type: Number, required: [true, "Vui lòng nhập giá"] },
  salePrice: { type: Number },
  isPromotion: { type: Boolean },
  promotionPercent: { type: Number },
  isFreeShip: { type: Boolean },
  category: {
    type: String,
    required: [true, "Vui lòng nhập Danh mục sản phẩm"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  Stock: {
    type: Number,
    required: [true, "Vui lòng nhập Sản phẩm trong kho"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  size: { type: Array },
  idProduct: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Product", productSchema);
