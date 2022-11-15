import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div className="footer">
      <div className="top-footer">
        <div className="container-footer">
          <div className="topfooter">
            <div className="row">
              <div className="footer-social">
                <h4>
                  <span>FOLLOW US</span>
                </h4>
                <div className="social">
                  <Link to="facebook.com">
                    <i className="fa-brands fa-facebook-f icon" />
                  </Link>
                  <Link to="facebook.com">
                    <i className="fa-brands fa-instagram icon" />
                  </Link>
                </div>
              </div>
              <div className="footer-social">
                <h4>
                  <span>HƯỚNG DẪN</span>
                </h4>
                <ul className="toggle">
                  <li>
                    <a href>Điều khoản</a>
                  </li>
                  <li>
                    <a href>Hướng dẫn mua hàng</a>
                  </li>
                  <li>
                    <a href>Chính sách đổi trả</a>
                  </li>
                  <li>
                    <a href>Bảo mật thông tin</a>
                  </li>
                  <li>
                    <a href>Chính sách thanh toán</a>
                  </li>
                </ul>
              </div>
              <div className="footer-social">
                <h4>
                  <span>CONTACT US</span>
                </h4>
                <div className="foot-contact">
                  <div className="foot-contact-item">
                    <span>
                      <i className="fa-sharp fa-solid fa-location-dot ic-contact" />
                      <p>Store I: Minh Khai, Hà Nội</p>
                    </span>
                  </div>
                  <div className="foot-contact-item">
                    <span>
                      <i className="fa-sharp fa-solid fa-location-dot ic-contact" />
                      <p>Store II: Long Biên, Hà Nội</p>
                    </span>
                  </div>
                  <div className="foot-contact-item">
                    <span>
                      <i className="fa-sharp fa-solid fa-location-dot ic-contact" />
                      <p>Store III: 463 Quang Trung, P.10, Q.Gò Vấp, TP.HCM</p>
                    </span>
                  </div>
                  <div className="foot-contact-item">
                    <span>
                      <i className="fa-sharp fa-solid fa-location-dot ic-contact" />
                      <p>
                        Store IV: G-Town 1, 350 Điện Biên Phủ, P.17, Q.Bình
                        Thạnh, TP.HCM
                      </p>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
