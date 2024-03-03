import { FunctionComponent, useEffect } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { useAdministration } from "../../hooks/administration.hook";

import "./users-administration.style.css";
import { PageHeaderComponent } from "../../components/page-header/page-header.component";

export const UsersAdministrationComponent: FunctionComponent = () => {
  const { users, fetchUsers, enableClient } = useAdministration();

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <NavbarComponent />
      <div className="container">
        <PageHeaderComponent value="User administration" />
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Username</th>
              <th scope="col">First name</th>
              <th scope="col">Last name</th>
              <th scope="col">Roles</th>
              <th scope="col">Email</th>
              <th scope="col">identity number</th>
              <th scope="col">actions</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={`tr-row-${user.identityCode}`}>
                <th scope="row">{user.username}</th>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.authorities}</td>
                <td>{user.email}</td>
                <td>{user.identityCode}</td>
                <td>
                  <button onClick={() => enableClient(user.username)}>
                    enable
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
