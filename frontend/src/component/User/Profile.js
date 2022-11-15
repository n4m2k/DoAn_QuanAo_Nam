import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import MetaData from "../layout/MetaData";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader/Loader";
import "./Profile.css";
const Profile = ({ history }) => {
  const { user, loading, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === false) {
      history.push("/login");
    }
  }, [history, isAuthenticated]);
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title={`${user.name}`}></MetaData>
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
                      <span>Thông tin cá nhân</span>
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="main-content">
                <div className="profileContainer">
                  <div>
                    <h1>Thông tin cá nhân</h1>
                    <img src={user.avatar.url} alt={user.name} />
                    <Link to="me/update">Sửa thông tin cá nhân</Link>
                  </div>
                  <div>
                    <div>
                      <h4>Họ tên</h4>
                      <p>{user.name}</p>
                    </div>
                    <div>
                      <h4>Email</h4>
                      <p>{user.email}</p>
                    </div>
                    <div>
                      <h4>Ngày đăng ký</h4>
                      <p>{String(user.createdAt).substr(0, 10)}</p>
                    </div>
                    <div>
                      <Link to="/orders">Đơn hàng của tôi</Link>
                      <Link to="/password/update">Đổi mật khẩu</Link>
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

export default Profile;
