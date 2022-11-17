import React, { Fragment } from "react";
import "./notFound.css";
import { Link } from "react-router-dom";
import MetaData from "../MetaData";
const NotFound = () => {
  return (
    <Fragment>
      <MetaData title="404 Không tìm thấy trang"></MetaData>
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
                  <span>404 Không tìm thấy trang</span>
                </strong>
              </li>
            </ul>
          </div>
          <div className="main-content">
            <div className="PageNotFound">
              <h1>Lỗi không tìm thấy trang</h1>
              <p>
                Xin lỗi, chúng tôi không tìm thấy kết quả nào phù hợp. Xin vui
                lòng quay lại trang chủ
              </p>
              <Link to="/" className="btn-a">
                Về trang chủ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NotFound;
