import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import Layout from "./components/Layout.jsx";
import FundraiserForm from "./components/FundraiserForm.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Layout />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/fundraisers/:id", element: <FundraiserPage /> }, //previously has singular fundraiser
          { path: "/create", element: <FundraiserForm /> }
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     {/* Here we wrap our app in the router provider so they render */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
