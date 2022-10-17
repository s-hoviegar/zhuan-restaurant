import { useContext } from "react";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import Form from "react-bootstrap/Form";

import AuthContext from "../../store/auth-context";
import LangContext from "../../store/lang-context";
import classes from "./MainNavigation.module.css";
import Logo from "./Logo";

const MainNavigation = () => {
  const authCtx = useContext(AuthContext);
  const langCtx = useContext(LangContext);

  const isLoggedIn = authCtx.isLoggedIn;

  const logoutHandler = () => {
    authCtx.logout();
    // optional: redirect the user
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>
          <Logo />
        </div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/auth">
                <FormattedMessage
                  id="mainNavigation.loginBtn"
                  defaultMessage="Login"
                />
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/profile">
                <FormattedMessage
                  id="mainNavigation.profileBtn"
                  defaultMessage="Profile"
                />
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>
                <FormattedMessage
                  id="mainNavigation.logoutBtn"
                  defaultMessage="Logout"
                />
              </button>
            </li>
          )}
          <li>
            <Form.Select
              size="sm"
              aria-label="Select language"
              value={langCtx.lang}
              onChange={langCtx.selectLang}
            >
              <option value="en">EN</option>
              <option value="fa">FA</option>
            </Form.Select>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
