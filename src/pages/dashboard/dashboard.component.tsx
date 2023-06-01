import { FunctionComponent } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";
import { FormattedMessage } from "react-intl";

export const DashboardComponent: FunctionComponent = () => {
  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="Legalisation page" />
        <div className="row">
          <div className="col-sm">
            <p>
              <FormattedMessage id="dashboard.apostille" />
              Légalisation apostille : On est souvent amené à présenter des
              documents dans d’autres pays auprès de différents organisme comme
              une entreprise, une école ou une autorité. Ces pays exigent des
              garanties quant à l’authenticité et la conformité de ces
              documents. L’authentification des signatures et des tampons passe
              obligatoirement par :
            </p>

            <ul>
              <li>
                Apostille : une formalité nommée apostille (dans le cas des pays
                faisant partie de la convention de la Haye).
              </li>
              <li>
                Légalisation : une autre procédure auprès du ministre des
                affaires étrangères et ensuite auprès des services consulaires
                des ambassades des pays destinataires des documents.
              </li>
              <li>
                Légalisation Apostille : une dispense de toute démarche de
                légalisation apostille.
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
