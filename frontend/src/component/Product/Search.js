import React, { Fragment, useState } from "react";
import "./Search.css";
import MetaData from "../layout/MetaData";

const Search = ({ history }) => {
  const [keyword, setKeyWord] = useState("");

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };
  return (
    <Fragment>
      <MetaData title="Tìm kiếm"></MetaData>
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Tìm kiếm..."
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <input type="Submit" value="Tìm kiếm" />
      </form>
    </Fragment>
  );
};

export default Search;
