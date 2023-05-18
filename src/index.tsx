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
} from "./constants/root.constant";
import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { AdministrationComponent } from "./pages/administration/administration.component";
import { GlobalContextProvider } from "./contexts/global.context";
import { InitializerComponent } from "./components/initializer/initializer.component";
import { SecuredComponent } from "./components/secured/secured.component";
import { Role } from "./constants/role.constant";

const routers = createBrowserRouter([
  { path: ROOT_SIGNUP, element: <SignUpComponent /> },
  {
    path: DASHBOARD,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]}>
        <DashboardComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ADMINISTRATION,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_ADMIN]}>
        <AdministrationComponent />
      </SecuredComponent>
    ),
  },
  { path: ROOT_LOGIN, element: <LoginComponent /> },
  { path: "/", element: <HomeComponent /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <GlobalContextProvider>
    <InitializerComponent>
      <RouterProvider router={routers} />
    </InitializerComponent>
  </GlobalContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
