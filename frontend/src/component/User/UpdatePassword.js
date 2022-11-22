import React, { Fragment, useEffect, useState } from "react";
import "./UpdatePassword.css";
import Loader from "../layout/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useAlert } from "react-alert";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import MetaData from "../../component/layout/MetaData";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
const UpdatePassword = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, isUpdated, loading } = useSelector((state) => state.profile);

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const updatePasswordSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.set("oldPassword", oldPassword);
    myForm.set("newPassword", newPassword);
    myForm.set("confirmPassword", confirmPassword);
    dispatch(updatePassword(myForm));
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      alert.success("Thay đổi mật khẩu thành công");
      history.push("/account");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }
  }, [dispatch, error, alert, history, isUpdated]);
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
                  <div className="updatePasswordContainer">
                    <div className="updatePasswordBox">
                      <h2 className="updatePasswordHeading">Đổi mật khẩu</h2>
                      <form
                        className="updatePasswordForm"
                        onSubmit={updatePasswordSubmit}
                      >
                        <div className="loginPassword">
                          <VpnKeyIcon></VpnKeyIcon>
                          <input
                            type="password"
                            placeholder="Mật khẩu cũ"
                            required
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                          />
                        </div>
                        <div className="loginPassword">
                          <LockOpenIcon></LockOpenIcon>
                          <input
                            type="password"
                            placeholder="Mật khẩu mới"
                            required
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                          />
                        </div>
                        <div className="loginPassword">
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
                          className="updatePasswordBtn"
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

export default UpdatePassword;
