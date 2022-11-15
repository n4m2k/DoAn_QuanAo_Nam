import React, { Fragment, useState } from "react";
import "./Shipping.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { saveShippingInfo } from "../../actions/cartAction";
import MetaData from "../layout/MetaData";
// import PinDropIcon from "@mui/icons-material/PinDrop";
import HomeIcon from "@mui/icons-material/Home";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import PublicIcon from "@mui/icons-material/Public";
import PhoneIcon from "@mui/icons-material/Phone";
import TransferWithinAStationIcon from "@mui/icons-material/TransferWithinAStation";
import { Country, State } from "country-state-city";
import CheckoutSteps from "../Cart/CheckoutSteps";
const Shipping = ({ history }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { shippingInfo } = useSelector((state) => state.cart);

  const [address, setAddress] = useState(shippingInfo.address);
  const [city, setCity] = useState(shippingInfo.city);
  const [state, setState] = useState(shippingInfo.state);
  const [country, setCountry] = useState(shippingInfo.country);
  // const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
  const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

  const shippingSubmit = (e) => {
    e.preventDefault();
    if (phoneNo.length < 10 || phoneNo.length > 10) {
      alert.error("Số điện thoại không hợp lệ ");
      return;
    }
    dispatch(
      saveShippingInfo({
        address,
        city,
        state,
        country,
        pinCode: "10000",
        phoneNo,
      })
    );
    history.push("/order/comfirm");
  };
  return (
    <Fragment>
      <MetaData title="Chi tiết đơn hàng"></MetaData>
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
                  <span>Chi tiết đơn hàng</span>
                </strong>
              </li>
            </ul>
          </div>
          <div className="main-content">
            <div className="shippingContainer">
              <CheckoutSteps activeStep={0}></CheckoutSteps>
              <div className="shippingBox">
                <h2 className="shippingHeading">Chi tiết đơn hàng</h2>
                <form
                  className="shippingForm"
                  encType="multipart/form-data"
                  onSubmit={shippingSubmit}
                >
                  <div>
                    <HomeIcon></HomeIcon>
                    <input
                      type="text"
                      placeholder="Địa chỉ"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <LocationCityIcon></LocationCityIcon>
                    <input
                      type="text"
                      placeholder="Quận"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                    />
                  </div>
                  {/* <div>
                    <PinDropIcon></PinDropIcon>
                    <input
                      type="number"
                      placeholder="Mã PIN"
                      required
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                    />
                  </div> */}
                  <div>
                    <PhoneIcon></PhoneIcon>
                    <input
                      type="number"
                      placeholder="Số điện thoại"
                      required
                      value={phoneNo}
                      onChange={(e) => setPhoneNo(e.target.value)}
                    />
                  </div>
                  <div>
                    <PublicIcon></PublicIcon>
                    <select
                      required
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Country</option>
                      {Country &&
                        Country.getAllCountries().map((item) => (
                          <option key={item.isoCode} value={item.isoCode}>
                            {item.name}
                          </option>
                        ))}
                    </select>
                  </div>
                  {country && (
                    <div>
                      <TransferWithinAStationIcon></TransferWithinAStationIcon>
                      <select
                        required
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                      >
                        <option value="">State</option>
                        {State &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </div>
                  )}
                  <input
                    type="submit"
                    value="Tiếp tục"
                    className="shippingBtn"
                    disabled={state ? false : true}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Shipping;
