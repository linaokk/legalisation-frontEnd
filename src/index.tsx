import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpComponent } from "./pages/sign-up/sign-up.component";
import { HomeComponent } from "./pages/home/home.component";
import { ROOT_SIGNUP } from "./constant/root.constant";

const router = createBrowserRouter([
  { path: ROOT_SIGNUP, element: <SignUpComponent /> },
  {path:"/", element:<HomeComponent/>}
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider  router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
