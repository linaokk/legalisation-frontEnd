import { FunctionComponent, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import styles from "./my-requests.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/root.constant";

export const MyRequestsComponent: FunctionComponent = () => {
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/requests/find")
      .then((res) => {
        console.info("> got ", res);
      })
      .catch((err) => {
        console.info("Merde ", err);
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
                  </tr>
                </thead>
              </table>
              <button onClick={handleOnCreateNewRequest}>add</button>
            </div>
          </div>
        </div>
      </>
    </>
  );
};
