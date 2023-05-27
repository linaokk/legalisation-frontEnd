import axios from "axios";
import { useContext } from "react";
import { API_FETCH_USER_INFO } from "../constants/api.constant";
import { GlobalContext } from "../contexts/global.context";
import { LogginUser } from "../contexts/global.state";

export const useAuthentication = () => {
  const context = useContext(GlobalContext);
  if (!context)
    throw new Error(
      "No context found, LoginComponent has to be construct within GlobalContextProvider"
    );

  const {
    auth: { setToken, token, setUser, setRoles, roles, clearToken, user },
  } = context;

  const fetchUser = () => {
    return axios
      .get<LogginUser>(API_FETCH_USER_INFO)
      .then((res) => {
        const roles = res.data.authorities.map((e) => e.authority);
        setUser(res.data);
        setRoles(roles);
        return Promise.resolve(res.data);
      })
      .catch((err) => {
        return Promise.reject();
      });
  };

  return { setToken, token, fetchUser, roles, clearToken, user };
};
