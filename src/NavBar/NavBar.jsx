import React, { useContext, useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Nav, Navbar } from "react-bootstrap";
import logoImage from "../dummyImages/mmhs.png";
import { NavBarStyles } from "../Exporter/Exporter";
import { UserContext } from "../contexts/UserContext";
import axios from "axios";

export const NavBar = () => {
  const [expanded, setExpanded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useContext(UserContext);
  useEffect(() => {
    axios
      .get("http://localhost:5000/checkSession", { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        if (res.data.message === "ok") {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      });
  }, [isLoggedIn]);
  return (
    <Navbar
      expanded={expanded}
      expand="lg"
      variant="dark"
      style={{ backgroundColor: "#0275D8" }}
    >
      <Container fluid style={{ marginLeft: "2%", marginRight: "1%" }}>
        <Navbar.Brand>
          <Link to="/">
            <img src={logoImage} alt="logo" width="70px" height="37px" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          onClick={() => setExpanded(expanded ? false : "expanded")}
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ms-auto ps-3">
            <Nav.Link onClick={() => setExpanded(false)}>
              <Link
                to="/courses"
                className="nav-link"
                style={NavBarStyles.navLinks}
              >
                Courses
              </Link>
            </Nav.Link>

            <Nav.Link onClick={() => setExpanded(false)}>
              <Link
                to="/activities"
                className="nav-link"
                style={NavBarStyles.navLinks}
              >
                Activities
              </Link>
            </Nav.Link>

            <Nav.Link onClick={() => setExpanded(false)}>
              <Link
                to="/library"
                className="nav-link"
                style={NavBarStyles.navLinks}
              >
                Library
              </Link>
            </Nav.Link>

            {isLoggedIn ? (
              <>
                <Nav.Link onClick={() => setExpanded(false)}>
                  <Link
                    to="/register"
                    className="nav-link"
                    style={NavBarStyles.navLinks}
                  >
                    Register
                  </Link>
                </Nav.Link>
                <Nav.Link onClick={() => setExpanded(false)}>
                  <span
                    onClick={async () =>
                      await axios
                        .get("http://localhost:5000/logout", {
                          withCredentials: true,
                        })
                        .then((value) => {
                          if (value?.data?.message === "ok") {
                            setIsLoggedIn(false);
                            <Redirect to={"/"} />;
                          }
                        })
                    }
                    className="nav-link"
                    style={NavBarStyles.navLinks}
                  >
                    Logout
                  </span>
                </Nav.Link>{" "}
              </>
            ) : (
              <>
                <Nav.Link onClick={() => setExpanded(false)}>
                  <Link
                    to="/login"
                    className="nav-link"
                    style={NavBarStyles.navLinks}
                  >
                    Login
                  </Link>
                </Nav.Link>{" "}
              </>
            )}
          </Nav>
          <Nav></Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
