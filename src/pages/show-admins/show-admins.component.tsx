import { useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import axios from "axios";
import { handleAxiosError } from "../../services/axios.service";
import { Administrator } from "../../models/client.model";
import styles from "./show-admins.module.css";
import { Badge } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import {
  API_ACTION_SUPERADMIN_DISABLE_ADMIN,
  API_ACTION_SUPERADMIN_ENABLE_ADMIN,
  API_FETCH_ADMINS,
} from "../../constants/api.constant";
import { AddAdministratorComponent } from "./add-admin.component";

export const getBadgeByStatus = (active: boolean) => {
  if (active) return <Badge bg="success">active</Badge>;
  return <Badge bg="danger">blocked</Badge>;
};

export const ShowAdminsComponent = () => {
  const [admins, setAdmins] = useState<Administrator[]>([]);
  const [show, toggle] = useState<boolean>(false);

  const handleOnAddAdmin = () => {
    toggle(true);
  };

  const handleOnActivate = (identityCode: string) => {
    const url = API_ACTION_SUPERADMIN_ENABLE_ADMIN.replace(
      ":identityCode",
      identityCode
    );
    axios
      .put(url)
      .then((res) => {
        fetchAdmins();
      })
      .catch(handleAxiosError);
  };

  const handleOnDisable = (identityCode: string) => {
    const url = API_ACTION_SUPERADMIN_DISABLE_ADMIN.replace(
      ":identityCode",
      identityCode
    );
    axios
      .put(url)
      .then((res) => {
        fetchAdmins();
      })
      .catch(handleAxiosError);
  };

  const fetchAdmins = () => {
    axios
      .get(API_FETCH_ADMINS)
      .then((res) => setAdmins(res.data))
      .catch(handleAxiosError);
  };

  useEffect(() => {
    if (!show) fetchAdmins();
  }, [show]);

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="Administrator Management" />
        <AddAdministratorComponent show={show} toggle={toggle} />
        <div className="table-responsive-sm">
          <table className="table">
            <thead>
              <tr>
                <th>#</th>
                <th>Identity code</th>
                <th>Status</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={`tr-row-${admin.username}`}>
                  <td>{admin.username}</td>
                  <td>{admin.identityCode}</td>
                  <td>{getBadgeByStatus(admin.active)}</td>
                  <td>{admin.email}</td>
                  <td>
                    <div className={styles.actionsContainer}>
                      <button
                        className="btn btn-success"
                        onClick={() => handleOnActivate(admin.identityCode)}
                      >
                        <FormattedMessage id="common.activate" />
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleOnDisable(admin.identityCode)}
                      >
                        <FormattedMessage id="common.disable" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addButton} onClick={handleOnAddAdmin}>
            <FormattedMessage id="common.add" />
          </button>
        </div>
      </div>
    </>
  );
};
