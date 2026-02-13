import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./pages/HomePage.jsx";
import FundraiserPage from "./pages/FundraiserPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import NotFound from "./pages/NotFound.jsx";
import SignupForm from "./components/SignupForm.jsx";

import NavBar from "./components/NavBar.jsx";
import { AuthProvider } from "./components/AuthProvider.jsx";
import Layout from "./components/Layout.jsx";
import FundraiserForm from "./components/FundraiserForm.jsx";
import PledgeForm from "./components/PledgeForm.jsx";

const router = createBrowserRouter([
  {
      path: "/",
      element: <Layout />,
      errorElement: <NotFound />,
      children: [
          { path: "/", element: <HomePage /> },
          { path: "/login", element: <LoginPage /> },
          { path: "/fundraisers/:id", element: <FundraiserPage /> },
          { path: "/create", element: <FundraiserForm /> },
          { path: "/pledge", element: <PledgeForm /> },
          { path: "/signup", element: <SignupForm /> }
      ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
     {/* */}
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
