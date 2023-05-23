import axios from "axios";
import { useState } from "react";
import {
  API_ACTION_ADMIN_ENABLE_CLIENT,
  API_FETCH_ADMIN_DISABLED_CLIENTS,
} from "../constants/api.constant";

interface User {
  active: boolean;
  authorities: string[];
  familialSituation: string;
  firstname: string;
  identityCode: string;
  identityType: string;
  email: string;
  lastname: string;
  phoneNumber: string;
  sexe: string;
  username: string;
}

export const useAdministration = () => {
  const [users, setUsers] = useState<User[]>([]);

  const enableClient = (username: string) => {
    console.info("je veux activer le client ", username);
    axios
      .put<User[]>(
        API_ACTION_ADMIN_ENABLE_CLIENT.replace(":username", username)
      )
      .then((res) => {
        console.info("YESSS, ", res);
        fetchUsers();
      })
      .catch((err) => {
        console.info("Merde, ", err);
      });
  };

  const fetchUsers = async () => {
    return axios
      .get<User[]>(API_FETCH_ADMIN_DISABLED_CLIENTS)
      .then((res) => {
        setUsers(res.data);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };

  return { users, setUsers, fetchUsers, enableClient };
};
