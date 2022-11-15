import React from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
const NotFound = () => {
  return (
    <div className="PageNotFound">
      <ErrorIcon></ErrorIcon>
      <Typography>Lỗi không tìm thấy trang</Typography>
      <p>
        Xin lỗi, chúng tôi không tìm thấy kết quả nào phù hợp. Xin vui lòng quay
        lại trang chủ
      </p>
      <Link to="/">Về trang chủ</Link>
    </div>
  );
};

export default NotFound;
