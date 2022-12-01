import React, { Fragment, useEffect, useRef, useState } from "react";
import "./LoginSignUp.css";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, login, register } from "../../actions/userAction";
import { useAlert } from "react-alert";
import MetaData from "../../component/layout/MetaData";
const LoginSignUp = ({ history, location }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    repassword: "",
  });
  const { name, email, password, repassword } = user;

  const [avatar, setAvatar] = useState();
  const [avatarPreview, setAvatarPreview] = useState("/Profile.png");
  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };
  function ValidateEmail(mail) {
    if (/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{3})+$/.test(mail)) {
      return true;
    }
    return false;
  }
  const registerSubmit = (e) => {
    e.preventDefault();
    const myForm = new FormData();
    if (ValidateEmail(email)) {
      if (repassword === password) {
        myForm.set("email", email);
        myForm.set("name", name);
        myForm.set("password", password);
        myForm.set("avatar", avatar);
        dispatch(register(myForm));
      } else {
        alert.error("Nhập lại mật khẩu không đúng!!!");
      }
    } else {
      alert.error("Email không đúng định dạng!!!");
    }
  };
  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (isAuthenticated) {
      history.push(redirect);
    }
  }, [dispatch, error, alert, history, isAuthenticated, redirect]);
  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };
  return (
    <Fragment>
      {loading ? (
        <Loader></Loader>
      ) : (
        <Fragment>
          <MetaData title="Đăng nhập"></MetaData>
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
                      <span>Đăng nhập</span>
                    </strong>
                  </li>
                </ul>
              </div>
              <div className="main-content">
                <div className="LoginSignUpContainer">
                  <div className="LoginSignUpBox">
                    <div>
                      <div className="login_signUp_toggle">
                        <p onClick={(e) => switchTabs(e, "login")}>ĐĂNG NHẬP</p>
                        <p onClick={(e) => switchTabs(e, "register")}>
                          ĐĂNG KÝ
                        </p>
                      </div>
                      <button ref={switcherTab}></button>
                    </div>
                    <form
                      className="loginForm"
                      ref={loginTab}
                      onSubmit={loginSubmit}
                    >
                      <div className="loginEmail">
                        <MailOutlineIcon></MailOutlineIcon>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          value={loginEmail}
                          onChange={(e) => setLoginEmail(e.target.value)}
                          className="emailInput"
                        />
                      </div>

                      <div className="loginPassword">
                        <LockOpenIcon></LockOpenIcon>
                        <input
                          type="password"
                          placeholder="Mật khẩu"
                          required
                          value={loginPassword}
                          onChange={(e) => setLoginPassword(e.target.value)}
                        />
                      </div>

                      <Link to="/password/forgot">Quên mật khẩu ?</Link>
                      <input
                        type="submit"
                        value="ĐĂNG NHẬP"
                        className="loginBtn"
                      />
                    </form>
                    <form
                      className="signUpForm"
                      ref={registerTab}
                      encType="multipart/form-data"
                      onSubmit={registerSubmit}
                    >
                      <div className="signUpName">
                        <FaceIcon />
                        <input
                          type="text"
                          placeholder="Họ và tên"
                          required
                          name="name"
                          value={name}
                          onChange={registerDataChange}
                        />
                        <span class="input-border"></span>
                      </div>
                      <div className="signUpEmail">
                        <MailOutlineIcon></MailOutlineIcon>
                        <input
                          type="email"
                          placeholder="Email"
                          required
                          name="email"
                          value={email}
                          onChange={registerDataChange}
                        />
                        <span class="input-border"></span>
                      </div>
                      <div className="signUpPassword">
                        <LockOpenIcon></LockOpenIcon>
                        <input
                          type="password"
                          placeholder="Mật khẩu"
                          required
                          name="password"
                          value={password}
                          onChange={registerDataChange}
                        />
                        <span class="input-border"></span>
                      </div>
                      <div className="signUpPassword">
                        <LockOpenIcon></LockOpenIcon>
                        <input
                          type="password"
                          placeholder="Nhập lại mật khẩu"
                          required
                          name="repassword"
                          value={repassword}
                          onChange={registerDataChange}
                        />
                        <span class="input-border"></span>
                      </div>
                      <div id="registerImage">
                        <img src={avatarPreview} alt="Avatar Preview" />
                        <input
                          type="file"
                          name="avatar"
                          accept="image/*"
                          onChange={registerDataChange}
                        />
                      </div>
                      <input
                        type="submit"
                        value="ĐĂNG KÝ"
                        className="signUpBtn"
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
  );
};

export default LoginSignUp;
