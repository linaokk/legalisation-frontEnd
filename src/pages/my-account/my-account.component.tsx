import { FunctionComponent, useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import axios from "axios";
import { handleAxiosError } from "../../services/axios.service";
import { Client } from "../../models/client.model";
import styles from "./my-account.module.css";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/root.constant";

const GetSubPart = (title: string, value: any) => {
  return (
    <div className={`${styles.row2} row`}>
      <div className={`${styles.title} col-4`}>{title}</div>
      <div className={`${styles.value} col-8`}>{value}</div>
    </div>
  );
};

export const MyAccountComponent: FunctionComponent = () => {
  const [client, setClient] = useState<Client>();

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get<Client>("/auth/get_my_account")
      .then((res) => {
        setClient(res.data);
      })
      .catch(handleAxiosError);
  }, []);

  const handleOnEditAccount = () => {
    navigate(ROUTES.EDIT_MY_ACCOUNT);
  };

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="My account" />
        <div>
          {GetSubPart("Email", client?.email)}
          {GetSubPart("Familial situation", client?.familialSituation)}
          {GetSubPart("Firstname", client?.firstname)}
          {GetSubPart("Lastname", client?.lastname)}
          {GetSubPart("Identity code", client?.identityCode)}
          {GetSubPart("Identity type", client?.identityType)}
          {GetSubPart("Phone number", client?.phoneNumber)}
          {GetSubPart("Sexe", client?.sexe)}

          <div className="row">
            <button
              className={styles.editAccount}
              onClick={handleOnEditAccount}
            >
              Edit my account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
