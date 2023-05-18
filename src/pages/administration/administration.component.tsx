import { FunctionComponent, useState, createRef } from "react";
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { useAuth } from "../../hooks/auth.hook";
import { initAxios } from "../../services/axios.service";
import "./administration.style.css";

export const AdministrationComponent: FunctionComponent = () => {
  initAxios();
  const { data, error } = useAuth();

  return (
    <>
      <NavbarComponent />
      <div className="admin-container">
        {error && JSON.stringify(error)}
        {data && (
          <table className="admin-table">
            <tr>
              <td>login</td>
              <td>activated</td>
              <td>roles</td>
              <td>numIdentite</td>
              <td>actions</td>
            </tr>
            {data.map((user) => (
              <tr>
                <td>{user.username}</td>
                <td>{user.enabled ? "YES" : "NO"}</td>
                <td>
                  {user.authorities
                    .map((s) => s.authority)
                    .reduce((a1, a2) => a1 + "," + a2)}
                </td>
                <td>{user.numeroIdentite}</td>
                <td>
                  <button>Enable</button>
                  <button>Disable</button>
                </td>
              </tr>
            ))}
          </table>
        )}
      </div>
    </>
  );
};
