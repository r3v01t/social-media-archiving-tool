import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import RainbowkitProvider from "./providers/RainbowkitProvider.tsx";
import Layout from "./components/Layout.tsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard.tsx";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import UpdateAllowList from "./components/UpdateAllowList.tsx";

const client = new ApolloClient({
  uri: import.meta.env.VITE_SUBGRAPH_URI,
  cache: new InMemoryCache(),
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowkitProvider>
      <ToastContainer />
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/allow-list" element={<UpdateAllowList />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </ApolloProvider>
    </RainbowkitProvider>
  </React.StrictMode>
);
