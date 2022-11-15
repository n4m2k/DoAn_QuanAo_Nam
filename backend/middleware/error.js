// const ErrorHander = require("../utils/errorhander");

const ErrorHander = require("../utils/errorhander");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Lỗi máy chủ";

  //Lỗi mongoDb id
  if (err.name === "CastError") {
    const message = `Đường dẫn sai. Không tồn tại: ${err.path}`;
    err = new ErrorHander(message, 400);
  }

  //Mongoose trùng Email
  if (err.code === 11000) {
    const message = `Trùng ${Object.keys(err.keyValue)}`;
    err = new ErrorHander(message, 400);
  }

  //Lỗi JWT
  if (err.name === "JsonWebTokenError") {
    const message = `Json Web Token đã tồn tại, thử lại`;
    err = new ErrorHander(message, 400);
  }

  //Lỗi JWT hết hạn
  if (err.name === "TokenExpiredError") {
    const message = `Json Web Token đã hết hạn, thử lại`;
    err = new ErrorHander(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};
