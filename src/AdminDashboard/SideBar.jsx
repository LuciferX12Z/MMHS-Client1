import { Menu, Layout } from "antd";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import classes from "./SideBar.module.css";
import { Link } from "react-router-dom";

const { Sider } = Layout;

const SideBar = () => {
  return (
    <Sider
      className={classes.sidebar}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "relative",
        left: 0,
        padding: 0,
        backgroundColor: "white",
      }}
    >
      <SideBarMenu />
    </Sider>
  );
};

export default SideBar;

export const SideBarMenu = () => (
  <Menu theme="light" mode="inline" defaultSelectedKeys={["1"]}>
    <Menu.Item key="1" icon={<BarChartOutlined />}>
      <Link to="/">
        <span>Dashboard</span>
      </Link>
    </Menu.Item>

    <Menu.Item key="2" icon={<UserOutlined />}>
      <span>Profile</span>
    </Menu.Item>
    <Menu.Item key="3" icon={<UploadOutlined />}>
      <span>Table</span>
    </Menu.Item>
    <Menu.Item key="4" icon={<BarChartOutlined />}>
      <span>Icon</span>
    </Menu.Item>
    <Menu.Item key="5" icon={<CloudOutlined />}>
      <span>Blank</span>
    </Menu.Item>
  </Menu>
);
