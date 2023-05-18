import axios from "axios";
import { FunctionComponent, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { initAxios } from "../../services/axios.service";

export const DashboardComponent: FunctionComponent = () => {
  initAxios();

  const [state] = useState<number>(0);

  const inc = () => {
    //in get request
    axios.get("/admin/fetch_user").then((res: any) => console.info(res));
  };

  return (
    <>
      <NavbarComponent />
      bienvenue dans la page Dashboard {state} <button onClick={inc}>X</button>
    </>
  );
};
