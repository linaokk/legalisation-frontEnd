import { FunctionComponent } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import {
  FormattedMessage,
  IntlContext,
  MessageDescriptor,
  useIntl,
} from "react-intl";
export const DashboardComponent: FunctionComponent = () => {
  const { formatMessage } = useIntl();

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value={formatMessage({ id: "dashboard.title" })} />
        <div className="row">
          <div className="col-sm">
            <p>
              <FormattedMessage id="dashboard.description" />
            </p>

            <ul>
              <li>
                <FormattedMessage id="dashboard.apostille" />
              </li>
              <li>
                <FormattedMessage id="dashboard.legalisation" />
              </li>
              <li>
                <FormattedMessage id="dashboard.legalisation_apostille" />
              </li>
            </ul>
          </div>
          <div className="col-sm">
            <img
              alt="legalsiation img"
              src="apostille.jpeg"
              style={{ width: "100%", maxHeight: "40vh" }}
            />
          </div>
        </div>
      </div>
    </>
  );
};
