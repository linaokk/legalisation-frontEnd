import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";
import { ROOT_SIGNUP } from "../../constant/root.constant";
import { Console } from "console";
export const HomeComponent: FunctionComponent = () => {

    const navigate= useNavigate()
  console.info(process.env);
  return <>bienvenue flapage  <button onClick={()=>{navigate(ROOT_SIGNUP)}}>sinscrire </button> </>;
};
