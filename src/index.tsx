import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { HomeComponent } from "./pages/home/home.component";
import {
  ADMINISTRATION,
  DASHBOARD,
  ROOT_LOGIN,
  ROOT_SIGNUP,
} from "./constant/root.constant";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AdministrationComponent } from "./pages/administration/administration.component";

const routers = createBrowserRouter([
  { path: ROOT_SIGNUP, element: <SignUpComponent /> },
  { path: DASHBOARD, element: <DashboardComponent /> },
  { path: ADMINISTRATION, element: <AdministrationComponent /> },
  { path: "/", element: <HomeComponent /> },
  { path: ROOT_LOGIN, element: <LoginComponent /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={routers} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
