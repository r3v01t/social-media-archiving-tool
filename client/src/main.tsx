import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RainbowkitProvider from "./providers/RainbowkitProvider.tsx";
import Layout from "./components/Layout.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowkitProvider>
      <Layout>
        <ToastContainer />
        <App />
      </Layout>
    </RainbowkitProvider>
  </React.StrictMode>
);
