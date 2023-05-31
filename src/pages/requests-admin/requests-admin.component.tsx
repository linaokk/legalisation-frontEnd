import { useEffect, useState } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import axios from "axios";
import { handleAxiosError } from "../../services/axios.service";
import { Request } from "../../models/request.model";
import styles from "./requests-admin.module.css";
import { handleOnDownload } from "../../utils/html.utils";
import { RequestAdministrationEdit } from "./request-admin-edit.component";
import {
  API_ACTION_REFUSE_REQUEST,
  API_FETCH_PENDING_REQUESTS,
} from "../../constants/api.constant";

export const RequestsAdministrationComponent = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [request, setRequest] = useState<Request>();
  const [show, toggle] = useState<boolean>(true);

  const handleOnRefuse = (requestId: number) => {
    const url = API_ACTION_REFUSE_REQUEST.replace(
      ":requestId",
      requestId.toString()
    );
    axios.put(url).then(fetchRequests).catch(handleAxiosError);
  };

  const fetchRequests = () => {
    axios
      .get(API_FETCH_PENDING_REQUESTS)
      .then((e) => setRequests(e.data))
      .catch(handleAxiosError);
  };

  useEffect(() => {
    if (show === false || requests.length === 0) {
      fetchRequests();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="Requests administration" />
        {request && (
          <RequestAdministrationEdit
            show={show}
            toggle={toggle}
            request={request}
          />
        )}
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Creation date</th>
              <th>Identity code</th>
              <th>Identity type</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((request) => (
              <tr key={`tr-row-${request.id}`}>
                <td>{request.id}</td>
                <td>{request.insertedAt}</td>
                <td>{request.user.identityCode}</td>
                <td>{request.user.identityType}</td>
                <td>{request.description}</td>
                <td>
                  <div className={styles.actionsContainer}>
                    <button
                      className="btn btn-dark"
                      onClick={() => handleOnDownload(request.document)}
                    >
                      download
                    </button>
                    <button
                      className="btn btn-success"
                      onClick={() => {
                        setRequest(request);
                        toggle(true);
                      }}
                    >
                      Validate
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleOnRefuse(request.id)}
                    >
                      Refuse
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
