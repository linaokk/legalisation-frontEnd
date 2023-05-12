import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ROOT_SIGNUP } from "../../constant/root.constant";
export const HomeComponent: FunctionComponent = () => {

    const navigate= useNavigate()

  return <>bienvenue flapage  <button onClick={()=>{navigate(ROOT_SIGNUP)}}>sinscrire </button> </>;
};
