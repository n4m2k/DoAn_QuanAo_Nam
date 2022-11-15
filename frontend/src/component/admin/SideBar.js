import React from "react";
import "./slidebar.css";

import { Link } from "react-router-dom";
import { TreeItem, TreeView } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PostAddIcon from "@mui/icons-material/PostAdd";
import AddIcon from "@mui/icons-material/Add";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import ListAltIcon from "@mui/icons-material/ListAlt";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import RateReviewIcon from "@mui/icons-material/RateReview";
const SideBar = () => {
  return (
    <div className="sidebar">
      <Link to="/">
        <img
          src="https://theme.hstatic.net/1000306633/1000891824/14/logo_menu_no_scroll.png?v=282"
          alt="logo"
        />
      </Link>
      <Link to="/admin/dashboard">
        <p>
          <DashboardIcon></DashboardIcon>Dashboard
        </p>
      </Link>
      <Link to="/admin/dashboard">
        <TreeView
          defaultCollapseIcon={<ExpandMoreIcon></ExpandMoreIcon>}
          defaultExpandIcon={<ImportExportIcon></ImportExportIcon>}
        >
          <TreeItem nodeId="1" label="Sản phẩm">
            <Link to="/admin/products">
              <TreeItem
                nodeId="2"
                label="Tất cả"
                icon={<PostAddIcon></PostAddIcon>}
              ></TreeItem>
            </Link>
            <Link to="/admin/product">
              <TreeItem
                nodeId="3"
                label="Thêm sản phẩm"
                icon={<AddIcon></AddIcon>}
              ></TreeItem>
            </Link>
          </TreeItem>
        </TreeView>
      </Link>
      <Link to="/admin/orders">
        <p>
          <ListAltIcon></ListAltIcon>Đơn hàng
        </p>
      </Link>
      <Link to="/admin/users">
        <p>
          <PeopleIcon></PeopleIcon>Người dùng
        </p>
      </Link>
      <Link to="/admin/reviews">
        <p>
          <RateReviewIcon></RateReviewIcon>Đánh giá
        </p>
      </Link>
    </div>
  );
};

export default SideBar;
