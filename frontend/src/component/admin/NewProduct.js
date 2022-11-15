import React, { Fragment, useState, useEffect } from "react";
import "./newProduct.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from "@mui/material";
import MetaData from "../layout/MetaData";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import DescriptionIcon from "@mui/icons-material/Description";
import StorageIcon from "@mui/icons-material/Storage";
import SpellcheckIcon from "@mui/icons-material/Spellcheck";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import SideBar from "./SideBar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
// import AccountTree from "@mui/icons-material/AccountTree";
const NewProduct = ({ history }) => {
  const categories = [
    "TOP",
    "BOTTOM",
    "JACKET",
    "SWEATER",
    "CAP",
    "ACCESSORIES",
  ];
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, error, success } = useSelector((state) => state.newProduct);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Thêm sản phẩm thành công");
      history.push("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, success, history]);

  const createProductHandler = (e) => {
    e.preventDefault();
    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };
  return (
    <Fragment>
      <MetaData title="Thêm sản phẩm"></MetaData>
      <div className="main-content-dashboard">
        <div className="dashboard">
          <SideBar></SideBar>
          <div className="newProductContainer">
            <form
              className="createProductForm"
              encType="multipart/form-data"
              onSubmit={createProductHandler}
            >
              <h1>Thêm sản phẩm</h1>
              <div>
                <SpellcheckIcon></SpellcheckIcon>
                <input
                  type="text"
                  placeholder="Tên sản phẩm"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div>
                <AttachMoneyIcon></AttachMoneyIcon>
                <input
                  type="number"
                  placeholder="Giá"
                  required
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div>
                <DescriptionIcon></DescriptionIcon>
                <textarea
                  cols="30"
                  rows="1"
                  placeholder="Mô tả sản phẩm"
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>

              <div>
                <AccountTreeIcon></AccountTreeIcon>
                <select onChange={(e) => setCategory(e.target.value)}>
                  <option value="">Chọn danh mục</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <StorageIcon></StorageIcon>
                <input
                  type="number"
                  placeholder="Số lượng"
                  required
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div id="createProductFormFile">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  onChange={createProductImagesChange}
                />
              </div>
              <div id="createProductFormImage">
                {imagesPreview.map((image, index) => (
                  <img key={index} src={image} alt="Product Preview" />
                ))}
              </div>
              <Button
                id="createProductBtn"
                type="Submit"
                disabled={loading ? true : false}
              >
                Thêm sản phẩm
              </Button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
