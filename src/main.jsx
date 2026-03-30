import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import { Bounce, ToastContainer } from "react-toastify";
import { GoogleOAuthProvider } from "@react-oauth/google";


createRoot(document.getElementById("root")).render(
  <>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_CLIENT_ID}>
      <Provider store={store}>
        <App />
      </Provider>
    </GoogleOAuthProvider>

    <ToastContainer
      position="top-right"
      autoClose={2000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="colored"
      limit={1}
      transition={Bounce}
    />
  </>,
);
