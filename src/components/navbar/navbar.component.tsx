import {
  Button,
  Container,
  Form,
  Nav,
  NavDropdown,
  Navbar,
  Offcanvas,
} from "react-bootstrap";
import { ROUTES } from "../../constants/root.constant";
import { Link } from "react-router-dom";
import { SecuredComponent } from "../secured/secured.component";
import { Role } from "../../constants/role.constant";
import styles from "./navbar.module.css";

const generateLink = (title: string, to: string) => {
  return (
    <Link className={`nav-link ${styles.navlink}`} to={to}>
      {title}
    </Link>
  );
};

export const NavbarComponent = () => {
  const expand = "sm";

  return (
    <>
      <Navbar
        className={`mb-3 ${styles.navbar}`}
        key={expand}
        bg="light"
        expand={expand}
      >
        <Container fluid>
          {generateLink("Legalisation", ROUTES.DASHBOARD)}

          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-${expand}`}
            aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                Legalisation
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="justify-content-end flex-grow-1 pe-3">
                {generateLink("Home", ROUTES.DASHBOARD)}
                {generateLink("My request", ROUTES.MY_REQUESTS)}

                <SecuredComponent oneRole={[Role.ROLE_ADMIN]}>
                  <NavDropdown
                    title="Administration"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className={styles.navlink}
                  >
                    <Link className="dropdown-item" to={ROUTES.USERS_ADMIN}>
                      Users management
                    </Link>
                    <Link className="dropdown-item" to={ROUTES.REQUESTS_ADMIN}>
                      Request Management
                    </Link>
                  </NavDropdown>
                </SecuredComponent>

                <SecuredComponent oneRole={[Role.ROLE_SUPER_ADMIN]}>
                  <NavDropdown
                    title="Super admin"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                    className={styles.navlink}
                  >
                    <Link className="dropdown-item" to={ROUTES.SHOW_ADMINS}>
                      Admin management
                    </Link>
                  </NavDropdown>
                </SecuredComponent>

                {generateLink("My account", ROUTES.SHOW_MY_ACCOUNT)}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
};
