import { useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import axios from "axios";
import { handleAxiosError } from "../../services/axios.service";
import { Administrator } from "../../models/client.model";
import styles from "./show-admins.module.css";
import { Badge } from "react-bootstrap";

export const getBadgeByStatus = (active: boolean) => {
  if (active) return <Badge bg="success">active</Badge>;
  return <Badge bg="danger">blocked</Badge>;
};

export const ShowAdminsComponent = () => {
  const [admins, setAdmins] = useState<Administrator[]>([]);

  useEffect(() => {
    axios
      .get("super_admin/fetch_admins")
      .then((res) => setAdmins(res.data))
      .catch(handleAxiosError);
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="Administrator Management" />
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
                      <button className="btn btn-success">Activate</button>
                      <button className="btn btn-danger">Disable</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className={styles.addButton}>Add</button>
        </div>
      </div>
    </>
  );
};
