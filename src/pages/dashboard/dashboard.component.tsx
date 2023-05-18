import { FunctionComponent } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";

export const DashboardComponent: FunctionComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container">je suis un container</div>
    </>
  );
};
