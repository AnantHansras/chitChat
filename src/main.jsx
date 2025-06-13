import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store } from "./store/store.jsx";
import { Provider } from "react-redux";
import { Auth0Provider } from "@auth0/auth0-react";
createRoot(document.getElementById("root")).render(
  <Auth0Provider
    domain="dev-603dj73x820iet0b.us.auth0.com"
    clientId="uuUxbIe2m05xG7TNst3GovaXJ8Cr0CFq"
    authorizationParams={{ redirect_uri: window.location.origin }}
  >
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </Auth0Provider>
);
