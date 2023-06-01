import { FunctionComponent, useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import styles from "./my-requests.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/root.constant";
import { toast } from "react-toastify";
import { Messages } from "../../constants/messages.constant";
import { Request } from "../../models/request.model";
import { handleOnDownload } from "../../utils/html.utils";
import { Badge } from "react-bootstrap";

export const getBadgeByStatus = (status: string) => {
  if (status === "INITIAL_REQUEST")
    return <Badge bg="secondary">pending</Badge>;
  if (status === "VALIDATED") return <Badge bg="success">validated</Badge>;
  if (status === "REFUSED") return <Badge bg="danger">refused</Badge>;
  return <Badge bg="success">unknown</Badge>;
};

export const MyRequestsComponent: FunctionComponent = () => {
  const navigate = useNavigate();
  const [requests, setRequests] = useState<Request[]>([]);
  useEffect(() => {
    axios
      .get<Request[]>("/requests/find")
      .then((res) => {
        setRequests(res.data);
        toast(`We received ${res.data.length} records from backend`);
      })
      .catch((err) => {
        toast(Messages.REQUEST_ERROR_FETCH);
      });
  }, []);

  const handleOnCreateNewRequest = () => {
    navigate(ROUTES.CREATE_NEW_REQUEST);
  };

  return (
    <>
      <NavbarComponent />
      <>
        <div className="container">
          <div className="table-responsive-sm">
            <div className={styles.pageContainer}>
              <table className="table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Status</th>
                    <th>Creation date</th>
                    <th>Description</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {requests.map((request) => (
                    <tr key={`tr-row-${request.id}`}>
                      <td>{request.id}</td>
                      <td>{getBadgeByStatus(request.status)}</td>
                      <td>{request.insertedAt}</td>
                      <td>{request.description}</td>
                      <td>
                        <div className={styles.actionsContainer}>
                          <button
                            onClick={() => handleOnDownload(request.document)}
                          >
                            download
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button onClick={handleOnCreateNewRequest}>add</button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
