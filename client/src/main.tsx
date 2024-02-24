import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import RainbowkitProvider from "./providers/RainbowkitProvider.tsx";
import Layout from "./components/Layout.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Tabs from "./components/Tabs.tsx";

const client = new ApolloClient({
  uri: "https://api.studio.thegraph.com/query/64131/smat-subgraph/version/latest",
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowkitProvider>
      <ToastContainer />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Tabs />
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </RainbowkitProvider>
  </React.StrictMode>
);
