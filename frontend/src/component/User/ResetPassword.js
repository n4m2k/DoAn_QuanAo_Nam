import React, { Fragment, useEffect, useState } from "react";
import "./ResetPassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../component/layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const ResetPassword = ({ history, match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, success, loading } = useSelector(
    (state) => state.forgotPassword
  );

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const resetPasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("password", password);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(resetPassword(match.params.token, myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Thay đổi mật khẩu thành công");
      history.push("/login");
    }
  }, [dispatch, error, alert, history, success]);
  return (
    <div>
      <Fragment>
        {loading ? (
          <Loader></Loader>
        ) : (
          <Fragment>
            <MetaData title="Đổi mật khẩu"></MetaData>
            <div className="container">
              <div className="category">
                {/* <div className="break-crumb">
              <ul className="breakcrumb">
                <li className="home">
                  <Link to="/">Trang chủ </Link>
                  <span> / </span>
                </li>
                <li>
                  <strong>
                    <span>Sửa thông tin</span>
                  </strong>
                </li>
              </ul>
            </div> */}
                <div className="main-content">
                  <div className="resetPasswordContainer">
                    <div className="resetPasswordBox">
                      <h2 className="resetPasswordHeading">Đổi mật khẩu</h2>
                      <form
                        className="resetPasswordForm"
                        onSubmit={resetPasswordSubmit}
                      >
                        <div>
                          <LockOpenIcon></LockOpenIcon>
                          <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div>
                          <LockOutlinedIcon></LockOutlinedIcon>
                          <input
                            type="password"
                            placeholder="Nhập lại mật khẩu"
                            required
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                        </div>
                        <input
                          type="submit"
                          value="ĐỔI MẬT KHẨU"
                          className="resetPasswordBtn"
                        />
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    </div>
  );
};

export default ResetPassword;
