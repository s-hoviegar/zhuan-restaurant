import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useIntl } from "react-intl";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store/auth-context";

import "./index.css";
import AboutPage from "./pages/AboutPage";

function App() {
  const authCtx = useContext(AuthContext);
  const intl = useIntl();
  if (intl.locale === "fa") {
    document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
  } else {
    document.getElementsByTagName("html")[0].setAttribute("dir", "ltr");
  }

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/about" exact>
          <AboutPage />
        </Route>
        {!authCtx.isLoggedIn && (
          <Route path="/auth">
            <AuthPage />
          </Route>
        )}
        <Route path="/profile">
          {authCtx.isLoggedIn && <UserProfile />}
          {!authCtx.isLoggedIn && <Redirect to="/auth" />}
        </Route>
        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
