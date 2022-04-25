import React, { useState } from "react";
import DATA from "./dummyData";
import { Drawer, Button, Menu } from "antd";
import SideBar, { SideBarMenu } from "./SideBar";
import classes from "./SideBar.module.css";
import { BarsOutlined } from "@ant-design/icons";
import SidebarToggleIcon from "./SidebarToggleIcon";

const shortNameBGColor = [
  "#3DDE3F",
  "#59A5FF",
  "#C446FF",
  "#FF4F4F",
  "#FF8946",
];

export const AdminDashboard = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  return (
    <>
      <div
        className={classes.drawerToggleButtonContainer}
        onClick={() => setOpenDrawer(true)}
      >
        <SidebarToggleIcon
          width="30pt"
          height="30pt"
          style={{ border: "1px solid lightGray", padding: "2px", margin: "2px", borderRadius : "5px" }}
        />
      </div>

      <div style={{ display: "flex" }}>
        <SideBar />

        {openDrawer && (
          <Drawer
            className={classes.drawer}
            title="Admin Dashboard"
            placement="left"
            visible={openDrawer}
            onClose={() => setOpenDrawer(false)}
            key={"left"}
            closable={false}
          >
            <div style={{ display: "flex", flexDirection: "column" }}>
              <SideBarMenu />
            </div>
          </Drawer>
        )}

        <div className="row" style={{ width: "100vw", margin: 0 }}>
          <div className="col-12 " style={{ paddingInline: 0 }}>
            <div className="card">
              <div className="table-responsive">
                <table className="table v-middle">
                  <thead>
                    <tr className="bg-light">
                      <th className="border-top-0">Admins</th>
                      <th className="border-top-0">E-mail</th>
                      <th className="border-top-0">Phone Number</th>
                      <th className="border-top-0">Role</th>
                      {/* <th className="border-top-0">Tickets</th> */}
                      <th className="border-top-0">Change Profile</th>
                      <th className="border-top-0">Remove Admin</th>
                    </tr>
                  </thead>
                  <tbody>
                    {DATA.map((data, index) => (
                      <tr key={index}>
                        <td>
                          <div className="d-flex align-items-center ">
                            <div
                              className="m-r-10"
                              style={{
                                backgroundColor:
                                  shortNameBGColor[
                                    Math.floor(
                                      Math.random() * shortNameBGColor.length
                                    )
                                  ],
                                borderRadius: "0.375rem",
                              }}
                            >
                              <a
                                className="btn btn-circle d-flex text-white  "
                                href="/admin"
                                style={{ width: 50, fontWeight: "bold" }}
                              >
                                {data.short_name}
                              </a>
                            </div>
                            <div className="" style={{ marginLeft: 5 }}>
                              <h4 className="m-b-0 font-16">{data.name}</h4>
                            </div>
                          </div>
                        </td>

                        <td>{data.email}</td>
                        <td>{data.phone}</td>
                        <td>
                          <label className="label label-danger">
                            {data.role}
                          </label>
                        </td>
                        {/* <td>{data.tickets}</td> */}
                        <td>
                          <Button
                            style={{
                              backgroundColor: "#0275D8",
                              color: "white",
                              borderRadius: "0.25rem",
                              height: "38px",
                              fontWeight: "bold",
                            }}
                          >
                            Edit
                          </Button>
                        </td>
                        <td>
                          <Button
                            style={{
                              backgroundColor: "#D21f1f",
                              color: "white",
                              borderRadius: "0.25rem",
                              height: "38px",
                              fontWeight: "bold",
                            }}
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
