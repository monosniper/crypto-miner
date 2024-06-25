import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./styles/index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { BrowserRouter } from "react-router-dom";

import "./i18n.ts";

import "react-tooltip/dist/react-tooltip.css";
import "react-toastify/dist/ReactToastify.css";
import "react-phone-number-input/style.css";

import "swiper/css";
import { MetaMaskProvider } from "@metamask/sdk-react";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Provider store={store}>
      <MetaMaskProvider
        sdkOptions={{
          dappMetadata: {
            name: "Hogyx",
            url: window.location.href,
          },
        }}
      >
        <App />
      </MetaMaskProvider>
    </Provider>
  </BrowserRouter>
);
