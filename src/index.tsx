import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";

import { LoginComponent } from "./pages/login/login.component";
import { DashboardComponent } from "./pages/dashboard/dashboard.component";
import { UsersAdministrationComponent } from "./pages/users-administration/users-administration.component";
import { GlobalContextProvider } from "./contexts/global.context";
import { InitializerComponent } from "./components/initializer/initializer.component";
import { SecuredComponent } from "./components/secured/secured.component";
import { Role } from "./constants/role.constant";
import { MyRequestsComponent } from "./pages/my-requests/my-requests.component";
import { ROUTES } from "./constants/root.constant";
import { AddRequestComponent } from "./pages/add-request/add-request.component";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MyAccountComponent } from "./pages/my-account/my-account.component";
import { EditAccountComponent } from "./pages/edit-account/edit-account.component";
import { Page403Component } from "./pages/403/403.component";
import { RequestsAdministrationComponent } from "./pages/requests-admin/requests-admin.component";
import { ShowAdminsComponent } from "./pages/show-admins/show-admins.component";

const page403: JSX.Element = <Page403Component />;

const routers = createBrowserRouter([
  { path: ROUTES.ROOT_SIGNUP, element: <SignUpComponent /> },
  {
    path: ROUTES.DASHBOARD,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]}>
        <DashboardComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.EDIT_MY_ACCOUNT,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]} fallback={page403}>
        <EditAccountComponent />
      </SecuredComponent>
    ),
  },
  {
    path: "/myaccount",
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]} fallback={page403}>
        <MyAccountComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.MY_REQUESTS,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]} fallback={page403}>
        <MyRequestsComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.CREATE_NEW_REQUEST,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]}>
        <AddRequestComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.SHOW_ADMINS,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_SUPER_ADMIN]}>
        <ShowAdminsComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.USERS_ADMIN,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_ADMIN]}>
        <UsersAdministrationComponent />
      </SecuredComponent>
    ),
  },
  {
    path: ROUTES.REQUESTS_ADMIN,
    element: (
      <SecuredComponent oneRole={[Role.ROLE_USER]}>
        <RequestsAdministrationComponent />
      </SecuredComponent>
    ),
  },
  { path: ROUTES.ROOT_LOGIN, element: <LoginComponent /> },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <>
    <GlobalContextProvider>
      <InitializerComponent>
        <RouterProvider router={routers} />
      </InitializerComponent>
    </GlobalContextProvider>

    <ToastContainer
      position="bottom-center"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
    />
  </>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
