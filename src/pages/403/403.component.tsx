import { FunctionComponent } from "react";
import styles from "./403.module.css";
import { ROUTES } from "../../constants/root.constant";

export const Page403Component: FunctionComponent = () => {
  return (
    <>
      <div className={styles.textWrapper}>
        <div className={styles.subtitle}>
          Oops, You don't have permission to access this page.
        </div>
        <div className="isi">
          A web server may return a 403 Forbidden HTTP status code in response
          to a request from a client for a web page or resource to indicate that
          the server can be reached and understood the request, but refuses to
          take any further action. Status code 403 responses are the result of
          the web server being configured to deny access, for some reason, to
          the requested resource by the client.
        </div>

        <div className={styles.buttons}>
          <a className="button" href={ROUTES.ROOT_LOGIN}>
            Go to Login page
          </a>
        </div>
      </div>
    </>
  );
};
