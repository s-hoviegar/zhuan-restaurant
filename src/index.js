import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./fonts/Vazirmatn-Regular.ttf";
import "./fonts/Vazirmatn-Black.ttf";

import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./store/auth-context";
import { CartContextProvider } from "./store/cart-context";
import { LangContextProvider } from "./store/lang-context";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <LangContextProvider>
    <AuthContextProvider>
      <CartContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CartContextProvider>
    </AuthContextProvider>
  </LangContextProvider>
);
