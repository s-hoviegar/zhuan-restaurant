import { Fragment } from "react";
import Footer from "./Footer";

import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <Fragment>
      <div
        style={{
          gridGap: "2px",
          minHeight: "100vh",
          minWidth: 0 /* needed for Firefox */,
          margin: 0,
          display: "grid",
          gridTemplateRows: "auto 1fr auto",
        }}
      >
        <MainNavigation />
        <main
          style={{
            overflow: "hidden",
            minWidth: 0 /* needed for Firefox */,
          }}
        >
          {props.children}
        </main>
        <Footer />
      </div>
    </Fragment>
  );
};

export default Layout;
