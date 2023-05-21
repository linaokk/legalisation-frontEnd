import { FunctionComponent, useState } from "react";
import { SecuredComponent } from "../secured/secured.component";
import "./navbar.style.css";
import { ROUTES } from "../../constants/root.constant";
import { Role } from "../../constants/role.constant";

export const NavbarComponent: FunctionComponent = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false);

  return (
    <nav className="navigation">
      <a href="/" className="brand-name">
        Legalisation
      </a>
      <button
        className="hamburger"
        onClick={() => {
          setIsNavExpanded(!isNavExpanded);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="white"
        >
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM9 15a1 1 0 011-1h6a1 1 0 110 2h-6a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={
          isNavExpanded ? "navigation-menu expanded" : "navigation-menu"
        }
      >
        <ul>
          <li>
            <a href={ROUTES.DASHBOARD}>Home</a>
          </li>
          <li>
            <a href={ROUTES.MY_REQUESTS}>My requests</a>
          </li>
          <SecuredComponent oneRole={[Role.ROLE_ADMIN]}>
            <li>
              <a href={ROUTES.ADMINISTRATION}>Administration</a>
            </li>
          </SecuredComponent>
          <li>
            <a href="/myaccount">My account</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
