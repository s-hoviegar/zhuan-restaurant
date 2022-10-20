import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import { MdOutlineChangeCircle } from "react-icons/md";

import AuthContext from "../../store/auth-context";
import LangContext from "../../store/lang-context";
import Logo from "./Logo";

import classes from "./MainNavigation.module.css";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  const changeLang = () => {
    langCtx.changeLang();
  };

  return (
    <Navbar sticky="top" bg="dark" variant="dark" expand="lg">
      <Container className={classes.header}>
        <Navbar.Brand>
          <Link to="/">
            <div className={classes.logo}>
              <Logo />
            </div>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar-nav" />
        <Navbar.Collapse id="main-navbar-nav" className="justify-content-end">
          <Nav>
            <Nav.Item>
              <Link to="/">
                <Button variant="outline-light">
                  <FormattedMessage
                    id="mainNavigation.menuBtn"
                    defaultMessage="Restaurant Menu"
                  />
                </Button>
              </Link>
            </Nav.Item>
            {!isLoggedIn && (
              <Nav.Item>
                <Link to="/auth">
                  <Button variant="outline-light">
                    <FormattedMessage
                      id="mainNavigation.loginBtn"
                      defaultMessage="Login"
                    />
                  </Button>
                </Link>
              </Nav.Item>
            )}
            {isLoggedIn && (
              <>
                <Nav.Item>
                  <Link to="/profile">
                    <Button variant="outline-light">
                      <FormattedMessage
                        id="mainNavigation.profileBtn"
                        defaultMessage="Profile"
                      />
                    </Button>
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Button variant="outline-light" onClick={logoutHandler}>
                    <FormattedMessage
                      id="mainNavigation.logoutBtn"
                      defaultMessage="Logout"
                    />
                  </Button>
                </Nav.Item>
              </>
            )}
            <Nav.Item>
              <Button variant="outline-light" onClick={changeLang}>
                <MdOutlineChangeCircle size={23} />
                <FormattedMessage
                  id="mainNavigation.changeLangBtn"
                  defaultMessage=" Lang: "
                />
                {langCtx.lang.toUpperCase()}
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavigation;
