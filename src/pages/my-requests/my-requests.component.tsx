import { FunctionComponent, useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import styles from "./my-requests.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/root.constant";
import { toast } from "react-toastify";
import { Messages } from "../../constants/messages.constant";

interface Request {
  document: string;
  documentType: string;
  description: string;
  id: number;
  insertedAt: string;
  validated: boolean;
}

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

  const handleOnDownload = (b64File: string) => {
    const byteCharacters = atob(b64File);

    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    // the filename you want
    a.download = "export.pdf";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
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
                    <tr>
                      <td>{request.id}</td>
                      <td>{request.validated ? "YES" : "NO"}</td>
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
